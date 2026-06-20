import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-primary/20 to-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Watch Free <span className="text-primary">Bollywood</span> Classics
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Stream legally free public domain Hindi movies and discover the latest 
          Bollywood releases. No signup required, 100% free!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/watch"
            className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition text-lg"
          >
            🎥 Start Watching Free
          </Link>
          <Link
            href="/movies"
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition text-lg"
          >
            🆕 Browse Latest Movies
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-dark/50 p-6 rounded-lg">
            <div className="text-3xl mb-2">🎬</div>
            <h3 className="text-white font-semibold mb-1">100+ Free Movies</h3>
            <p className="text-gray-400 text-sm">Classic Bollywood cinema</p>
          </div>
          <div className="bg-dark/50 p-6 rounded-lg">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-white font-semibold mb-1">100% Legal</h3>
            <p className="text-gray-400 text-sm">Public domain content only</p>
          </div>
          <div className="bg-dark/50 p-6 rounded-lg">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="text-white font-semibold mb-1">Watch Anywhere</h3>
            <p className="text-gray-400 text-sm">Mobile & desktop friendly</p>
          </div>
        </div>
      </div>
    </section>
  );
}
