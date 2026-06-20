// TMDB se latest movies ka data fetch karne ke functions

export async function getTMDBMovies() {
  try {
    const data = await import('@/data/tmdb-movies.json')
    return data.default || []
  } catch (error) {
    console.error('Error loading TMDB movies:', error)
    return []
  }
}

export async function getTMDBMovieById(id) {
  const movies = await getTMDBMovies()
  return movies.find(movie => movie.id === parseInt(id))
}

export async function getTMDBMoviesByGenre(genreId) {
  const movies = await getTMDBMovies()
  return movies.filter(movie => 
    movie.genre_ids?.includes(parseInt(genreId))
  )
}

export function getTMDBImageUrl(path, size = 'w500') {
  if (!path) return '/videos/placeholder.jpg'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export function getTMDBTrailerUrl(videos) {
  const trailer = videos?.results?.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  )
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
}

export const TMDB_GENRES = {
  28: 'Action',
  12: 'Adventure', 
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
}
