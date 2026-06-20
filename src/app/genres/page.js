import Link from 'next/link';
import { TMDB_GENRES, getMoviesByGenre } from '../../lib/tmdb';

export const metadata = {
  title: 'Browse by Genre - Hindi Cinema',
  description: 'Browse movies by genre - Action, Comedy, Drama, Romance and more',
};

export default function GenresPage() {
  // Genre icons mapping
  const genreIcons = {
    'Action': '🔫',
    'Adventure': '🏔️',
    'Animation': '🎨',
    'Comedy': '😂',
    'Crime': '🔍',
    'Documentary': '📹',
    'Drama': '🎭',
    'Family': '👨‍👩‍👧',
    'Fantasy': '🧙',
    'History': '📜',
    'Horror': '😱',
    'Music': '🎵',
    'Mystery': '🔎',
    'Romance': '💕',
    'Science Fiction': '🚀',
    'TV Movie': '📺',
    'Thriller': '😰',
    'War': '⚔️',
    'Western': '🤠',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          🎭 Browse by Genre
        </h1>
        <p className="text-gray-400 text-lg">
          Find movies by your favorite category
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.entries(TMDB_GENRES).map(([id, name]) => {
          const movies = getMoviesByGenre(id);
          const icon = genreIcons[name] || '🎬';
          
          return (
            <Link
              key={id}
              href={`/genres/${id}`}
              className="bg-dark hover:bg-gray-800 rounded-lg p-6 transition-all duration-300 transform hover:scale-105 border border-gray-800 hover:border-primary"
            >
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="text-white font-semibold text-xl mb-2">
                {name}
              </h3>
              <p className="text-gray-400 text-sm">
                {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
