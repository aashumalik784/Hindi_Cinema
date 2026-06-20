import VideoPlayer from '@/components/VideoPlayer'
import MovieRow from '@/components/MovieRow'
import { getPublicDomainMovieById, getPublicDomainMovies, getArchiveVideoUrl } from '@/lib/archive'
import { formatDate, truncateText } from '@/lib/utils'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const movie = await getPublicDomainMovieById(params.id)
  if (!movie) return { title: 'Movie Not Found' }
  
  return {
    title: `${movie.title} - Watch Free | Hindi Cinema`,
    description: truncateText(movie.description, 160),
  }
}

export default async function WatchMoviePage({ params }) {
  const movie = await getPublicDomainMovieById(params.id)
  
  if (!movie) {
    notFound()
  }

  const allMovies = await getPublicDomainMovies()
  const relatedMovies = allMovies
   .filter(m => m.identifier!== movie.identifier)
   .slice(0, 12)

  const videoUrl = getArchiveVideoUrl(movie.identifier, movie.files?.[0] || 'movie.mp4')

  return (
    <div className="pt-16">
      <VideoPlayer videoUrl={videoUrl} title={movie.title} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-white text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-300 mb-4">{movie.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Year: </span>
                <span className="text-white">{movie.year}</span>
              </div>
              <div>
                <span className="text-gray-500">Rating: </span>
                <span className="text-white">{movie.avg_rating || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-500">Views: </span>
                <span className="text-white">{movie.downloads?.toLocaleString('en-IN') || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-500">Added: </span>
                <span className="text-white">{formatDate(movie.date)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-3">Details</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500 block">Subject:</span>
                <span className="text-white">{movie.subject || 'Classic Cinema'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Source:</span>
                <span className="text-green-500">Internet Archive - Public Domain</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MovieRow 
        title="More Free Movies" 
        movies={relatedMovies} 
        type="public-domain"
      />
    </div>
  )
}
