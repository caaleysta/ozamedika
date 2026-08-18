'use client'
import { useState } from 'react'
import StatusBadge from '@/components/ui/StatusBadge'
import Button from '@/components/ui/Button'
import { trackByQuery } from '@/lib/store'

const mcuSteps = ['Menunggu Konfirmasi', 'Dikonfirmasi', 'Terjadwal', 'Selesai']
const corpSteps = ['Permintaan Baru', 'Sedang Diproses', 'Menunggu Konfirmasi', 'Dijadwalkan', 'Selesai']
const orderSteps = ['Pesanan Masuk', 'Sedang Diproses', 'Siap Diambil', 'Sedang Diantar', 'Selesai']

function Timeline({ steps, current }: { steps: string[]; current: string }) {
  const idx = steps.indexOf(current)
  return (
    <div className="mt-4 flex items-center gap-1 overflow-x-auto pb-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-1">
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
              i <= idx ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {i + 1}
          </div>
          <span className={`whitespace-nowrap text-xs ${i <= idx ? 'text-gray-700' : 'text-gray-300'}`}>{s}</span>
          {i < steps.length - 1 && <div className={`mx-1 h-0.5 w-6 ${i < idx ? 'bg-red-600' : 'bg-gray-100'}`} />}
        </div>
      ))}
    </div>
  )
}

export default function TrackingPage() {
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [result, setResult] = useState<ReturnType<typeof trackByQuery> | null>(null)

  function handleSearch() {
    setResult(trackByQuery(query))
    setSearched(true)
  }

  const found = result && (result.reservation || result.corporate || result.order)

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-800">Lacak Reservasi & Pesanan</h1>
      <p className="mb-6 text-gray-500">Masukkan nomor booking/pesanan atau nomor WhatsApp Anda.</p>

      <div className="mb-8 flex flex-wrap gap-3">
        <input
          className="input flex-1"
          placeholder="Contoh: OZA-MCU-2026-0001 atau 08123456789"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Lacak</Button>
      </div>

      {searched && !found && <p className="text-center text-sm text-gray-400">Data tidak ditemukan. Periksa kembali nomor Anda.</p>}

      {result?.reservation && (
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Reservasi MCU — {result.reservation.bookingNumber}</h3>
            <StatusBadge status={result.reservation.status} />
          </div>
          <p className="text-sm text-gray-500">
            {result.reservation.fullName} • {result.reservation.packageName} • {result.reservation.examDate} {result.reservation.examTime}
          </p>
          <Timeline steps={mcuSteps} current={result.reservation.status} />
        </div>
      )}

      {result?.corporate && (
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">MCU Perusahaan — {result.corporate.requestNumber}</h3>
            <StatusBadge status={result.corporate.status} />
          </div>
          <p className="text-sm text-gray-500">
            {result.corporate.companyName} • {result.corporate.participants} peserta • {result.corporate.examDate}
          </p>
          <Timeline steps={corpSteps} current={result.corporate.status} />
        </div>
      )}

      {result?.order && (
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Pesanan Obat — {result.order.orderNumber}</h3>
            <StatusBadge status={result.order.status} />
          </div>
          <p className="text-sm text-gray-500">
            {result.order.customerName} • {result.order.fulfillment} • Rp {result.order.total.toLocaleString('id-ID')}
          </p>
          <Timeline steps={orderSteps} current={result.order.status} />
        </div>
      )}
    </div>
  )
}
