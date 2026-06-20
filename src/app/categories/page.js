'use client'
import publicMovies from '@/data/public-domain-movies.json'
import MovieRow from '@/components/MovieRow'

export default function CategoriesPage() {
  const genres = [...new Set(publicMovies.flatMap(m => m.genre))]
  
  return (
    <div className="min-h-screen bg-black pt-20 px-4">
      <h1 className="text-4xl font-bold text-white mb-8">Color Movie Categories</h1>
      {genres.map(genre => {
        const genreMovies = publicMovies.filter(m => m.genre.includes(genre))
        return <MovieRow key={genre} title={genre} movies={genreMovies} />
      })}
    </div>
  )
}
