import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-netflix-black pt-16">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-netflix-red mb-4">404</h1>
        <h2 className="text-white text-3xl font-bold mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. 
          It might have been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            Go Home
          </Link>
          <Link
            href="/watch"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            Watch Free Movies
          </Link>
        </div>
      </div>
    </div>
  )
}
