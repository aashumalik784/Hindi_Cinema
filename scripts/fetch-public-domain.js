const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const SEARCH_QUERIES = [
  'hindi film public domain',
  'bollywood classic movie',
  'indian cinema public domain',
  'hindi old movie',
];

// Words that indicate it's NOT a movie
const NOT_MOVIE_INDICATORS = [
  'episode', 'podcast', 'series', 'season', 's01', 's02', 's03', 's04',
  'complete series', 'complete season', 'tv show', 'documentary',
  'horror of babylon', 'the horror of babylon', 'drawn together',
  'meet the crew', 'bonus episode', '13 nights of halloween',
  'alien-a-thon', 'treehouse of horror', 'stephen king is a sex pervert',
  '10 horror comics', 'japanese editions', 'haunting ground part'
];

// Remove unwanted keywords from titles
const UNWANTED_KEYWORDS = [
  'untouched', 'web', 'dl', 'brrip', 'hdrip', 'dvdrip', 'bluray', 'blu-ray',
  '720p', '1080p', '480p', '2160p', '4k', 'hd', 'sd',
  'avc', 'h264', 'h265', 'hevc', 'x264', 'x265', 'aac', 'mp3', 'ac3', 'dts',
  'superhit', 'blockbuster', 'bollywood', 'hollywood', 'south', 'dubbed',
  'movie', 'film', 'cinema', 'video', 'full', 'and', 'with', 'feat', 'ft',
  'bhaiyaa', 'bade bhaiyaa', 'hindi', 'english', 'esub', 'esubs',
  'funny', 'action', 'comedy', 'romantic', 'drama', 'thriller',
  'shahrukh khan', 'salman khan', 'aamir khan', 'akshay kumar',
  'madhuri dixit', 'sunny deol', 'rishi kapoor', 'meenakshi sheehadri'
];

// Clean movie title
function cleanTitle(title) {
  if (!title) return { title: 'Unknown Title', year: null };
  
  let clean = title;
  
  // Remove brackets content (but keep year in parentheses)
  clean = clean.replace(/\[(.*?)\]/g, '');
  clean = clean.replace(/\((.*?)\)/g, (match, content) => {
    // Keep if it's a year
    if (/\b(19|20)\d{2}\b/.test(content)) {
      return match;
    }
    return '';
  });
    // Remove unwanted keywords
  UNWANTED_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    clean = clean.replace(regex, '');
  });
  
  // Remove multiple dots, dashes, underscores, pipes
  clean = clean.replace(/[._|]+/g, ' ');
  clean = clean.replace(/[-]{2,}/g, ' ');
  
  // Remove extra spaces
  clean = clean.replace(/\s+/g, ' ').trim();
  
  // Remove trailing punctuation
  clean = clean.replace(/[,.\-_:]+$/, '').trim();
  
  // Extract year
  const yearMatch = clean.match(/\b(19|20)(\d{2})\b/);
  let year = null;
  
  if (yearMatch) {
    year = yearMatch[0];
    clean = clean.replace(year, '').trim();
    clean = clean.replace(/[\s\(\)]+$/, '').trim();
  }
  
  // Limit title length
  if (clean.length > 80) {
    clean = clean.substring(0, 80).trim();
    const lastSpace = clean.lastIndexOf(' ');
    if (lastSpace > 60) {
      clean = clean.substring(0, lastSpace);
    }
  }
  
  // Capitalize properly
  clean = clean.split(' ').map(word => {
    if (word.length > 2) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word.toUpperCase();
  }).join(' ');
  
  return { 
    title: clean || title.split('(')[0].trim(), 
    year 
  };
}

// Check if it's actually a movie (not podcast/TV show)function isMovie(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  
  // If it contains podcast/TV show indicators, reject it
  for (const indicator of NOT_MOVIE_INDICATORS) {
    if (text.includes(indicator.toLowerCase())) {
      return false;
    }
  }
  
  // Must have a year or look like a movie title
  const hasYear = /\b(19|20)\d{2}\b/.test(text);
  const hasMovieKeywords = /\b(movie|film|cinema|picture)\b/.test(text);
  
  return hasYear || hasMovieKeywords || title.length < 100;
}

// Extract year from title or metadata
function extractYear(title, metadataYear) {
  // First try metadata year
  if (metadataYear && !isNaN(metadataYear) && metadataYear > 1900 && metadataYear < 2030) {
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
  
  const genreKeywords = {
    'Action': ['action', 'fight', 'battle', 'war', 'martial', 'karate', 'kung fu', 'stunt'],
    'Comedy': ['comedy', 'funny', 'humor', 'laugh', 'hilarious', 'comic'],
    'Drama': ['drama', 'emotional', 'serious', 'story', 'tragedy'],
    'Romance': ['romance', 'love', 'romantic', 'lover', 'beloved', 'pyaar', 'ishq'],
    'Horror': ['horror', 'scary', 'ghost', 'haunted', 'demon', 'bhoot', 'monster'],
    'Thriller': ['thriller', 'suspense', 'mystery', 'detective', 'crime', 'murder'],
    'Musical': ['musical', 'music', 'song', 'dance', 'singer', 'geet', 'sangeet'],
    'Family': ['family', 'children', 'kids', 'cartoon', 'animation'],
    'Classic': ['classic', 'vintage', 'old', 'golden', 'retro'],    'Historical': ['historical', 'history', 'period', 'ancient', 'king', 'queen', 'raj'],
    'Adventure': ['adventure', 'journey', 'quest', 'exploration', 'safari'],
    'Crime': ['crime', 'gangster', 'mafia', 'heist', 'robbery'],
  };
  
  for (const [genre, keywords] of Object.entries(genreKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      genres.push(genre);
    }
  }
  
  // Default to Classic if no genre found and it's an old movie
  return genres.length > 0 ? genres : ['Classic'];
}

// Fetch movie poster/cover image
async function fetchPoster(identifier) {
  try {
    const posterUrls = [
      `https://archive.org/services/img/${identifier}`,
      `https://archive.org/download/${identifier}/__ia_thumb.jpg`,
      `https://archive.org/download/${identifier}/poster.jpg`,
      `https://archive.org/download/${identifier}/cover.jpg`,
    ];
    
    for (const url of posterUrls) {
      try {
        const response = await fetch(url, { method: 'HEAD', timeout: 3000 });
        if (response.ok && response.status === 200) {
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
    // Filter video files - prefer MP4 with good size
    const videoFiles = data.files.filter(f => {
      const isVideo = f.name.endsWith('.mp4') || f.name.endsWith('.webm') || f.name.endsWith('.ogg');
      const isOriginal = f.source === 'original';
      const hasGoodSize = f.size && parseInt(f.size) > 50000000; // At least 50MB
      const isNotTooLarge = f.size && parseInt(f.size) < 5000000000; // Less than 5GB
      
      return isVideo && isOriginal && hasGoodSize && isNotTooLarge;
    });
    
    if (videoFiles.length === 0) {
      // Try any video file
      const altVideos = data.files.filter(f => 
        (f.name.endsWith('.mp4') || f.name.endsWith('.webm')) &&
        f.format && f.format.includes('Video')
      );
      
      if (altVideos.length > 0) {
        // Prefer MP4
        const mp4File = altVideos.find(f => f.name.endsWith('.mp4'));
        return mp4File 
          ? `https://archive.org/download/${identifier}/${mp4File.name}`
          : `https://archive.org/download/${identifier}/${altVideos[0].name}`;
      }
      
      return null;
    }
    
    // Sort by quality - prefer MP4 and reasonable size
    videoFiles.sort((a, b) => {
      // Prefer MP4 over other formats
      if (a.name.endsWith('.mp4') && !b.name.endsWith('.mp4')) return -1;
      if (!a.name.endsWith('.mp4') && b.name.endsWith('.mp4')) return 1;
      
      // Then by size (prefer medium-large files, not too small or too large)
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

// Main fetch functionasync function fetchPublicDomainMovies() {
  console.log('🎬 Fetching public domain movies from Internet Archive...');
  console.log(`📊 Using ${SEARCH_QUERIES.length} search queries\n`);
  
  const allMovies = [];
  const seenIdentifiers = new Set();
  let totalProcessed = 0;
  let rejectedCount = 0;
  
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
          
          // Check if it's actually a movie
          if (!isMovie(doc.title, doc.description || '')) {
            rejectedCount++;
            console.log(`  ❌ Rejected (not a movie): ${doc.title.substring(0, 50)}...`);
            continue;
          }
          
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
            
            // Clean description
            const description = (doc.description || '')
              .replace(/https?:\/\/\S+/g, '') // Remove URLs
              .replace(/\s+/g, ' ')
              .trim()
              .substring(0, 500); // Limit to 500 chars
            
            allMovies.push({
              id: doc.identifier,
              title: cleanTitleText,
              year: year,
              description: description || 'A classic film from the golden era of cinema.',
              poster: poster,
              videoUrl: videoUrl,
              genre: genre,
              source: 'Internet Archive',
              addedAt: new Date().toISOString(),
            });
            
            console.log(`  ✅ Added: ${cleanTitleText} (${year}) - ${poster ? '✓ Poster' : ' No Poster'}`);
          } else {
            console.log(`  ⚠️  No video found: ${doc.title.substring(0, 50)}...`);
          }
          
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
  console.log(`❌ Rejected (not movies): ${rejectedCount}`);
  console.log(`✅ Total movies added: ${allMovies.length}`);
  
  // Save to JSON file
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
    const filePath = path.join(dataDir, 'public-domain-movies.json');
  fs.writeFileSync(filePath, JSON.stringify(allMovies, null, 2));
  
  console.log(`\n🎉 Successfully saved ${allMovies.length} movies to ${filePath}`);
  console.log('\n✨ Sample movies:');
  allMovies.slice(0, 5).forEach(movie => {
    console.log(`  • ${movie.title} (${movie.year}) - ${movie.genre.join(', ')}`);
  });
}

// Run the script
fetchPublicDomainMovies().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
