import Link from 'next/link'
import { FaGithub, FaHeart } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-netflix-black border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-netflix-red text-xl font-bold mb-3">MyHindiMovies</h3>
            <p className="text-gray-400 text-sm">
              Watch free public domain Hindi movies + Get info about latest Bollywood releases
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/watch" className="text-gray-400 hover:text-white">Free Movies</Link></li>
              <li><Link href="/movies" className="text-gray-400 hover:text-white">Latest Movies</Link></li>
              <li><Link href="/categories/public-domain/action" className="text-gray-400 hover:text-white">Categories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400">Public Domain Movies Only</span></li>
              <li><span className="text-gray-400">TMDB Data for Info Only</span></li>
              <li><span className="text-gray-400">No Piracy</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-1">
            Made with <FaHeart className="text-netflix-red" /> by Aashu Malik | Data from Internet Archive & TMDB
          </p>
        </div>
      </div>
    </footer>
  )
}
