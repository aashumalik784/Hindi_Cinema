const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Internet Archive API - Search for public domain Hindi/Bollywood movies
const SEARCH_QUERIES = [
  'hindi film public domain',
  'bollywood classic movie',
  'indian cinema public domain',
  'hindi old movie',
];

async function fetchPublicDomainMovies() {
  console.log('🎬 Fetching public domain movies from Internet Archive...');
  
  const allMovies = [];
  const seenTitles = new Set();
  
  for (const query of SEARCH_QUERIES) {
    try {
      const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}&fl[]=identifier,title,year,description,poster,image&sort[]=downloads+desc&rows=50&output=json`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.response && data.response.docs) {
        for (const doc of data.response.docs) {
          if (!seenTitles.has(doc.title)) {
            seenTitles.add(doc.title);
            
            // Get movie details
            const movieDetails = await fetchMovieDetails(doc.identifier);
            
            if (movieDetails && movieDetails.videoUrl) {
              allMovies.push({
                id: doc.identifier,
                title: doc.title,
                year: doc.year || 'Unknown',
                description: doc.description || '',
                poster: doc.poster || doc.image || null,
                videoUrl: movieDetails.videoUrl,
                genre: extractGenre(doc.title),
                source: 'Internet Archive',
                addedAt: new Date().toISOString(),
              });
            }
          }
        }
      }
            // Wait to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`Error fetching query "${query}":`, error.message);
    }
  }
  
  // Save to JSON file
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const filePath = path.join(dataDir, 'public-domain-movies.json');
  fs.writeFileSync(filePath, JSON.stringify(allMovies, null, 2));
  
  console.log(`✅ Saved ${allMovies.length} public domain movies to ${filePath}`);
}

async function fetchMovieDetails(identifier) {
  try {
    const url = `https://archive.org/metadata/${identifier}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.files) {
      // Find video file (mp4 or ogg)
      const videoFile = data.files.find(f => 
        (f.name.endsWith('.mp4') || f.name.endsWith('.ogg')) && 
        f.source === 'original'
      );
      
      if (videoFile) {
        return {
          videoUrl: `https://archive.org/download/${identifier}/${videoFile.name}`
        };
      }
    }
  } catch (error) {
    console.error(`Error fetching details for ${identifier}:`, error.message);
  }
  
  return null;
}

function extractGenre(title) {
  // Simple genre extraction based on keywords
  const lowerTitle = title.toLowerCase();
  const genres = [];  
  if (lowerTitle.includes('comedy')) genres.push('Comedy');
  if (lowerTitle.includes('drama')) genres.push('Drama');
  if (lowerTitle.includes('romance') || lowerTitle.includes('love')) genres.push('Romance');
  if (lowerTitle.includes('action')) genres.push('Action');
  if (lowerTitle.includes('horror')) genres.push('Horror');
  if (lowerTitle.includes('thriller')) genres.push('Thriller');
  
  return genres.length > 0 ? genres : ['Classic'];
}

// Run the script
fetchPublicDomainMovies().catch(console.error);
