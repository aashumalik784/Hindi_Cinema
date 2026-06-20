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
