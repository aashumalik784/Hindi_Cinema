import Image from 'next/image'
import Link from 'next/link'
import { FaPlay, FaStar, FaCalendar, FaClock } from 'react-icons/fa'
import MovieRow from '@/components/MovieRow'
import { getTMDBMovieById, getTMDBMovies, getTMDBImageUrl, getTMDBTrailerUrl, TMDB_GENRES } from '@/lib/tmdb'
import { formatDate, truncateText, formatRuntime } from '@/lib/utils'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const movie = await getTMDBMovieById(params.id)
  if (!movie) return { title: 'Movie Not Found' }
  
  return {
    title: `${movie.title} - Hindi Cinema`,
    description: truncateText(movie.overview, 160),
  }
}

export default async function MovieDetailPage({ params }) {
  const movie = await getTMDBMovieById(params.id)
  
  if (!movie) {
    notFound()
  }

  const allMovies = await getTMDBMovies()
  const relatedMovies = allMovies
   .filter(m => 
      m.id!== movie.id && 
      m.genre_ids?.some(g => movie.genre_ids?.includes(g))
    )
   .slice(0, 12)

  const backdropUrl = getTMDBImageUrl(movie.backdrop_path, 'original')
  const posterUrl = getTMDBImageUrl(movie.poster_path, 'w500')
  const trailerUrl = getTMDBTrailerUrl(movie.videos)

  return (
    <div className="pt-16">
      <div className="relative h-96 w-full">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-black/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-none w-64 mx-auto md:mx-0">
            <Image
              src={posterUrl}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-lg shadow-2xl"
            />
          </div>

          <div className="flex-1 text-white">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-500" />
                <span>{movie.vote_average?.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendar />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              {movie.runtime && (
                <div className="flex items-center gap-1">
                  <FaClock />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre_ids?.map(genreId => (
                <span 
                  key={genreId}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                >
                  {TMDB_GENRES[genreId]}
                </span>
              ))}
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {movie.overview}
            </p>

            {trailerUrl && (
              <Link
                href={trailerUrl}
                target="_blank"
                className="inline-flex items-center gap-2 bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded font-semibold transition"
              >
                <FaPlay /> Watch Trailer
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <MovieRow 
          title="Similar Movies" 
          movies={relatedMovies} 
          type="tmdb"
        />
      </div>
    </div>
  )
}
