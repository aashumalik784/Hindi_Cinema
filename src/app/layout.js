import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'My Hindi Movies - Free Public Domain Movies + Latest Info',
  description: 'Watch free Hindi public domain movies and get info about latest Bollywood movies with trailers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
