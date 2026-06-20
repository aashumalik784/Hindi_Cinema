import Link from 'next/link';
import Image from 'next/image';

export default function MovieCard({ movie, type }) {
  const isStreaming = type === 'streaming';
  
  return (
    <div className="bg-dark rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      {/* Poster */}
      <div className="relative aspect-[2/3]">
        {movie.poster ? (
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-600 text-4xl">🎬</span>
          </div>
        )}
        
        {/* Badge */}
        <div className="absolute top-2 right-2">
          {isStreaming ? (
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
              FREE
            </span>
          ) : (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded">
              INFO
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-1 truncate">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>{movie.year}</span>
          {movie.rating && (
            <span className="flex items-center">
              ⭐ {movie.rating.toFixed(1)}
            </span>
          )}
        </div>

        {movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genres.slice(0, 2).map((genre, index) => (
              <span
                key={index}
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        {/* Button */}
        <Link
          href={isStreaming ? `/watch/${movie.id}` : `/movies/${movie.id}`}
          className={`block w-full text-center py-2 rounded font-semibold transition ${
            isStreaming
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-primary hover:bg-red-700 text-white'
          }`}
        >
          {isStreaming ? '▶ Watch Now' : 'ℹ More Info'}
        </Link>
      </div>
    </div>
  );
            }
