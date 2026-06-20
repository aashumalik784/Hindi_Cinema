import tmdbMovies from '../../data/tmdb-movies.json';

export function getAllTMDMovies() {
  return tmdbMovies;
}

export function getTMDMovieById(id) {
  return tmdbMovies.find(movie => movie.id === parseInt(id));
}

export function getTMDMoviesByGenre(genre) {
  return tmdbMovies.filter(movie => 
    movie.genres && movie.genres.includes(genre)
  );
}

export function getAllTMDBGenres() {
  const genres = new Set();
  tmdbMovies.forEach(movie => {
    if (movie.genres) {
      movie.genres.forEach(g => genres.add(g));
    }
  });
  return Array.from(genres).sort();
}

export function getTrendingMovies(limit = 10) {
  return tmdbMovies
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

// ============ GENRES RELATED EXPORTS ============

export const TMDB_GENRES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export function getMoviesByGenre(genreId) {
  const movies = getAllTMDMovies();
  const genreName = TMDB_GENRES[genreId];
  
  if (!genreName) {
    return [];
  }
  
  return movies.filter(movie => 
    movie.genres && movie.genres.includes(genreName)
  );
}

export function getGenreName(genreId) {
  return TMDB_GENRES[genreId] || 'Unknown';
}
