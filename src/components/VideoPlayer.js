'use client';

import { useState, useRef } from 'react';

export default function VideoPlayer({ videoUrl, poster, title }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const videoRef = useRef(null);

  const handleVideoError = () => {
    setIsLoading(false);
    setError(true);
    
    // Check video element error
    if (videoRef.current && videoRef.current.error) {
      const errorCode = videoRef.current.error.code;
      switch(errorCode) {
        case 1:
          setErrorMessage('Video loading aborted');
          break;
        case 2:
          setErrorMessage('Network error while loading video');
          break;
        case 3:
          setErrorMessage('Video decoding failed - format not supported');
          break;
        case 4:
          setErrorMessage('Video format not supported by your browser');
          break;
        default:
          setErrorMessage('Unknown error occurred');
      }
    } else {
      setErrorMessage('Unable to load video');
    }
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading video...</p>
            <p className="text-sm text-gray-400 mt-2">Please wait</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white text-center p-6">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <p className="text-red-400 mb-2 font-semibold">Video Loading Failed</p>
            <p className="text-sm text-gray-400 mb-4">{errorMessage}</p>
            <div className="text-xs text-gray-500">
              <p>Trying alternative sources...</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        controls
        poster={poster}
        className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoadedData={() => setIsLoading(false)}
        onError={handleVideoError}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        crossOrigin="anonymous"
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
                }
