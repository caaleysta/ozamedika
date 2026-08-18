'use client'
import Image from 'next/image';
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/mcu', label: 'Reservasi MCU' },
  { href: '/corporate', label: 'MCU Perusahaan' },
  { href: '/obat', label: 'Pesan Obat' },
  { href: '/lacak', label: 'Lacak Pesanan' },
]

export default function Navbar() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
  <Image 
    src="/logo.png"  
    alt="Oza Medika Logo" 
    width={160} 
    height={45} 
    className="h-10 w-auto object-contain"
  />
</Link> 
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-gray-600 hover:text-red-600">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/keranjang" className="relative rounded-full border border-gray-200 p-2 hover:border-red-300" aria-label="Keranjang">
            🛒
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <Link href="/admin" className="hidden text-sm font-medium text-gray-400 hover:text-gray-600 md:block">
            Admin
          </Link>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-gray-100 bg-white px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Admin
          </Link>
        </nav>
      )}
    </header>
  )
}
