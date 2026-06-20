import Link from "next/link"
import publicDomainMovies from "../../data/public-domain-movies.json"
import tmdbMovies from "../../data/tmdb-movies.json"
import StreamingCard from "../components/StreamingCard"
import InfoCard from "../components/InfoCard"
import SectionDivider from "../components/SectionDivider"
import HeroSection from "../components/HeroSection"
export default function Home() {
  return (
    <main className="bg-gray-900 text-white min-h-screen">
      <HeroSection />
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">🎥 Watch Free Movies</h2>
            <p className="text-gray-400">Legally free classic movies - No signup!</p>
          </div>
          <Link href="/watch" className="text-red-500 hover:text-red-400">View All →</Link>
        </div>
        <StreamingCard movies={publicDomainMovies.slice(0, 6)} />
      </section>
      <SectionDivider />
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">🆕 Latest Movies</h2>
            <p className="text-gray-400">Info, trailers & streaming links</p>
          </div>
          <Link href="/movies" className="text-red-500 hover:text-red-400">View All →</Link>
        </div>
        <InfoCard movies={tmdbMovies.slice(0, 6)} />
      </section>
    </main>
  );
}
