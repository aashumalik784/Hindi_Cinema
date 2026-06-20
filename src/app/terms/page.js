export default function TermsPage() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">
          Terms of Service
        </h1>
        
        <div className="space-y-6 text-gray-300">
          <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-4">
            <p className="text-sm">
              <strong>Last Updated:</strong> June 20, 2026
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Hindi Cinema, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our website.
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">2. Service Description</h2>
            <p className="mb-3">
              Hindi Cinema provides:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Free streaming of public domain Hindi movies via Internet Archive embeds</li>
              <li>Information and trailers for latest Bollywood movies via TMDB</li>
              <li>No hosting of copyrighted content on our servers</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">3. User Conduct</h2>
            <p className="mb-3">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to download or redistribute copyrighted content</li>
              <li>Reverse engineer or hack the website</li>
              <li>Use automated systems to scrape content excessively</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">4. Intellectual Property</h2>
            <p>
              <strong>Public Domain Movies:</strong> All movies in our "Watch Free" section are in the public domain. 
              We do not claim ownership of these films.
            </p>
            <p className="mt-2">
              <strong>TMDB Data:</strong> Movie metadata, posters, and trailers are provided by TMDB under their terms. 
              We do not claim ownership of this data.
            </p>
            <p className="mt-2">
              <strong>Our Content:</strong> The Hindi Cinema website design, logo, and code are owned by us. 
              You may not copy or reproduce without permission.
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">5. Disclaimer of Warranties</h2>
            <p>
              The service is provided "AS IS" without warranties of any kind. We do not guarantee that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>The service will be uninterrupted or error-free</li>
              <li>All public domain movies will always be available</li>
              <li>TMDB data will be 100% accurate</li>
              <li>Internet Archive embeds will always work</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">6. Limitation of Liability</h2>
            <p>
              Hindi Cinema shall not be liable for any indirect, incidental, special, or consequential damages 
              arising from your use of the service. We link to third-party content and are not responsible for 
              their availability or accuracy.
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">7. Third-Party Links</h2>
            <p>
              Our website contains links to Internet Archive, TMDB, and YouTube. We are not responsible for the 
              content, privacy policies, or practices of these third-party sites.
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
              posting. Your continued use of the service constitutes acceptance of modified terms.
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">9. Contact</h2>
            <p>
              Questions about Terms of Service? Contact:{' '}
              <span className="font-mono text-netflix-red">legal@hindicinema.vercel.app</span>
            </p>
          </div>

          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <h3 className="text-red-500 font-bold mb-2">⚠️ Important</h3>
            <p className="text-sm">
              We do NOT host copyrighted content. All streams are from Internet Archive. 
              By using this site, you acknowledge that you understand this and will not hold us liable 
              for third-party content.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
