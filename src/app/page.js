import HeroBanner from '@/components/HeroBanner'
import MovieRow from '@/components/MovieRow'
import { getTMDBMovies } from '@/lib/tmdb'
import { getPublicDomainMovies } from '@/lib/archive'

export default async function Home() {
  const tmdbMovies = await getTMDBMovies()
  const publicDomainMovies = await getPublicDomainMovies()
  
  const featuredMovies = tmdbMovies.slice(0, 5)
  const trendingTMDB = tmdbMovies.slice(0, 12)
  const publicDomainRow = publicDomainMovies.slice(0, 12)
  
  const dramaMovies = tmdbMovies.filter(m => 
    m.genre_ids?.includes(18)
  ).slice(0, 12)
  
  const actionMovies = tmdbMovies.filter(m => 
    m.genre_ids?.includes(28)
  ).slice(0, 12)

  return (
    <div className="pt-16">
      <HeroBanner movies={featuredMovies} />
      
      <div className="mt-8">
        <MovieRow 
          title="Free Public Domain Movies" 
          movies={publicDomainRow} 
          type="public-domain"
        />
        
        <MovieRow 
          title="Trending Latest Movies" 
          movies={trendingTMDB}
          type="tmdb"
        />
        
        <MovieRow 
          title="Drama Movies" 
          movies={dramaMovies}
          type="tmdb"
        />
        
        <MovieRow 
          title="Action Movies" 
          movies={actionMovies}
          type="tmdb"
        />
      </div>
    </div>
  )
}
