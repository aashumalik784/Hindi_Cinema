export default function DMCAPage() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">
          DMCA Policy
        </h1>
        
        <div className="space-y-6 text-gray-300">
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
            <p className="text-sm">
              <strong>Last Updated:</strong> June 20, 2026
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Copyright Policy</h2>
            <p>
              Hindi Cinema respects the intellectual property rights of others. We do not host any copyrighted content 
              on our servers. All public domain movies are streamed directly from Internet Archive, and all trailers 
              link to official YouTube sources.
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Public Domain Verification</h2>
            <p>
              All movies in our "Watch Free" section are verified to be in the public domain according to Internet Archive's 
              collection. These films are no longer protected by copyright due to expiration or failure to renew.
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">DMCA Takedown Notice</h2>
            <p className="mb-3">
              If you believe that any content on our website infringes your copyright, please send a DMCA takedown notice 
              with the following information:
            </p>
            <ul className="list-decimal list-inside space-y-2 ml-4">
              <li>Your physical or electronic signature</li>
              <li>Identification of the copyrighted work you claim has been infringed</li>
              <li>Identification of the material that is claimed to be infringing and URL location</li>
              <li>Your contact information (address, phone number, email)</li>
              <li>A statement that you have a good faith belief that use of the material is not authorized</li>
              <li>A statement that the information is accurate and you are authorized to act on behalf of the copyright owner</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Contact for DMCA</h2>
            <p className="mb-3">Send DMCA notices to:</p>
            <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
              <p>Email: dmca@hindicinema.vercel.app</p>
              <p>Subject: DMCA Takedown Request</p>
            </div>
            <p className="text-sm mt-3 text-gray-500">
              Note: We will promptly investigate and remove any infringing content within 24-48 hours of receiving a valid notice.
            </p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Counter-Notice</h2>
            <p>
              If you believe your content was removed in error, you may file a counter-notice with the same information 
              required above, plus a statement under penalty of perjury that you have a good faith belief the material 
              was removed due to mistake or misidentification.
            </p>
          </div>

          <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
            <h3 className="text-green-500 font-bold mb-2">✅ Our Commitment</h3>
            <p className="text-sm">
              We are committed to 100% legal compliance. We do not host copyrighted content. All streams are embedded 
              from Internet Archive under their public domain license. We link to official trailers only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
