import publicDomainMovies from '../../data/public-domain-movies.json';

export function getAllPublicDomainMovies() {
  return publicDomainMovies;
}

export function getPublicDomainMovieById(id) {
  return publicDomainMovies.find(movie => movie.id === id);
}

export function getPublicDomainMoviesByGenre(genre) {
  return publicDomainMovies.filter(movie => 
    movie.genre && movie.genre.includes(genre)
  );
}

export function getAllGenres() {
  const genres = new Set();
  publicDomainMovies.forEach(movie => {
    if (movie.genre) {
      movie.genre.forEach(g => genres.add(g));
    }
  });
  return Array.from(genres).sort();
}
