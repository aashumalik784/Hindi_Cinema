'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getMoviesByGenre, TMDB_GENRES } from '@/lib/tmdb'
import MovieRow from '@/components/MovieRow'

export default function GenrePage() {
  const params = useParams()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const genreName = TMDB_GENRES[params.id] || 'Movies'

  useEffect(() => {
    async function loadMovies() {
      const data = await getMoviesByGenre(params.id)
      setMovies(data)
      setLoading(false)
    }
    if (params.id) loadMovies()
  }, [params.id])

  if (loading) return <div className="text-white p-8 pt-20">Loading...</div>

  return (
    <div className="min-h-screen bg-black pt-20">
      <MovieRow title={genreName} movies={movies} />
    </div>
  )
}
