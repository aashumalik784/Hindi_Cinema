import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-darker border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">🎬 Hindi Cinema</h3>
            <p className="text-gray-400 text-sm">
              Stream free public domain Bollywood classics and discover the latest movies. 
              100% legal and free!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/watch" className="text-gray-400 hover:text-white transition">
                  Watch Free Movies
                </Link>
              </li>
              <li>
                <Link href="/movies" className="text-gray-400 hover:text-white transition">
                  Latest Movies
                </Link>
              </li>
              <li>
                <Link href="/categories/public-domain/classic" className="text-gray-400 hover:text-white transition">
                  Classic Cinema
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>✅ All movies are public domain</li>
              <li>✅ Sourced from Internet Archive</li>
              <li>✅ No copyrighted content</li>
              <li>✅ DMCA Compliant</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Hindi Cinema. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ for movie lovers</p>
        </div>
      </div>
    </footer>
  );
            }
