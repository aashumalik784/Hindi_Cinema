import { notFound } from 'next/navigation';
import VideoPlayer from '../../../components/VideoPlayer';
import Link from 'next/link';
import { getPublicDomainMovieById, getAllPublicDomainMovies } from '../../../lib/archive';

export function generateStaticParams() {
  const movies = getAllPublicDomainMovies();
  return movies.map((movie) => ({
    id: movie.id,
  }));
}

export function generateMetadata({ params }) {
  const movie = getPublicDomainMovieById(params.id);
  
  if (!movie) {
    return {
      title: 'Movie Not Found',
    };
  }

  return {
    title: `${movie.title} - Watch Free`,
    description: movie.description || `Watch ${movie.title} for free`,
  };
}

export default function WatchMoviePage({ params }) {
  const movie = getPublicDomainMovieById(params.id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href="/watch"
        className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition"
      >
        ← Back to Movies
      </Link>

      {/* Video Player */}
      <div className="mb-8">
        <VideoPlayer
          videoUrl={movie.videoUrl}
          poster={movie.poster}
          title={movie.title}
        />
      </div>

      {/* Movie Info */}
      <div className="bg-dark rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-4">{movie.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-400">
          <span>📅 {movie.year}</span>
          {movie.genre && movie.genre.length > 0 && (
            <span>🎭 {movie.genre.join(', ')}</span>
          )}
          <span>📁 {movie.source}</span>
        </div>

        {movie.description && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">About</h2>
            <p className="text-gray-300 leading-relaxed">{movie.description}</p>
          </div>
        )}

        {/* Download Button */}
        {movie.videoUrl && (
          <a
            href={movie.videoUrl}
            download
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            ⬇ Download Movie
          </a>
        )}
      </div>
    </div>
  );
            }
