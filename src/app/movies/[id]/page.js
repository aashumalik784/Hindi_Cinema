<div className="mb-8">
  <h2 className="text-xl font-semibold text-white mb-4">Watch On</h2>
  <div className="flex flex-wrap gap-4">
    {movie.netflix && (
      <a href={movie.netflix} target="_blank" rel="noopener noreferrer"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
        🟥 Netflix
      </a>
    )}
    {movie.prime && (
      <a href={movie.prime} target="_blank" rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
        🔵 Prime Video
      </a>
    )}
    {movie.hotstar && (
      <a href={movie.hotstar} target="_blank" rel="noopener noreferrer"
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
        ⭐ Disney+ Hotstar
      </a>
    )}
    {movie.jiocinema && (
      <a href={movie.jiocinema} target="_blank" rel="noopener noreferrer"
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
        🟡 JioCinema
      </a>
    )}
    {movie.zee5 && (
      <a href={movie.zee5} target="_blank" rel="noopener noreferrer"
        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
        🟣 Zee5
      </a>
    )}
    {movie.sonyliv && (
      <a href={movie.sonyliv} target="_blank" rel="noopener noreferrer"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
        🔷 SonyLIV
      </a>
    )}
  </div>
</div>
