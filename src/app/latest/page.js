import MovieRow from '@/components/MovieRow'
import { getTMDBMovies } from '@/lib/tmdb'

export default async function LatestPage() {
  const tmdbMovies = await getTMDBMovies()
  
  const nowPlaying = tmdbMovies.slice(0, 12)
  const upcoming = tmdbMovies.slice(12, 24)
  const topRated = tmdbMovies
   .sort((a, b) => b.vote_average - a.vote_average)
   .slice(0, 12)

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
          Latest Bollywood Movies
        </h1>
        <p className="text-gray-400">
          Trailers and info for the newest Hindi movies from TMDB
        </p>
      </div>

      <MovieRow 
        title="Now Playing" 
        movies={nowPlaying} 
        type="tmdb"
      />
      
      <MovieRow 
        title="Upcoming Movies" 
        movies={upcoming} 
        type="tmdb"
      />
      
      <MovieRow 
        title="Top Rated" 
        movies={topRated} 
        type="tmdb"
      />
    </div>
  )
}
