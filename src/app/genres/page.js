import Link from 'next/link'
import { TMDB_GENRES } from '@/lib/tmdb'

export default function GenresPage() {
  const genreList = Object.entries(TMDB_GENRES).map(([id, name]) => ({
    id: parseInt(id),
    name
  }))

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
          Browse by Genre
        </h1>
        <p className="text-gray-400">
          Explore movies by your favorite genre
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genreList.map((genre) => (
            <Link
              key={genre.id}
              href={`/genres/${genre.id}`}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-6 text-center transition group"
            >
              <h3 className="text-white text-lg font-semibold group-hover:text-netflix-red transition">
                {genre.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
