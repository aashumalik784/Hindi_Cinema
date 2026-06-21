const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const TMDB_API_KEY = process.env.TMDB_API_KEY || '99bd086786b1935a8a6934405b4281ec';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Genre mapping (TMDB IDs to names)
const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
  53: 'Thriller', 10752: 'War', 37: 'Western'
};

// Indian streaming platforms mapping
const INDIAN_PROVIDERS = {
  'Netflix': { key: 'netflix', baseUrl: 'https://www.netflix.com/in/' },
  'Amazon Prime Video': { key: 'prime', baseUrl: 'https://www.primevideo.com/detail/' },
  'Disney Plus': { key: 'hotstar', baseUrl: 'https://www.hotstar.com/in/movies/' },
  'Disney+ Hotstar': { key: 'hotstar', baseUrl: 'https://www.hotstar.com/in/movies/' },
  'Jio Cinema': { key: 'jiocinema', baseUrl: 'https://www.jiocinema.com/movies/' },
  'Zee5': { key: 'zee5', baseUrl: 'https://www.zee5.com/movies/details/' },
  'Sony Liv': { key: 'sonyliv', baseUrl: 'https://www.sonyliv.com/movies/' },
  'Apple TV Plus': { key: 'apple', baseUrl: 'https://tv.apple.com/movie/' },
  'Google Play Movies': { key: 'google', baseUrl: 'https://play.google.com/store/movies/details?id=' },
  'YouTube': { key: 'youtube', baseUrl: 'https://www.youtube.com/results?search_query=' }
};

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return await response.json();
      if (response.status === 429) {
        // Rate limited, wait longer
        await new Promise(resolve => setTimeout(resolve, 2000));
        continue;
      }
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return null;
}

// Fetch movie watch providers with real deep links
async function fetchMovieProviders(movieId) {  const providers = {
    netflix: '', prime: '', hotstar: '', jiocinema: '',
    zee5: '', sonyliv: '', apple: '', google: '', youtube: ''
  };

  try {
    const url = `${TMDB_BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`;
    const data = await fetchWithRetry(url);

    if (data?.results?.IN) {
      const indian = data.results.IN;
      const deepLinkBase = indian.link || `https://www.justwatch.com/in/movie/${movieId}`;
      
      const allProviders = [
        ...(indian.flatrate || []),
        ...(indian.rent || []),
        ...(indian.buy || []),
      ];

      for (const provider of allProviders) {
        const config = INDIAN_PROVIDERS[provider.provider_name];
        if (config && !providers[config.key]) {
          providers[config.key] = deepLinkBase;
        }
      }
    }
  } catch (error) {
    console.error(`Provider fetch error for ${movieId}:`, error.message);
  }

  return providers;
}

// Get genre names from IDs
function getGenreNames(genreIds) {
  return (genreIds || []).map(id => GENRE_MAP[id]).filter(Boolean);
}

// Process a list of movies
async function processMovies(movies, allMovies, seenIds, source) {
  let added = 0;
  for (const movie of movies) {
    if (!movie.id || seenIds.has(movie.id) || !movie.poster_path) continue;
    seenIds.add(movie.id);

    const providers = await fetchMovieProviders(movie.id);

    allMovies.push({
      id: movie.id,
      title: movie.title,      original_title: movie.original_title,
      overview: movie.overview || '',
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null,
      release_date: movie.release_date || '',
      year: movie.release_date ? movie.release_date.split('-')[0] : 'Unknown',
      rating: movie.vote_average ? parseFloat(movie.vote_average.toFixed(1)) : 0,
      genres: getGenreNames(movie.genre_ids),
      genre_ids: movie.genre_ids || [],
      source: source || 'TMDB',
      netflix: providers.netflix,
      prime: providers.prime,
      hotstar: providers.hotstar,
      jiocinema: providers.jiocinema,
      zee5: providers.zee5,
      sonyliv: providers.sonyliv,
      apple: providers.apple,
      google: providers.google,
      youtube: providers.youtube,
      addedAt: new Date().toISOString(),
    });

    added++;
    if (added % 5 === 0) {
      console.log(`    ... added ${added} movies from ${source}`);
    }

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  return added;
}

async function fetchTMDBMovies() {
  console.log('🎬 Fetching UNLIMITED movies from TMDB (released + upcoming)...\n');

  const allMovies = [];
  const seenIds = new Set();

  // ============ SECTION 1: MULTI-PAGE STANDARD CATEGORIES ============
  const standardCategories = [
    { endpoint: '/movie/popular', name: 'Popular Movies', pages: 10 },
    { endpoint: '/movie/top_rated', name: 'Top Rated', pages: 8 },
    { endpoint: '/movie/now_playing', name: 'Now Playing', pages: 5 },
    { endpoint: '/movie/upcoming', name: 'Upcoming', pages: 10 },
  ];

  for (const cat of standardCategories) {
    console.log(`\n📽️  Fetching ${cat.name} (${cat.pages} pages)...`);
        for (let page = 1; page <= cat.pages; page++) {
      try {
        const url = `${TMDB_BASE_URL}${cat.endpoint}?api_key=${TMDB_API_KEY}&language=hi-IN&page=${page}`;
        const data = await fetchWithRetry(url);
        
        if (data?.results?.length > 0) {
          const added = await processMovies(data.results, allMovies, seenIds, cat.name);
          console.log(`  Page ${page}: +${added} movies`);
        }
      } catch (error) {
        console.error(`  Page ${page} error:`, error.message);
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // ============ SECTION 2: TRENDING (Weekly & Daily) ============
  console.log(`\n🔥 Fetching Trending movies...`);
  const trendingWindows = ['day', 'week'];
  
  for (const window of trendingWindows) {
    for (let page = 1; page <= 5; page++) {
      try {
        const url = `${TMDB_BASE_URL}/trending/movie/${window}?api_key=${TMDB_API_KEY}&language=hi-IN&page=${page}`;
        const data = await fetchWithRetry(url);
        
        if (data?.results?.length > 0) {
          const added = await processMovies(data.results, allMovies, seenIds, `Trending ${window}`);
          console.log(`  Trending ${window} Page ${page}: +${added}`);
        }
      } catch (error) {
        console.error(`  Trending error:`, error.message);
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // ============ SECTION 3: BOLLYWOOD / HINDI DISCOVER ============
  console.log(`\n🇮🇳 Fetching Bollywood & Hindi movies...`);
  const hindiFilters = [
    { language: 'hi', name: 'Hindi Language', pages: 15 },
    { region: 'IN', name: 'Indian Region', pages: 10 },
    { keywords: 'bollywood', name: 'Bollywood', pages: 5 },
  ];

  for (const filter of hindiFilters) {
    for (let page = 1; page <= filter.pages; page++) {
      try {
        let url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=hi-IN&page=${page}&sort_by=popularity.desc`;
        if (filter.language) url += `&with_original_language=${filter.language}`;        if (filter.region) url += `&with_origin_country=${filter.region}`;
        if (filter.keywords) url += `&with_keywords=233624`; // bollywood keyword id
        
        const data = await fetchWithRetry(url);
        if (data?.results?.length > 0) {
          const added = await processMovies(data.results, allMovies, seenIds, filter.name);
          console.log(`  ${filter.name} Page ${page}: +${added}`);
        }
      } catch (error) {
        console.error(`  Hindi discover error:`, error.message);
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // ============ SECTION 4: UPCOMING BY MONTH (Next 12 Months) ============
  console.log(`\n📅 Fetching Upcoming Movies (Next 12 Months)...`);
  const today = new Date();
  
  for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
    const futureDate = new Date(today);
    futureDate.setMonth(futureDate.getMonth() + monthOffset);
    const nextMonth = new Date(futureDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const fromDate = futureDate.toISOString().split('T')[0];
    const toDate = nextMonth.toISOString().split('T')[0];

    try {
      const url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=hi-IN&sort_by=popularity.desc&primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}&page=1`;
      const data = await fetchWithRetry(url);
      
      if (data?.results?.length > 0) {
        const added = await processMovies(data.results, allMovies, seenIds, `Upcoming ${fromDate.slice(0, 7)}`);
        console.log(`  ${fromDate.slice(0, 7)}: +${added} upcoming movies`);
      }
    } catch (error) {
      console.error(`  Upcoming month error:`, error.message);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // ============ SECTION 5: POPULAR ACTORS' FILMOGRAPHY ============
  console.log(`\n⭐ Fetching Popular Actor Movies...`);
  const popularActorIds = [
    15111,  // Shah Rukh Khan
    19414,  // Salman Khan
    11618,  // Aamir Khan
    14114,  // Akshay Kumar
    6674,   // Hrithik Roshan    37133,  // Ranbir Kapoor
    56839,  // Ranveer Singh
    37917,  // Deepika Padukone
    57112,  // Alia Bhatt
    4599,   // Leonardo DiCaprio
    3223,   // Robert Downey Jr.
    74568,  // Chris Hemsworth
    2963,   // Nicolas Cage
  ];

  for (const actorId of popularActorIds) {
    try {
      const url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=hi-IN&with_cast=${actorId}&sort_by=popularity.desc&page=1`;
      const data = await fetchWithRetry(url);
      
      if (data?.results?.length > 0) {
        const added = await processMovies(data.results, allMovies, seenIds, `Actor ${actorId}`);
        if (added > 0) console.log(`  Actor ${actorId}: +${added}`);
      }
    } catch (error) {
      console.error(`  Actor error:`, error.message);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // ============ SECTION 6: GENRE-WISE POPULAR ============
  console.log(`\n🎭 Fetching Genre-wise Popular Movies...`);
  const popularGenres = [28, 12, 16, 35, 80, 18, 14, 27, 878, 53, 10749];

  for (const genreId of popularGenres) {
    try {
      const url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=hi-IN&with_genres=${genreId}&sort_by=popularity.desc&page=1`;
      const data = await fetchWithRetry(url);
      
      if (data?.results?.length > 0) {
        const added = await processMovies(data.results, allMovies, seenIds, GENRE_MAP[genreId]);
        console.log(`  ${GENRE_MAP[genreId]}: +${added}`);
      }
    } catch (error) {
      console.error(`  Genre error:`, error.message);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // ============ SAVE TO JSON ============
  console.log(`\n💾 Saving ${allMovies.length} movies to JSON...`);

  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });  }

  // Sort by rating + popularity
  allMovies.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const filePath = path.join(dataDir, 'tmdb-movies.json');
  fs.writeFileSync(filePath, JSON.stringify(allMovies, null, 2));

  // Print statistics
  const stats = {
    total: allMovies.length,
    withNetflix: allMovies.filter(m => m.netflix).length,
    withPrime: allMovies.filter(m => m.prime).length,
    withHotstar: allMovies.filter(m => m.hotstar).length,
    withJio: allMovies.filter(m => m.jiocinema).length,
    upcoming: allMovies.filter(m => {
      if (!m.release_date) return false;
      return new Date(m.release_date) > new Date();
    }).length,
    hindi: allMovies.filter(m => m.source && (m.source.includes('Hindi') || m.source.includes('Bollywood'))).length,
  };

  console.log(`\n🎉 SUCCESS!`);
  console.log(`📊 Statistics:`);
  console.log(`  Total Movies: ${stats.total}`);
  console.log(`  🟥 Netflix: ${stats.withNetflix}`);
  console.log(`  🔵 Prime: ${stats.withPrime}`);
  console.log(`  ⭐ Hotstar: ${stats.withHotstar}`);
  console.log(`  🟡 JioCinema: ${stats.withJio}`);
  console.log(`  📅 Upcoming: ${stats.upcoming}`);
  console.log(`  🇮🇳 Hindi/Bollywood: ${stats.hindi}`);
  console.log(`\n💾 Saved to: ${filePath}`);
}

// Run
fetchTMDBMovies().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
