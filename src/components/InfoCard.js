import Link from 'next/link';

export default function InfoCard({ movie }) {
  // Overview ko chhota karna agar bahut lamba ho
  const shortOverview = movie.overview 
    ? movie.overview.length > 120 
      ? movie.overview.substring(0, 120) + '...' 
      : movie.overview 
    : 'No description available.';

  return (
    <div className="bg-dark rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-800 flex flex-col h-full">
      
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] w-full bg-gray-900">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-600 text-4xl">🎬</span>
          </div>
        )}
        
        {/* Rating Badge */}
        {movie.rating && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
            ⭐ {movie.rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white font-semibold text-lg mb-1 truncate">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
          <span>📅 {movie.year}</span>
          {movie.genres && movie.genres.length > 0 && (
            <span className="truncate ml-2">🎭 {movie.genres[0]}</span>
          )}
        </div>

        {/* Short Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
          {shortOverview}
        </p>

        {/* Action Button */}
        <Link
          href={`/movies/${movie.id}`}
          className="block w-full text-center bg-primary hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition mt-auto"
        >
          ℹ️ More Info & Trailer
        </Link>
      </div>
    </div>
  );
          }
