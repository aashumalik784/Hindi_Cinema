const fs = require("fs");
const axios = require("axios");
const TMDB_API_KEY = process.env.TMDB_API_KEY;
async function fetchTMDBMovies() {
  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=hi-IN&region=IN&page=1`;
    const res = await axios.get(url);
    const movies = res.data.results.slice(0, 20);
    fs.writeFileSync("./data/tmdb-movies.json", JSON.stringify(movies, null, 2));
    console.log(`✅ Fetched ${movies.length} TMDB movies`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
fetchTMDBMovies();
