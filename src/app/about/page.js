import Link from 'next/link';

export const metadata = {
  title: 'About Us - Hindi Cinema',
  description: 'Learn about Hindi Cinema - our mission to preserve classic Hindi movies and provide latest Bollywood updates legally.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition"
        >
          ← Back to Home
        </Link>

        <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">
          About Hindi Cinema
        </h1>
        
        <div className="space-y-6 text-gray-300">
          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Our Mission</h2>
            <p>
              Hindi Cinema is dedicated to preserving and promoting classic Hindi movies that are in the public domain. 
              We believe great cinema should be accessible to everyone, legally and for free.
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">What We Offer</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="text-green-500 font-semibold">100% Legal Public Domain Movies:</span> Watch classic Hindi films 
                sourced directly from Internet Archive. All content is verified to be in the public domain.
              </li>
              <li>
                <span className="text-red-500 font-semibold">Latest Bollywood Trailers:</span> Stay updated with trailers 
                and info for the newest Hindi movies via TMDB. We link to official sources only.
              </li>
              <li>
                <span className="text-white font-semibold">No Hosting of Copyrighted Content:</span> We do not host, stream, 
                or distribute any copyrighted material. All movie streams are embedded from Internet Archive.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Data Sources</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a href="https://archive.org" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">
                  Internet Archive
                </a> - Public domain movie repository
              </li>
              <li>
                <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">
                  The Movie Database (TMDB)
                </a> - Latest movie metadata and trailers
              </li>
            </ul>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
            <h3 className="text-yellow-500 font-bold mb-2">⚠️ Legal Disclaimer</h3>
            <p className="text-sm">
              This website does not host any copyrighted content. All public domain movies are streamed from 
              Internet Archive under their terms. TMDB data is used for informational purposes only. 
              We link to official YouTube trailers. If you believe any content violates copyright, 
              please contact us via our DMCA page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
                  }
