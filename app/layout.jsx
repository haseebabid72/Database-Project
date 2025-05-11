import "./globals.css"

export const metadata = {
  title: "Login System",
  description: "A simple login system built with Next.js",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
