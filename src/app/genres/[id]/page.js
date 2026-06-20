import MovieRow from '@/components/MovieRow'
import { getTMDBMovies, TMDB_GENRES } from '@/lib/tmdb'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const genreName = TMDB_GENRES[params.id]
  if (!genreName) return { title: 'Genre Not Found' }
  
  return {
    title: `${genreName} Movies - Hindi Cinema`,
    description: `Watch ${genreName} Bollywood movies and trailers`,
  }
}

export default async function GenrePage({ params }) {
  const genreId = parseInt(params.id)
  const genreName = TMDB_GENRES[genreId]
  
  if (!genreName) {
    notFound()
  }

  const allMovies = await getTMDBMovies()
  const genreMovies = allMovies.filter(movie => 
    movie.genre_ids?.includes(genreId)
  )

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
          {genreName} Movies
        </h1>
        <p className="text-gray-400">
          {genreMovies.length} movies found in {genreName} genre
        </p>
      </div>

      {genreMovies.length > 0? (
        <MovieRow 
          title={`${genreName} Movies`} 
          movies={genreMovies} 
          type="tmdb"
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-400 text-center py-12">
            No movies found in this genre yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  )
}
