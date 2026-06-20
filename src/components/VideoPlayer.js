'use client'
import { useEffect, useRef } from 'react'

export default function VideoPlayer({ videoUrl, title }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.focus()
    }
  }, [])

  return (
    <div className="w-full bg-black">
      <div className="max-w-7xl mx-auto">
        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-full h-auto max-h-screen"
          controlsList="nodownload"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
          {title}
        </h1>
        <p className="text-gray-400 text-sm">
          Playing from Internet Archive - Public Domain Movie
        </p>
      </div>
    </div>
  )
}
