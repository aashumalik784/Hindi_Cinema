import Link from 'next/link';

export default function StreamingCard({ movie }) {
  // Title ko chhota karna agar bahut lamba ho
  const shortTitle = movie.title && movie.title.length > 40 
    ? movie.title.substring(0, 40) + '...' 
    : movie.title;

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
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <span className="text-gray-600 text-4xl">🎬</span>
          </div>
        )}
        
        {/* FREE Badge */}
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
          ▶ FREE
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white font-semibold text-lg mb-1 truncate" title={movie.title}>
          {shortTitle}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
          <span>📅 {movie.year}</span>
          {movie.genre && movie.genre.length > 0 && (
            <span className="truncate ml-2">🎭 {movie.genre[0]}</span>
          )}
        </div>

        {/* Action Button */}
        <Link
          href={`/watch/${movie.id}`}
          className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold transition mt-auto flex items-center justify-center gap-2"
        >
          ▶ Watch Now
        </Link>
      </div>
    </div>
  );
}
