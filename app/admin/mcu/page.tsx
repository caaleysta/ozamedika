'use client'
import { useEffect, useState } from 'react'
import { getReservations, updateReservationStatus } from '@/lib/store'
import { MCUReservation, ReservationStatus } from '@/lib/types'
import StatusBadge from '@/components/ui/StatusBadge'

const statuses: ReservationStatus[] = ['Menunggu Konfirmasi', 'Dikonfirmasi', 'Terjadwal', 'Selesai', 'Dibatalkan']

export default function AdminMCUPage() {
  const [rows, setRows] = useState<MCUReservation[]>([])

  useEffect(() => {
    setRows(getReservations())
  }, [])

  function handleStatusChange(bookingNumber: string, status: ReservationStatus) {
    updateReservationStatus(bookingNumber, status)
    setRows(getReservations())
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Reservasi MCU</h1>
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-400">
            <tr>
              <th className="px-4 py-3">No. Booking</th>
              <th className="px-4 py-3">Nama Pasien</th>
              <th className="px-4 py-3">Paket</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Waktu</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.bookingNumber} className="border-t border-gray-50">
                <td className="px-4 py-3 font-medium text-gray-700">{r.bookingNumber}</td>
                <td className="px-4 py-3">{r.fullName}</td>
                <td className="px-4 py-3">{r.packageName}</td>
                <td className="px-4 py-3">{r.examDate}</td>
                <td className="px-4 py-3">{r.examTime}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-3">
                  <select
                    className="rounded-lg border border-gray-200 px-2 py-1 text-xs"
                    value={r.status}
                    onChange={(e) => handleStatusChange(r.bookingNumber, e.target.value as ReservationStatus)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  Belum ada reservasi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
