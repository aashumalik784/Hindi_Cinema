import Link from 'next/link'
import Image from 'next/image'
import { FaPlay, FaInfoCircle, FaStar } from 'react-icons/fa'
import { getTMDBImageUrl } from '@/lib/tmdb'
import { getArchiveThumbnail } from '@/lib/archive'
import { getYearFromDate } from '@/lib/utils'

export default function MovieCard({ movie, type = 'tmdb' }) {
  const isPD = type === 'public-domain'
  
  const imageUrl = isPD 
    ? getArchiveThumbnail(movie.identifier)
    : getTMDBImageUrl(movie.poster_path)
  
  const title = isPD ? movie.title : movie.title
  const year = isPD ? movie.year : getYearFromDate(movie.release_date)
  const rating = isPD ? movie.avg_rating : movie.vote_average
  
  const linkUrl = isPD 
    ? `/watch/${movie.identifier}`
    : `/movies/${movie.id}`

  return (
    <Link href={linkUrl}>
      <div className="group relative bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div className="aspect-[2/3] relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                {isPD ? (
                  <FaPlay className="text-netflix-red" />
                ) : (
                  <FaInfoCircle className="text-blue-400" />
                )}
                <span className="text-xs font-semibold">
                  {isPD ? 'Watch Free' : 'View Info'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm line-clamp-1 mb-1">
            {title}
          </h3>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{year}</span>
            {rating && (
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-500" />
                <span>{typeof rating === 'number' ? rating.toFixed(1) : rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
