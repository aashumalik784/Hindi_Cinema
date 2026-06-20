const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const TMDB_GENRES = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction',
  10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
}

export function getTMDBImageUrl(path, size = 'w500') {
  if (!path) return '/placeholder.jpg'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export async function getTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&with_original_language=hi`)
  const data = await res.json()
  return data.results || []
}

export async function getTMDBMovies(endpoint = 'popular') {
  const res = await fetch(`${BASE_URL}/movie/${endpoint}?api_key=${TMDB_API_KEY}&with_original_language=hi`)
  const data = await res.json()
  return data.results || []
}

export async function getMoviesByGenre(genreId) {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&with_original_language=hi&sort_by=popularity.desc`)
  const data = await res.json()
  return data.results || []
}

export async function getGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en`)
  const data = await res.json()
  return data.genres || []
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos`)
  const data = await res.json()
  return data
}

export async function getTMDBMovieById(id) {
  return getMovieDetails(id)
}

export function getTMDBTrailerUrl(movie) {
  if (!movie?.videos?.results) return null
  const trailer = movie.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
}
