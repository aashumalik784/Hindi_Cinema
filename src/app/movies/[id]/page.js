'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getTMDBMovieById, getTMDBImageUrl } from '@/lib/tmdb'
import { formatRuntime, formatDate } from '@/lib/utils'

export default function MovieDetailPage() {
  const params = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMovie() {
      const data = await getTMDBMovieById(params.id)
      setMovie(data)
      setLoading(false)
    }
    loadMovie()
  }, [params.id])

  if (loading) return <div className="text-white p-8 pt-20">Loading...</div>
  if (!movie) return <div className="text-white p-8 pt-20">Movie not found</div>

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <img 
            src={getTMDBImageUrl(movie.poster_path)} 
            alt={movie.title}
            className="w-full md:w-96 rounded-lg"
          />
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <p className="text-gray-400 mb-2">{formatDate(movie.release_date)} • {formatRuntime(movie.runtime)}</p>
            <p className="text-lg mb-6">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
