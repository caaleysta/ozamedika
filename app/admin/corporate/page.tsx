'use client'
import { useEffect, useState } from 'react'
import { getCorporateRequests, updateCorporateStatus } from '@/lib/store'
import { CorporateRequest, CorporateStatus } from '@/lib/types'
import StatusBadge from '@/components/ui/StatusBadge'

const statuses: CorporateStatus[] = ['Permintaan Baru', 'Sedang Diproses', 'Menunggu Konfirmasi', 'Dijadwalkan', 'Selesai', 'Dibatalkan']

export default function AdminCorporatePage() {
  const [rows, setRows] = useState<CorporateRequest[]>([])

  useEffect(() => {
    setRows(getCorporateRequests())
  }, [])

  function handleChange(requestNumber: string, status: CorporateStatus) {
    updateCorporateStatus(requestNumber, status)
    setRows(getCorporateRequests())
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">MCU Perusahaan</h1>
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-400">
            <tr>
              <th className="px-4 py-3">No. Permintaan</th>
              <th className="px-4 py-3">Perusahaan</th>
              <th className="px-4 py-3">PIC</th>
              <th className="px-4 py-3">Peserta</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Lokasi</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.requestNumber} className="border-t border-gray-50">
                <td className="px-4 py-3 font-medium text-gray-700">{r.requestNumber}</td>
                <td className="px-4 py-3">{r.companyName}</td>
                <td className="px-4 py-3">{r.picName}</td>
                <td className="px-4 py-3">{r.participants}</td>
                <td className="px-4 py-3">{r.examDate}</td>
                <td className="px-4 py-3">{r.location}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-3">
                  <select
                    className="rounded-lg border border-gray-200 px-2 py-1 text-xs"
                    value={r.status}
                    onChange={(e) => handleChange(r.requestNumber, e.target.value as CorporateStatus)}
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
                <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                  Belum ada permintaan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
