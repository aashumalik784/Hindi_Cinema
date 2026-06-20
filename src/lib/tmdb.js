const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export async function getTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&with_original_language=hi`)
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
