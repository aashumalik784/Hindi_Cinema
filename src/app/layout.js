import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Hindi Cinema - Free Public Domain Bollywood Movies',
  description: 'Watch free public domain Hindi classic movies and discover latest Bollywood releases. 100% legal streaming!',
  keywords: 'hindi movies, bollywood, public domain, free movies, classic cinema',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-darker text-white min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
