import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getTMDMovieById, getAllTMDMovies } from '../../../lib/tmdb';
import { getStreamingLinks, formatDate } from '../../../lib/utils';

export function generateStaticParams() {
  const movies = getAllTMDMovies();
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export function generateMetadata({ params }) {
  const movie = getTMDMovieById(params.id);
  
  if (!movie) {
    return {
      title: 'Movie Not Found',
    };
  }

  return {
    title: `${movie.title} - Info & Trailer`,
    description: movie.overview || `Details about ${movie.title}`,
  };
}

export default function MovieDetailPage({ params }) {
  const movie = getTMDMovieById(params.id);

  if (!movie) {
    notFound();
  }

  const streamingLinks = getStreamingLinks(movie.title);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href="/movies"
        className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition"
      >
        ← Back to Movies
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="md:col-span-1">          {movie.poster ? (
            <Image
              src={movie.poster}
              alt={movie.title}
              width={500}
              height={750}
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-6xl">🎬</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
          
          {movie.original_title && movie.original_title !== movie.title && (
            <p className="text-gray-400 text-lg mb-4">{movie.original_title}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            {movie.rating && (
              <span className="flex items-center bg-yellow-600/20 text-yellow-500 px-3 py-1 rounded-full">
                ⭐ {movie.rating.toFixed(1)}/10
              </span>
            )}
            <span className="text-gray-400">📅 {formatDate(movie.release_date)}</span>
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre, index) => (
                <span
                  key={index}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {movie.overview && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>          )}

          {/* Streaming Options */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Watch On</h2>
            <div className="flex flex-wrap gap-4">
              <a
                href={streamingLinks.netflix}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                📺 Netflix
              </a>
              <a
                href={streamingLinks.prime}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                🎬 Prime Video
              </a>
              <a
                href={streamingLinks.hotstar}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                ⭐ Hotstar
              </a>
            </div>
          </div>

          {/* Trailer */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Trailer</h2>
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">
                🎥 Trailer will be available soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
            }
