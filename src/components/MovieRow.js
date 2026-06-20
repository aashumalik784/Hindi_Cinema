'use client'
import { useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import MovieCard from './MovieCard'

export default function MovieRow({ title, movies, type = 'tmdb' }) {
  const rowRef = useRef(null)

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  if (!movies || movies.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4 px-4 sm:px-6 lg:px-8">
        {title}
      </h2>
      
      <div className="group relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-r opacity-0 group-hover:opacity-100 transition"
        >
          <FaChevronLeft size={24} />
        </button>

        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-scroll scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div key={movie.id || movie.identifier} className="flex-none w-40 sm:w-48">
              <MovieCard movie={movie} type={type} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-l opacity-0 group-hover:opacity-100 transition"
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}
