export function formatDate(dateString) {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getYouTubeTrailerId(movieTitle) {
  // This is a placeholder - in real app, you'd search YouTube API
  return null;
}

export function getStreamingLinks(movieTitle) {
  // Return affiliate links for popular platforms
  const encodedTitle = encodeURIComponent(movieTitle);
  return {
    netflix: `https://www.netflix.com/search?q=${encodedTitle}`,
    prime: `https://www.primevideo.com/region/eu/search/ref=atv_sr_srch?phrase=${encodedTitle}`,
    hotstar: `https://www.hotstar.com/in/search?q=${encodedTitle}`,
  };
}
