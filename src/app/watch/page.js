import MovieRow from '@/components/MovieRow'
import { getPublicDomainMovies } from '@/lib/archive'

export default async function WatchPage() {
  const publicDomainMovies = await getPublicDomainMovies()
  
  const actionMovies = publicDomainMovies.filter(m => 
    m.subject?.toLowerCase().includes('action') || 
    m.title?.toLowerCase().includes('action')
  )
  
  const dramaMovies = publicDomainMovies.filter(m => 
    m.subject?.toLowerCase().includes('drama')
  )
  
  const comedyMovies = publicDomainMovies.filter(m => 
    m.subject?.toLowerCase().includes('comedy')
  )

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
          Free Public Domain Movies
        </h1>
        <p className="text-gray-400">
          Watch classic Hindi movies - 100% Legal & Free
        </p>
      </div>

      <MovieRow 
        title="All Public Domain Movies" 
        movies={publicDomainMovies} 
        type="public-domain"
      />
      
      {actionMovies.length > 0 && (
        <MovieRow 
          title="Action" 
          movies={actionMovies} 
          type="public-domain"
        />
      )}
      
      {dramaMovies.length > 0 && (
        <MovieRow 
          title="Drama" 
          movies={dramaMovies} 
          type="public-domain"
        />
      )}
      
      {comedyMovies.length > 0 && (
        <MovieRow 
          title="Comedy" 
          movies={comedyMovies} 
          type="public-domain"
        />
      )}
    </div>
  )
}
