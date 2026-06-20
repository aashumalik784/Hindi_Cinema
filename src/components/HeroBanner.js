'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaPlay, FaInfoCircle } from 'react-icons/fa'
import { getTMDBImageUrl } from '@/lib/tmdb'
import { truncateText } from '@/lib/utils'

export default function HeroBanner({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (movies.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [movies.length])

  if (!movies || movies.length === 0) return null

  const movie = movies[currentIndex]
  const backdropUrl = getTMDBImageUrl(movie.backdrop_path, 'original')

  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {movie.title}
          </h1>
          <p className="text-lg text-gray-200 mb-6 drop-shadow-md">
            {truncateText(movie.overview, 200)}
          </p>
          
          <div className="flex gap-4">
            <Link 
              href={`/movies/${movie.id}`}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition"
            >
              <FaPlay /> Play Trailer
            </Link>
            <Link 
              href={`/movies/${movie.id}`}
              className="flex items-center gap-2 bg-gray-500/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-500/50 transition"
            >
              <FaInfoCircle /> More Info
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition ${
              idx === currentIndex? 'bg-netflix-red w-8' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
