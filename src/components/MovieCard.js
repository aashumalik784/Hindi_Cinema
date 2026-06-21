import Link from 'next/link';
import Image from 'next/image';

export default function MovieCard({ movie, type }) {
  const isStreaming = type === 'streaming';
  
  // Poster URL with fallback
  const posterUrl = movie.poster || null;
  
  // Link destination
  const linkHref = isStreaming ? `/watch/${movie.id}` : `/movies/${movie.id}`;
  
  return (
    <div className="bg-dark rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {/* Poster */}
      <div className="relative aspect-[2/3] bg-gray-800">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback when image fails to load
              e.target.style.display = 'none';
              const fallback = e.target.parentElement.querySelector('.poster-fallback');
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback when no poster or image fails */}
        <div 
          className="poster-fallback absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900"
          style={{ display: posterUrl ? 'none' : 'flex' }}
        >
          <div className="text-center">
            <div className="text-6xl mb-2"></div>
            <p className="text-gray-400 text-sm px-4">{movie.title}</p>
          </div>
        </div>
        
        {/* FREE Badge for streaming movies */}
        {isStreaming && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            FREE
          </div>
        )}
        
        {/* INFO Badge for TMDB movies */}
        {!isStreaming && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            INFO
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 min-h-[3rem]">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
          <span>📅 {movie.year || 'Unknown'}</span>
          {movie.rating && movie.rating > 0 && (
            <span className="flex items-center gap-1">
              ⭐ {movie.rating}
            </span>
          )}
        </div>
        
        {/* Genres */}
        {movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genres.slice(0, 2).map((genre, index) => (
              <span
                key={index}
                className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
        
        {/* Action Button */}
        <Link
          href={linkHref}
          className={`block w-full text-center py-2.5 rounded-lg font-semibold transition ${
            isStreaming
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {isStreaming ? '▶ Watch Now' : 'ℹ More Info'}
        </Link>
      </div>
    </div>
  );
}
