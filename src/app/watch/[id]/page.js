'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import publicMovies from '@/data/public-domain-movies.json'

export default function WatchPage() {
  const params = useParams()
  const movie = publicMovies.find(m => m.id === params.id)

  if (!movie) return <div className="text-white p-8 pt-20">Movie not found</div>

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{movie.title}</h1>
        <iframe
          src={`https://archive.org/embed/${movie.identifier}`}
          width="100%"
          height="600"
          frameBorder="0"
          allowFullScreen
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  )
}
