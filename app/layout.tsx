import './globals.css'
import type { Metadata } from 'next'
import { CartProvider } from '@/lib/cart-context'

export const metadata: Metadata = {
  title: 'OZA MEDIKA - Solusi Kesehatan Terpercaya',
  description: 'Layanan Medical Check Up, Klinik, dan Pemesanan Obat OZA MEDIKA',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-white text-gray-800 antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
