// Desktop Navigation section ko replace karein:
<div className="hidden md:flex items-center space-x-8">
  <Link href="/watch" className="text-gray-300 hover:text-white transition">
    🎥 Watch Free Movies
  </Link>
  <Link href="/movies" className="text-gray-300 hover:text-white transition">
    🆕 Latest Movies
  </Link>
  <Link href="/genres" className="text-gray-300 hover:text-white transition">
    🎭 Genres
  </Link>
</div>

// Mobile Navigation section ko replace karein:
{mobileMenuOpen && (
  <div className="md:hidden py-4 space-y-4">
    <Link href="/watch" className="block text-gray-300 hover:text-white">
      🎥 Watch Free Movies
    </Link>
    <Link href="/movies" className="block text-gray-300 hover:text-white">
      🆕 Latest Movies
    </Link>
    <Link href="/genres" className="block text-gray-300 hover:text-white">
      🎭 Genres
    </Link>
  </div>
)}
