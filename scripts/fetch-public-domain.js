const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Better search queries for Hindi/Bollywood movies
const SEARCH_QUERIES = [
  'hindi film public domain',
  'bollywood classic movie',
  'indian cinema public domain',
  'hindi old movie',
  'hindi movie 1950s',
  'hindi movie 1960s',
  'hindi movie 1970s',
  'classic bollywood',
  'hindi drama film',
  'hindi comedy movie',
  'hindi romance film',
  'hindi action movie',
];

// Clean movie title - remove extra technical info
function cleanTitle(title) {
  if (!title) return 'Unknown Title';
  
  let clean = title
    // Remove common technical terms
    .replace(/\b(untouched|web|dl|brrip|hdrip|dvdrip|bluray|blu-ray)\b/gi, '')
    .replace(/\b(720p|1080p|480p|2160p|4k)\b/gi, '')
    .replace(/\b(avc|h264|h265|hevc|x264|x265|aac|mp3|ac3|dts)\b/gi, '')
    .replace(/\b(superhit|blockbuster|bollywood|hollywood|south|dubbed)\b/gi, '')
    .replace(/\b(movie|film|cinema|video|full)\b/gi, '')
    .replace(/\b(and|with|feat|ft)\b/gi, '')
    // Remove brackets content (but keep year)
    .replace(/\[(.*?)\]/g, '')
    // Remove multiple dots, dashes, underscores
    .replace(/[._]+/g, ' ')
    .replace(/[-]{2,}/g, ' ')
    // Remove extra spaces
    .replace(/\s+/g, ' ')
    .trim();
  
  // Extract year if present
  const yearMatch = clean.match(/\b(19|20)\d{2}\b/);
  if (yearMatch) {
    const year = yearMatch[0];
    // Remove year from title
    clean = clean.replace(year, '').trim();
    // Remove trailing punctuation
    clean = clean.replace(/[\s\(\)\[\]\-_:,.]+$/, '').trim();
    return { title: clean, year: year };  }
  
  // Limit title length
  if (clean.length > 60) {
    clean = clean.substring(0, 60).trim();
    // Remove last word if it's incomplete
    const lastSpace = clean.lastIndexOf(' ');
    if (lastSpace > 40) {
      clean = clean.substring(0, lastSpace);
    }
  }
  
  return { title: clean || title, year: null };
}

// Extract year from title or metadata
function extractYear(title, metadataYear) {
  // First try metadata year
  if (metadataYear && !isNaN(metadataYear)) {
    return metadataYear.toString();
  }
  
  // Then try title
  if (title) {
    const yearMatch = title.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
      return yearMatch[0];
    }
  }
  
  return 'Unknown';
}

// Better genre extraction
function extractGenre(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  const genres = [];
  
  // Genre keywords mapping
  const genreKeywords = {
    'Action': ['action', 'fight', 'battle', 'war', 'martial', 'karate', 'kung fu'],
    'Comedy': ['comedy', 'funny', 'humor', 'laugh', 'hilarious'],
    'Drama': ['drama', 'emotional', 'serious', 'story'],
    'Romance': ['romance', 'love', 'romantic', 'lover', 'beloved'],
    'Horror': ['horror', 'scary', 'ghost', 'haunted', 'demon', 'bhoot'],
    'Thriller': ['thriller', 'suspense', 'mystery', 'detective', 'crime'],
    'Musical': ['musical', 'music', 'song', 'dance', 'singer'],
    'Family': ['family', 'children', 'kids', 'cartoon', 'animation'],
    'Classic': ['classic', 'vintage', 'old', 'golden'],
    'Historical': ['historical', 'history', 'period', 'ancient', 'king', 'queen'],    'Adventure': ['adventure', 'journey', 'quest', 'exploration'],
  };
  
  for (const [genre, keywords] of Object.entries(genreKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      genres.push(genre);
    }
  }
  
  // Default to Classic if no genre found
  return genres.length > 0 ? genres : ['Classic'];
}

// Fetch movie poster/cover image
async function fetchPoster(identifier) {
  try {
    // Try multiple poster sources
    const posterUrls = [
      `https://archive.org/services/img/${identifier}`,
      `https://archive.org/download/${identifier}/__ia_thumb.jpg`,
      `https://archive.org/metadata/${identifier}/poster`,
    ];
    
    for (const url of posterUrls) {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
          return url;
        }
      } catch (e) {
        continue;
      }
    }
  } catch (error) {
    console.error(`Error fetching poster for ${identifier}:`, error.message);
  }
  
  return null;
}

// Fetch video URL with quality preference
async function fetchVideoUrl(identifier) {
  try {
    const url = `https://archive.org/metadata/${identifier}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.files) return null;
    
    // Prefer HD videos, then SD    const videoFiles = data.files.filter(f => 
      (f.name.endsWith('.mp4') || f.name.endsWith('.ogg') || f.name.endsWith('.mkv')) &&
      f.source === 'original'
    );
    
    if (videoFiles.length === 0) {
      // Try non-original sources
      const altVideos = data.files.filter(f => 
        (f.name.endsWith('.mp4') || f.name.endsWith('.ogg')) &&
        f.format && f.format.includes('Video')
      );
      
      if (altVideos.length > 0) {
        // Prefer higher quality
        altVideos.sort((a, b) => {
          const aSize = parseInt(a.size) || 0;
          const bSize = parseInt(b.size) || 0;
          return bSize - aSize; // Larger file = better quality
        });
        
        return `https://archive.org/download/${identifier}/${altVideos[0].name}`;
      }
      
      return null;
    }
    
    // Sort by size (larger = better quality)
    videoFiles.sort((a, b) => {
      const aSize = parseInt(a.size) || 0;
      const bSize = parseInt(b.size) || 0;
      return bSize - aSize;
    });
    
    return `https://archive.org/download/${identifier}/${videoFiles[0].name}`;
    
  } catch (error) {
    console.error(`Error fetching video for ${identifier}:`, error.message);
    return null;
  }
}

// Main fetch function
async function fetchPublicDomainMovies() {
  console.log('🎬 Fetching public domain movies from Internet Archive...');
  console.log(`📊 Using ${SEARCH_QUERIES.length} search queries\n`);
  
  const allMovies = [];
  const seenIdentifiers = new Set();
  let totalProcessed = 0;
    for (let i = 0; i < SEARCH_QUERIES.length; i++) {
    const query = SEARCH_QUERIES[i];
    console.log(`\n[${i + 1}/${SEARCH_QUERIES.length}] Searching: "${query}"`);
    
    try {
      const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}&fl[]=identifier,title,year,description,mediatype&sort[]=downloads+desc&rows=50&output=json`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.response && data.response.docs) {
        const docs = data.response.docs.filter(doc => 
          doc.mediatype === 'movies' && !seenIdentifiers.has(doc.identifier)
        );
        
        console.log(`  Found ${docs.length} potential movies`);
        
        for (const doc of docs) {
          if (seenIdentifiers.has(doc.identifier)) continue;
          
          seenIdentifiers.add(doc.identifier);
          totalProcessed++;
          
          // Fetch video URL
          const videoUrl = await fetchVideoUrl(doc.identifier);
          
          if (videoUrl) {
            // Fetch poster
            const poster = await fetchPoster(doc.identifier);
            
            // Clean title and extract year
            const { title: cleanTitleText, year: titleYear } = cleanTitle(doc.title);
            const year = extractYear(doc.title, doc.year) || titleYear || 'Unknown';
            
            // Extract genres
            const genre = extractGenre(doc.title, doc.description || '');
            
            allMovies.push({
              id: doc.identifier,
              title: cleanTitleText,
              year: year,
              description: doc.description || '',
              poster: poster,
              videoUrl: videoUrl,
              genre: genre,
              source: 'Internet Archive',
              addedAt: new Date().toISOString(),
            });
            
            console.log(`  ✅ Added: ${cleanTitleText} (${year})`);          }
          
          // Rate limiting - wait 500ms between requests
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      // Wait between queries
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error fetching query "${query}":`, error.message);
    }
  }
  
  console.log(`\n📊 Total processed: ${totalProcessed}`);
  console.log(`✅ Total movies added: ${allMovies.length}`);
  
  // Save to JSON file
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const filePath = path.join(dataDir, 'public-domain-movies.json');
  fs.writeFileSync(filePath, JSON.stringify(allMovies, null, 2));
  
  console.log(`\n🎉 Successfully saved ${allMovies.length} movies to ${filePath}`);
}

// Run the script
fetchPublicDomainMovies().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
