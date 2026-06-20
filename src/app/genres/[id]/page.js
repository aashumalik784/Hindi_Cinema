import { notFound } from 'next/navigation';
import Link from 'next/link';
import MovieCard from '../../../components/MovieCard';
import { 
  TMDB_GENRES, 
  getMoviesByGenre, 
  getGenreName 
} from '../../../lib/tmdb';

// Generate static params for all genres
export function generateStaticParams() {
  return Object.keys(TMDB_GENRES).map((id) => ({
    id: id,
  }));
}

// Generate metadata
export function generateMetadata({ params }) {
  const genreName = getGenreName(params.id);
  
  return {
    title: `${genreName} Movies - Hindi Cinema`,
    description: `Watch ${genreName} movies on Hindi Cinema`,
  };
}

export default function GenrePage({ params }) {
  const genreId = params.id;
  const genreName = getGenreName(genreId);
  const movies = getMoviesByGenre(genreId);

  // Genre icons
  const genreIcons = {
    'Action': '🔫',
    'Adventure': '🏔️',
    'Animation': '🎨',
    'Comedy': '😂',
    'Crime': '🔍',
    'Documentary': '📹',
    'Drama': '🎭',
    'Family': '👨‍‍👧',
    'Fantasy': '🧙',
    'History': '📜',
    'Horror': '😱',
    'Music': '🎵',
    'Mystery': '🔎',
    'Romance': '💕',
    'Science Fiction': '🚀',
    'TV Movie': '📺',
    'Thriller': '😰',    'War': '⚔️',
    'Western': '🤠',
  };

  const icon = genreIcons[genreName] || '🎬';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link
        href="/genres"
        className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition"
      >
        ← Back to Genres
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{icon}</span>
          <div>
            <h1 className="text-4xl font-bold text-white">{genreName}</h1>
            <p className="text-gray-400 text-lg">
              {movies.length} {movies.length === 1 ? 'movie' : 'movies'} available
            </p>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} type="info" />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-dark rounded-lg">
          <div className="text-6xl mb-4">{icon}</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            No {genreName} Movies Yet
          </h2>
          <p className="text-gray-400 mb-4">
            Movies in this category will appear here soon
          </p>
          <Link
            href="/genres"
            className="text-primary hover:text-red-400 font-semibold"
          >
            Browse Other Genres →          </Link>
        </div>
      )}
    </div>
  );
}
