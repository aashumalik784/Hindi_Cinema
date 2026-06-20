import "./globals.css"
export const metadata = {
  title: "Hindi Cinema - Free Movies + Latest Info",
  description: "Watch free public domain movies and get latest movie info",
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
