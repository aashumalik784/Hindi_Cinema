const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

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

function cleanTitle(title) {
  if (!title) return { title: 'Unknown Title', year: null };
  
  let clean = title
    .replace(/\b(untouched|web|dl|brrip|hdrip|dvdrip|bluray|blu-ray)\b/gi, '')
    .replace(/\b(720p|1080p|480p|2160p|4k)\b/gi, '')
    .replace(/\b(avc|h264|h265|hevc|x264|x265|aac|mp3|ac3|dts)\b/gi, '')
    .replace(/\b(superhit|blockbuster|bollywood|hollywood|south|dubbed)\b/gi, '')
    .replace(/\b(movie|film|cinema|video|full)\b/gi, '')
    .replace(/\b(and|with|feat|ft)\b/gi, '')
    .replace(/\[(.*?)\]/g, '')
    .replace(/[._]+/g, ' ')
    .replace(/[-]{2,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  const yearMatch = clean.match(/\b(19|20)\d{2}\b/);
  if (yearMatch) {
    const year = yearMatch[0];
    clean = clean.replace(year, '').trim();
    clean = clean.replace(/[\s\(\)\[\]\-_:,.]+$/, '').trim();
    return { title: clean, year: year };
  }
  
  if (clean.length > 60) {
    clean = clean.substring(0, 60).trim();
    const lastSpace = clean.lastIndexOf(' ');
    if (lastSpace > 40) {
      clean = clean.substring(0, lastSpace);
    }
  }  
  return { title: clean || title, year: null };
}

function extractYear(title, metadataYear) {
  if (metadataYear && !isNaN(metadataYear)) {
    return metadataYear.toString();
  }
  
  if (title) {
    const yearMatch = title.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
      return yearMatch[0];
    }
  }
  
  return 'Unknown';
}

function extractGenre(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  const genres = [];
  
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
    'Historical': ['historical', 'history', 'period', 'ancient', 'king', 'queen'],
    'Adventure': ['adventure', 'journey', 'quest', 'exploration'],
  };
  
  for (const [genre, keywords] of Object.entries(genreKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      genres.push(genre);
    }
  }
  
  return genres.length > 0 ? genres : ['Classic'];
}

async function fetchPoster(identifier) {
  try {
    const posterUrls = [
      `https://archive.org/services/img/${identifier}`,      `https://archive.org/download/${identifier}/__ia_thumb.jpg`,
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

async function fetchVideoUrl(identifier) {
  try {
    const url = `https://archive.org/metadata/${identifier}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.files) return null;
    
    const videoFiles = data.files.filter(f => {
      const isVideo = f.name.endsWith('.mp4') || f.name.endsWith('.webm') || f.name.endsWith('.ogg');
      const isOriginal = f.source === 'original';
      const hasGoodSize = f.size && parseInt(f.size) > 10000000;
      
      return isVideo && isOriginal && hasGoodSize;
    });
    
    if (videoFiles.length === 0) {
      const altVideos = data.files.filter(f => 
        (f.name.endsWith('.mp4') || f.name.endsWith('.webm')) &&
        f.format && f.format.includes('Video')
      );
      
      if (altVideos.length > 0) {
        const mp4File = altVideos.find(f => f.name.endsWith('.mp4'));
        return mp4File 
          ? `https://archive.org/download/${identifier}/${mp4File.name}`
          : `https://archive.org/download/${identifier}/${altVideos[0].name}`;
      }
      
      return null;    }
    
    videoFiles.sort((a, b) => {
      if (a.name.endsWith('.mp4') && !b.name.endsWith('.mp4')) return -1;
      if (!a.name.endsWith('.mp4') && b.name.endsWith('.mp4')) return 1;
      
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
                    const videoUrl = await fetchVideoUrl(doc.identifier);
          
          if (videoUrl) {
            const poster = await fetchPoster(doc.identifier);
            const { title: cleanTitleText, year: titleYear } = cleanTitle(doc.title);
            const year = extractYear(doc.title, doc.year) || titleYear || 'Unknown';
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
            
            console.log(`  ✅ Added: ${cleanTitleText} (${year})`);
          }
          
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error fetching query "${query}":`, error.message);
    }
  }
  
  console.log(`\n📊 Total processed: ${totalProcessed}`);
  console.log(`✅ Total movies added: ${allMovies.length}`);
  
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const filePath = path.join(dataDir, 'public-domain-movies.json');
  fs.writeFileSync(filePath, JSON.stringify(allMovies, null, 2));
  
  console.log(`\n🎉 Successfully saved ${allMovies.length} movies to ${filePath}`);
}

fetchPublicDomainMovies().catch(error => {
  console.error('❌ Fatal error:', error);  process.exit(1);
});
