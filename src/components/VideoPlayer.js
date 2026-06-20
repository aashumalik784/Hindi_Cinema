'use client';

import { useState } from 'react';

export default function VideoPlayer({ videoUrl, poster, title }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading video...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white text-center">
            <p className="text-red-500 mb-2">⚠ Error loading video</p>
            <p className="text-sm text-gray-400">Please try again later</p>
          </div>
        </div>
      )}
      
      <video
        controls
        poster={poster}
        className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoadedData={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
