export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-gray-300">
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <p className="text-sm">
              <strong>Last Updated:</strong> June 20, 2026
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Information We Collect</h2>
            <p className="mb-3">
              Hindi Cinema is a static website with minimal data collection:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>No Account Required:</strong> We do not require users to create accounts or log in</li>
              <li><strong>No Personal Data:</strong> We do not collect names, emails, or phone numbers</li>
              <li><strong>Analytics:</strong> We may use Vercel Analytics to track page views and performance. This data is anonymous</li>
              <li><strong>Cookies:</strong> We do not set tracking cookies. Third-party embeds like Internet Archive may set their own cookies</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <a href="https://archive.org" target="_blank" className="text-netflix-red hover:underline">
                  Internet Archive
                </a> - Streams public domain movies. See their privacy policy
              </li>
              <li>
                <a href="https://www.themoviedb.org" target="_blank" className="text-netflix-red hover:underline">
                  TMDB
                </a> - Provides movie metadata. See their privacy policy
              </li>
              <li>
                <a href="https://vercel.com" target="_blank" className="text-netflix-red hover:underline">
                  Vercel
                </a> - Hosts our website. See their privacy policy
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" className="text-netflix-red hover:underline">
                  YouTube
                </a> - Embedded trailers. See Google's privacy policy
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Data Storage</h2>
            <p>
              We do not store any user data on our servers. All movie data is fetched at build time from public APIs. 
              Your viewing history is not tracked or stored by us.
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Children's Privacy</h2>
            <p>
              Our service is not directed to children under 13. We do not knowingly collect personal information from 
              children under 13. If you are a parent and believe your child has provided us with personal information, 
              please contact us.
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Changes to Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the 
              new privacy policy on this page and updating the "Last Updated" date.
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, contact us at:{' '}
              <span className="font-mono text-netflix-red">privacy@hindicinema.vercel.app</span>
            </p>
          </div>

          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h3 className="text-green-500 font-bold mb-2">✅ Privacy First</h3>
            <p className="text-sm">
              We built this site to be privacy-friendly. No accounts, no tracking, no data selling. 
              Just free public domain movies.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
