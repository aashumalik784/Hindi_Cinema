'use client'
import Link from 'next/link'

export default function MovieRow({ title, movies }) {
  if (!movies || movies.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white px-4">{title}</h2>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4 px-4 pb-4">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-none w-40 md:w-48">
            <Link href={`/movie/${movie.id}`}>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
                alt={movie.title}
                className="w-full h-60 md:h-72 object-cover rounded-lg hover:scale-105 transition-transform duration-200"
              />
              <p className="text-white text-sm mt-2 truncate">{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
