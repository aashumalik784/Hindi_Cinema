import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hindi Cinema - Watch Free Public Domain Movies & Latest Trailers',
  description: 'Stream classic Hindi public domain movies for free. Watch trailers of latest Bollywood movies. 100% Legal content from Internet Archive.',
  keywords: 'hindi movies, bollywood, free movies, public domain, watch online, hindi cinema',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-netflix-black text-white min-h-screen`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
