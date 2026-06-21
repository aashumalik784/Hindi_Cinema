import HeroSection from '../components/HeroSection';
import SectionDivider from '../components/SectionDivider';
import MovieCard from '../components/MovieCard';
import Link from 'next/link';
import { getAllPublicDomainMovies } from '../lib/archive';
import { getAllTMDMovies, getTrendingMovies } from '../lib/tmdb';

export default function Home() {
  const publicDomainMovies = getAllPublicDomainMovies().slice(0, 6);
  const tmdbMovies = getTrendingMovies(6);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Public Domain Movies Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
               Watch Free Movies
            </h2>
            <p className="text-gray-400">
              Legally free classic Hindi movies from Internet Archive
            </p>
          </div>
          <Link
            href="/watch"
            className="text-primary hover:text-red-400 font-semibold"
          >
            View All →
          </Link>
        </div>

        {publicDomainMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicDomainMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} type="streaming" />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-dark rounded-lg">
            <p className="text-gray-400">Loading movies...</p>
            <p className="text-sm text-gray-500 mt-2">
              Run the fetch script to add movies
            </p>
          </div>
        )}
      </section>

      <SectionDivider title="OR" />

      {/* TMDB Movies Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
               Latest Movies
            </h2>
            <p className="text-gray-400">
              Discover trending Bollywood releases with trailers
            </p>
          </div>
          <Link
            href="/movies"
            className="text-primary hover:text-red-400 font-semibold"
          >
            View All →
          </Link>
        </div>

        {tmdbMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tmdbMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} type="info" />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-dark rounded-lg">
            <p className="text-gray-400">Loading movies...</p>
            <p className="text-sm text-gray-500 mt-2">
              Run the fetch script to add movies
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
