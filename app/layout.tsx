import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'NutriCalc - Nutrition Calculator & Food Database',
    template: '%s | NutriCalc'
  },
  description: 'Calculate calories, macros, and nutrition facts for your favorite foods. Get detailed nutritional breakdowns, equivalents, and quick tweaks for healthy eating.',
  keywords: ['nutrition', 'calories', 'macros', 'food database', 'diet calculator', 'healthy eating'],
  authors: [{ name: 'NutriCalc' }],
  creator: 'NutriCalc',
  publisher: 'NutriCalc',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nutricalc.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NutriCalc - Nutrition Calculator & Food Database',
    description: 'Calculate calories, macros, and nutrition facts for your favorite foods.',
    url: 'https://nutricalc.com',
    siteName: 'NutriCalc',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NutriCalc - Nutrition Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NutriCalc - Nutrition Calculator & Food Database',
    description: 'Calculate calories, macros, and nutrition facts for your favorite foods.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
} 