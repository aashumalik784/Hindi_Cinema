import Link from 'next/link'
import { FaHome, FaFilm, FaVideo, FaList } from 'react-icons/fa'

export default function Navbar() {
  return (
    <nav className="bg-netflix-black/95 backdrop-blur-sm fixed w-full z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-netflix-red text-2xl font-bold">MyHindiMovies</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
              <FaHome /> <span className="hidden sm:inline">Home</span>
            </Link>
            <Link href="/watch" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
              <FaVideo /> <span className="hidden sm:inline">Free Movies</span>
            </Link>
            <Link href="/movies" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
              <FaFilm /> <span className="hidden sm:inline">Latest Movies</span>
            </Link>
            <Link href="/categories/public-domain/action" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
              <FaList /> <span className="hidden sm:inline">Categories</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
