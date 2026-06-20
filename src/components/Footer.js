import Link from 'next/link'
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-netflix-red text-2xl font-bold mb-4">
              HINDI CINEMA
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Watch free public domain Hindi movies and latest Bollywood trailers. 
              All public domain content sourced from Internet Archive.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" className="text-gray-400 hover:text-white transition">
                <FaGithub size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-white transition">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Browse</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link href="/watch" className="text-gray-400 hover:text-white transition">Watch Free</Link></li>
              <li><Link href="/latest" className="text-gray-400 hover:text-white transition">Latest Movies</Link></li>
              <li><Link href="/genres" className="text-gray-400 hover:text-white transition">Genres</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
              <li><Link href="/dmca" className="text-gray-400 hover:text-white transition">DMCA</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Hindi Cinema. Public domain movies from{' '}
            <a 
              href="https://archive.org" 
              target="_blank" 
              className="text-netflix-red hover:underline"
            >
              Internet Archive
            </a>
            . Latest movie data from{' '}
            <a 
              href="https://www.themoviedb.org" 
              target="_blank" 
              className="text-netflix-red hover:underline"
            >
              TMDB
            </a>
            .
          </p>
          <p className="text-gray-600 text-xs mt-2">
            This site does not host any copyrighted content. All trailers link to official sources.
          </p>
        </div>
      </div>
    </footer>
  )
}
