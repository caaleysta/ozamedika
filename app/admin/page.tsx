'use client'
import { useEffect, useState } from 'react'
import { getReservations, getOrders } from '@/lib/store'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ resToday: 0, totalPatients: 0, waiting: 0, totalOrders: 0, delivering: 0 })

  useEffect(() => {
    const reservations = getReservations()
    const orders = getOrders()
    const today = new Date().toDateString()
    setStats({
      resToday: reservations.filter((r) => new Date(r.createdAt).toDateString() === today).length,
      totalPatients: reservations.length,
      waiting: reservations.filter((r) => r.status === 'Menunggu Konfirmasi').length,
      totalOrders: orders.length,
      delivering: orders.filter((o) => o.status === 'Sedang Diantar').length,
    })
  }, [])

  const cards = [
    { label: 'Reservasi Hari Ini', value: stats.resToday, color: 'bg-red-50 text-red-600' },
    { label: 'Total Pasien', value: stats.totalPatients, color: 'bg-orange-50 text-orange-600' },
    { label: 'Menunggu Konfirmasi', value: stats.waiting, color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Total Pesanan Obat', value: stats.totalOrders, color: 'bg-blue-50 text-blue-600' },
    { label: 'Sedang Diantar', value: stats.delivering, color: 'bg-green-50 text-green-700' },
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className={`rounded-2xl p-5 ${c.color}`}>
            <p className="text-3xl font-extrabold">{c.value}</p>
            <p className="mt-1 text-xs font-medium">{c.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-gray-400">Kelola reservasi, permintaan perusahaan, dan pesanan obat melalui menu di sebelah kiri.</p>
    </div>
  )
}
