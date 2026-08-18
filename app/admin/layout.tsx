'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const menu = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/mcu', label: 'Reservasi MCU', icon: '🩺' },
  { href: '/admin/corporate', label: 'MCU Perusahaan', icon: '🏢' },
  { href: '/admin/pesanan', label: 'Pesanan Obat', icon: '💊' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const isLogin = pathname === '/admin/login'

  useEffect(() => {
    if (isLogin) {
      setReady(true)
      return
    }
    const auth = localStorage.getItem('oza_admin_auth')
    if (!auth) {
      router.replace('/admin/login')
    } else {
      setReady(true)
    }
  }, [isLogin, pathname, router])

  if (isLogin) return <>{children}</>
  if (!ready) return <div className="p-10 text-center text-gray-400">Memuat...</div>

  function logout() {
    localStorage.removeItem('oza_admin_auth')
    router.replace('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-gray-100 bg-white p-4 md:flex">
        <div className="mb-8 px-2 text-lg font-extrabold">
          <span className="text-red-600">OZA</span> <span className="text-orange-500">ADMIN</span>
        </div>
        <nav className="flex-1 space-y-1">
          {menu.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ${
                pathname === m.href ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span>{m.icon}</span>
              {m.label}
            </Link>
          ))}
        </nav>
        <button onClick={logout} className="mt-4 rounded-xl px-3 py-2 text-left text-sm font-medium text-gray-400 hover:bg-gray-50">
          🚪 Keluar
        </button>
      </aside>
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  )
}
