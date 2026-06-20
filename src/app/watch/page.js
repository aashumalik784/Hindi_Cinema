import MovieCard from '../../components/MovieCard';
import Link from 'next/link';
import { getAllPublicDomainMovies, getAllGenres } from '../../lib/archive';

export const metadata = {
  title: 'Watch Free Movies - Hindi Cinema',
  description: 'Stream free public domain Bollywood classic movies',
};

export default function WatchPage() {
  const movies = getAllPublicDomainMovies();
  const genres = getAllGenres();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          🎥 Watch Free Movies
        </h1>
        <p className="text-gray-400 text-lg">
          Stream {movies.length} legally free public domain Hindi classic movies
        </p>
      </div>

      {/* Genre Filters */}
      {genres.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <span className="text-gray-400 py-2">Filter by genre:</span>
          {genres.map((genre) => (
            <Link
              key={genre}
              href={`/categories/public-domain/${genre.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition"
            >
              {genre}
            </Link>
          ))}
        </div>
      )}

      {/* Movies Grid */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} type="streaming" />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-dark rounded-lg">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold text-white mb-2">No Movies Yet</h2>
          <p className="text-gray-400 mb-4">
            Public domain movies will appear here once fetched
          </p>
          <p className="text-sm text-gray-500">
            Run: npm run fetch:public-domain
          </p>
        </div>
      )}
    </div>
  );
        }
