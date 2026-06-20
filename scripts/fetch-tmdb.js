const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function fetchTMDMovies() {
  if (!TMDB_API_KEY) {
    console.error('❌ TMDB_API_KEY environment variable is not set');
    process.exit(1);
  }
  
  console.log('🎬 Fetching movies from TMDB...');
  
  const allMovies = [];
  
  try {
    // Fetch popular Hindi movies
    const popularResponse = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=hi&sort_by=popularity.desc&page=1`
    );
    const popularData = await popularResponse.json();
    
    // Fetch trending movies
    const trendingResponse = await fetch(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
    );
    const trendingData = await trendingResponse.json();
    
    // Combine and deduplicate
    const movieMap = new Map();
    
    [...popularData.results, ...trendingData.results].forEach(movie => {
      if (!movieMap.has(movie.id) && movie.poster_path) {
        movieMap.set(movie.id, {
          id: movie.id,
          title: movie.title,
          original_title: movie.original_title,
          overview: movie.overview || '',
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
          release_date: movie.release_date,
          year: movie.release_date ? movie.release_date.split('-')[0] : 'Unknown',
          rating: movie.vote_average,
          genre_ids: movie.genre_ids,
          source: 'TMDB',
          addedAt: new Date().toISOString(),
        });
      }
    });
    
    // Fetch genre names
    const genresResponse = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
    );
    const genresData = await genresResponse.json();
    const genreMap = {};
    genresData.genres.forEach(g => {
      genreMap[g.id] = g.name;
    });
    
    // Convert genre_ids to genre names
    const movies = Array.from(movieMap.values()).map(movie => ({
      ...movie,
      genres: movie.genre_ids.map(id => genreMap[id] || 'Unknown').filter(g => g !== 'Unknown'),
    }));
    
    // Save to JSON file
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const filePath = path.join(dataDir, 'tmdb-movies.json');
    fs.writeFileSync(filePath, JSON.stringify(movies, null, 2));
    
    console.log(`✅ Saved ${movies.length} TMDB movies to ${filePath}`);
    
  } catch (error) {
    console.error('❌ Error fetching TMDB movies:', error.message);
    process.exit(1);
  }
}

// Run the script
fetchTMDMovies().catch(console.error);
