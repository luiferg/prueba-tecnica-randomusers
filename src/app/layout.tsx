import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextThemeProvider } from '@/providers/next-theme-provider'
import ReactQueryProvider from '@/providers/react-query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Random users',
  description:
    'Simple web app that displays random users from the Random User Generator API.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryProvider>
          <NextThemeProvider>{children}</NextThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
