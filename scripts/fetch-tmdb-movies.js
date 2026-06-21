const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const TMDB_API_KEY = process.env.TMDB_API_KEY || '99bd086786b1935a8a6934405b4281ec';
const TMDB_BASE = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280';

const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
  53: 'Thriller', 10752: 'War', 37: 'Western'
};

// Retry helper
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
      if (res.status === 429) {
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      return null;
    } catch (err) {
      if (i === retries - 1) return null;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return null;
}

// Fetch watch providers (India)
async function fetchProviders(movieId) {
  const providers = {
    netflix: '', prime: '', hotstar: '',
    jiocinema: '', zee5: '', sonyliv: '', apple: '', youtube: ''
  };
  
  try {
    const data = await fetchWithRetry(
      `${TMDB_BASE}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`
    );
    
    if (data?.results?.IN) {
      const indian = data.results.IN;      const deepLink = indian.link || `https://www.justwatch.com/in/movie/${movieId}`;
      
      const all = [
        ...(indian.flatrate || []),
        ...(indian.rent || []),
        ...(indian.buy || [])
      ];
      
      for (const p of all) {
        const name = p.provider_name.toLowerCase();
        if (name.includes('netflix') && !providers.netflix) providers.netflix = deepLink;
        else if (name.includes('prime') && !providers.prime) providers.prime = deepLink;
        else if ((name.includes('hotstar') || name.includes('disney')) && !providers.hotstar) providers.hotstar = deepLink;
        else if (name.includes('jio') && !providers.jiocinema) providers.jiocinema = deepLink;
        else if (name.includes('zee') && !providers.zee5) providers.zee5 = deepLink;
        else if (name.includes('sony') && !providers.sonyliv) providers.sonyliv = deepLink;
        else if (name.includes('apple') && !providers.apple) providers.apple = deepLink;
        else if (name.includes('youtube') && !providers.youtube) providers.youtube = deepLink;
      }
    }
  } catch (err) {
    // silent
  }
  
  return providers;
}

// Get genre names
function getGenreNames(ids) {
  return (ids || []).map(id => GENRE_MAP[id]).filter(Boolean);
}

// Process movies
async function processMovies(movies, allMovies, seenIds, source) {
  let added = 0;
  
  for (const movie of movies) {
    if (!movie.id || seenIds.has(movie.id) || !movie.poster_path) continue;
    seenIds.add(movie.id);
    
    const providers = await fetchProviders(movie.id);
    
    allMovies.push({
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      overview: movie.overview || '',
      poster: `${IMG_BASE}${movie.poster_path}`,
      backdrop: movie.backdrop_path ? `${BACKDROP_BASE}${movie.backdrop_path}` : null,
      release_date: movie.release_date || '',      year: movie.release_date ? movie.release_date.split('-')[0] : 'Unknown',
      rating: movie.vote_average ? parseFloat(movie.vote_average.toFixed(1)) : 0,
      genres: getGenreNames(movie.genre_ids),
      genre_ids: movie.genre_ids || [],
      source: source,
      netflix: providers.netflix,
      prime: providers.prime,
      hotstar: providers.hotstar,
      jiocinema: providers.jiocinema,
      zee5: providers.zee5,
      sonyliv: providers.sonyliv,
      apple: providers.apple,
      youtube: providers.youtube,
      addedAt: new Date().toISOString(),
    });
    
    added++;
    
    // Rate limit: 150ms between requests
    await new Promise(r => setTimeout(r, 150));
  }
  
  return added;
}

// Main function
async function fetchTMDBMovies() {
  console.log('🎬 Starting TMDB Auto-Fetch...\n');
  
  const allMovies = [];
  const seenIds = new Set();
  
  // ========== 1. POPULAR MOVIES (10 pages) ==========
  console.log('📽️  Fetching Popular Movies (10 pages)...');
  for (let page = 1; page <= 10; page++) {
    try {
      const data = await fetchWithRetry(
        `${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&language=hi-IN&page=${page}`
      );
      if (data?.results) {
        const added = await processMovies(data.results, allMovies, seenIds, 'Popular');
        console.log(`  Page ${page}: +${added} movies`);
      }
    } catch (err) {
      console.error(`  Page ${page} error:`, err.message);
    }
    await new Promise(r => setTimeout(r, 400));
  }
  
  // ========== 2. TOP RATED (5 pages) ==========  console.log('\n⭐ Fetching Top Rated Movies (5 pages)...');
  for (let page = 1; page <= 5; page++) {
    try {
      const data = await fetchWithRetry(
        `${TMDB_BASE}/movie/top_rated?api_key=${TMDB_API_KEY}&language=hi-IN&page=${page}`
      );
      if (data?.results) {
        const added = await processMovies(data.results, allMovies, seenIds, 'Top Rated');
        console.log(`  Page ${page}: +${added} movies`);
      }
    } catch (err) {
      console.error(`  Page ${page} error:`, err.message);
    }
    await new Promise(r => setTimeout(r, 400));
  }
  
  // ========== 3. NOW PLAYING (5 pages) ==========
  console.log('\n🎭 Fetching Now Playing Movies (5 pages)...');
  for (let page = 1; page <= 5; page++) {
    try {
      const data = await fetchWithRetry(
        `${TMDB_BASE}/movie/now_playing?api_key=${TMDB_API_KEY}&language=hi-IN&page=${page}`
      );
      if (data?.results) {
        const added = await processMovies(data.results, allMovies, seenIds, 'Now Playing');
        console.log(`  Page ${page}: +${added} movies`);
      }
    } catch (err) {
      console.error(`  Page ${page} error:`, err.message);
    }
    await new Promise(r => setTimeout(r, 400));
  }
  
  // ========== 4. UPCOMING (10 pages) ==========
  console.log('\n📅 Fetching Upcoming Movies (10 pages)...');
  for (let page = 1; page <= 10; page++) {
    try {
      const data = await fetchWithRetry(
        `${TMDB_BASE}/movie/upcoming?api_key=${TMDB_API_KEY}&language=hi-IN&page=${page}`
      );
      if (data?.results) {
        const added = await processMovies(data.results, allMovies, seenIds, 'Upcoming');
        console.log(`  Page ${page}: +${added} movies`);
      }
    } catch (err) {
      console.error(`  Page ${page} error:`, err.message);
    }
    await new Promise(r => setTimeout(r, 400));
  }
    // ========== 5. TRENDING (5 pages each) ==========
  console.log('\n🔥 Fetching Trending Movies...');
  for (const window of ['day', 'week']) {
    for (let page = 1; page <= 5; page++) {
      try {
        const data = await fetchWithRetry(
          `${TMDB_BASE}/trending/movie/${window}?api_key=${TMDB_API_KEY}&language=hi-IN&page=${page}`
        );
        if (data?.results) {
          const added = await processMovies(data.results, allMovies, seenIds, `Trending ${window}`);
          console.log(`  Trending ${window} Page ${page}: +${added}`);
        }
      } catch (err) {
        console.error(`  Trending error:`, err.message);
      }
      await new Promise(r => setTimeout(r, 400));
    }
  }
  
  // ========== 6. HINDI LANGUAGE DISCOVER (10 pages) ==========
  console.log('\n🇮🇳 Fetching Hindi Language Movies (10 pages)...');
  for (let page = 1; page <= 10; page++) {
    try {
      const data = await fetchWithRetry(
        `${TMDB_BASE}/discover/movie?api_key=${TMDB_API_KEY}&language=hi-IN&with_original_language=hi&sort_by=popularity.desc&page=${page}`
      );
      if (data?.results) {
        const added = await processMovies(data.results, allMovies, seenIds, 'Hindi');
        console.log(`  Hindi Page ${page}: +${added}`);
      }
    } catch (err) {
      console.error(`  Hindi discover error:`, err.message);
    }
    await new Promise(r => setTimeout(r, 400));
  }
  
  // ========== 7. GENRE-WISE POPULAR ==========
  console.log('\n🎭 Fetching Genre-wise Popular Movies...');
  const genres = [28, 12, 16, 35, 80, 18, 14, 27, 878, 53, 10749];
  
  for (const genreId of genres) {
    try {
      const data = await fetchWithRetry(
        `${TMDB_BASE}/discover/movie?api_key=${TMDB_API_KEY}&language=hi-IN&with_genres=${genreId}&sort_by=popularity.desc&page=1`
      );
      if (data?.results) {
        const added = await processMovies(data.results, allMovies, seenIds, GENRE_MAP[genreId]);
        console.log(`  ${GENRE_MAP[genreId]}: +${added}`);
      }
    } catch (err) {      console.error(`  Genre error:`, err.message);
    }
    await new Promise(r => setTimeout(r, 400));
  }
  
  // ========== SAVE TO JSON ==========
  console.log(`\n💾 Saving ${allMovies.length} movies...`);
  
  // Sort by rating
  allMovies.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const filePath = path.join(dataDir, 'tmdb-movies.json');
  fs.writeFileSync(filePath, JSON.stringify(allMovies, null, 2));
  
  // Print stats
  const stats = {
    total: allMovies.length,
    withNetflix: allMovies.filter(m => m.netflix).length,
    withPrime: allMovies.filter(m => m.prime).length,
    withHotstar: allMovies.filter(m => m.hotstar).length,
    withJio: allMovies.filter(m => m.jiocinema).length,
    withZee5: allMovies.filter(m => m.zee5).length,
    withSony: allMovies.filter(m => m.sonyliv).length,
    withApple: allMovies.filter(m => m.apple).length,
  };
  
  console.log('\n🎉 SUCCESS!');
  console.log('📊 Statistics:');
  console.log(`  Total Movies: ${stats.total}`);
  console.log(`  🟥 Netflix: ${stats.withNetflix}`);
  console.log(`  🔵 Prime: ${stats.withPrime}`);
  console.log(`  ⭐ Hotstar: ${stats.withHotstar}`);
  console.log(`  🟡 JioCinema: ${stats.withJio}`);
  console.log(`  🟣 Zee5: ${stats.withZee5}`);
  console.log(`  🔷 SonyLIV: ${stats.withSony}`);
  console.log(`  🍎 Apple TV+: ${stats.withApple}`);
  console.log(`\n💾 Saved to: ${filePath}`);
}

// Run
fetchTMDBMovies().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
