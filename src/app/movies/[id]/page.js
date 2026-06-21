import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTMDMovieById, getAllTMDMovies } from '../../../lib/tmdb';

export function generateStaticParams() {
  const movies = getAllTMDMovies();
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export function generateMetadata({ params }) {
  const movie = getTMDMovieById(params.id);
  if (!movie) return { title: 'Movie Not Found' };
  return {
    title: `${movie.title} - Hindi Cinema`,
    description: movie.overview || `Watch ${movie.title}`,
  };
}

export default function MovieDetailPage({ params }) {
  const movie = getTMDMovieById(params.id);
  
  if (!movie) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/movies"
        className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition"
      >
        ← Back to Movies
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="md:col-span-1">
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-6xl">🎬</span>
            </div>
          )}        </div>

        {/* Movie Info */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
          
          {movie.original_title && movie.original_title !== movie.title && (
            <p className="text-gray-400 text-lg mb-4">{movie.original_title}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            {movie.rating && movie.rating > 0 && (
              <span className="flex items-center bg-yellow-600/20 text-yellow-500 px-3 py-1 rounded-full">
                ⭐ {movie.rating}/10
              </span>
            )}
            {movie.year && movie.year !== 'Unknown' && (
              <span className="text-gray-400">📅 {movie.year}</span>
            )}
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
            </div>
          )}

          {/* Streaming Links */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Watch On</h2>
            <div className="flex flex-wrap gap-3">
              {movie.netflix && (
                <a
                  href={movie.netflix}
                  target="_blank"
                  rel="noopener noreferrer"                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  🟥 Netflix
                </a>
              )}
              {movie.prime && (
                <a
                  href={movie.prime}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  🔵 Prime Video
                </a>
              )}
              {movie.hotstar && (
                <a
                  href={movie.hotstar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  ⭐ Disney+ Hotstar
                </a>
              )}
              {movie.jiocinema && (
                <a
                  href={movie.jiocinema}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2.5 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  🟡 JioCinema
                </a>
              )}
              {movie.zee5 && (
                <a
                  href={movie.zee5}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  🟣 Zee5
                </a>
              )}
              {movie.sonyliv && (
                <a
                  href={movie.sonyliv}
                  target="_blank"
                  rel="noopener noreferrer"                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  🔷 SonyLIV
                </a>
              )}
              {movie.apple && (
                <a
                  href={movie.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  🍎 Apple TV+
                </a>
              )}
              {movie.youtube && (
                <a
                  href={movie.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  ▶️ YouTube
                </a>
              )}
              {!movie.netflix && !movie.prime && !movie.hotstar && !movie.jiocinema && !movie.zee5 && !movie.sonyliv && !movie.apple && !movie.youtube && (
                <p className="text-gray-400">Streaming information not available</p>
              )}
            </div>
          </div>

          {/* Trailer Placeholder */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Trailer</h2>
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">🎥 Trailer will be available soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
            }
