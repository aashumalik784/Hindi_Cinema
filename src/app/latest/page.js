'use client'
import { useEffect, useState } from 'react'
import { getTrendingMovies } from '@/lib/tmdb'
import MovieRow from '@/components/MovieRow'

export default function LatestPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMovies() {
      const data = await getTrendingMovies()
      setMovies(data)
      setLoading(false)
    }
    loadMovies()
  }, [])

  if (loading) return <div className="text-white p-8 pt-20">Loading...</div>

  return (
    <div className="min-h-screen bg-black pt-20">
      <MovieRow title="Latest Bollywood Movies" movies={movies} />
    </div>
  )
}
