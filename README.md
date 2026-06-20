4. Fetch movies:
```bash
   npm run fetch:public-domain
   npm run fetch:tmdb
```
5. Run development server: `npm run dev`

## Auto-Update

GitHub Actions automatically fetches new movies daily:
- Public domain movies: Every day at 6 AM UTC
- TMDB movies: Every day at 12 PM UTC

## Legal Compliance

This project is 100% legal:
- ✅ Only streams public domain movies from Internet Archive
- ✅ Links to official YouTube trailers for latest movies
- ✅ No copyrighted content hosted on our servers
- ✅ Full DMCA policy and takedown process
- ✅ Compliant with TMDB API terms

## Deployment to Cloudflare Pages

1. Push code to GitHub
2. Go to Cloudflare Dashboard → Workers & Pages
3. Create new Pages application
4. Connect to your GitHub repository
5. Build settings:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `out`
6. Add environment variable: `TMDB_API_KEY`
7. Deploy!

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run fetch:public-domain` - Fetch public domain movies
- `npm run fetch:tmdb` - Fetch TMDB movies
- `npm run fetch:all` - Fetch all movies

## License

MIT License - Free to use and modify
