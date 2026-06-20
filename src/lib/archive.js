// Internet Archive se public domain movies fetch karne ke functions

export async function getPublicDomainMovies() {
  try {
    const data = await import('@/data/public-domain-movies.json')
    return data.default || []
  } catch (error) {
    console.error('Error loading public domain movies:', error)
    return []
  }
}

export async function getPublicDomainMovieById(id) {
  const movies = await getPublicDomainMovies()
  return movies.find(movie => movie.identifier === id)
}

export async function getPublicDomainMoviesByGenre(genre) {
  const movies = await getPublicDomainMovies()
  return movies.filter(movie => 
    movie.subject?.toLowerCase().includes(genre.toLowerCase()) ||
    movie.title?.toLowerCase().includes(genre.toLowerCase())
  )
}

export function getArchiveVideoUrl(identifier, filename) {
  return `https://archive.org/download/${identifier}/${filename}`
}

export function getArchiveThumbnail(identifier) {
  return `https://archive.org/services/img/${identifier}`
}
