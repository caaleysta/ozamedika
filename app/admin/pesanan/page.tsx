'use client'
import { useEffect, useState } from 'react'
import { getOrders, updateOrderStatus } from '@/lib/store'
import { MedicineOrder, OrderStatus } from '@/lib/types'
import StatusBadge from '@/components/ui/StatusBadge'

const statuses: OrderStatus[] = ['Pesanan Masuk', 'Sedang Diproses', 'Siap Diambil', 'Sedang Diantar', 'Selesai', 'Dibatalkan']

export default function AdminOrdersPage() {
  const [rows, setRows] = useState<MedicineOrder[]>([])

  useEffect(() => {
    setRows(getOrders())
  }, [])

  function handleChange(orderNumber: string, status: OrderStatus) {
    updateOrderStatus(orderNumber, status)
    setRows(getOrders())
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Pesanan Obat</h1>
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-400">
            <tr>
              <th className="px-4 py-3">No. Pesanan</th>
              <th className="px-4 py-3">Pelanggan</th>
              <th className="px-4 py-3">WhatsApp</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Metode</th>
              <th className="px-4 py-3">Pembayaran</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <tr key={o.orderNumber} className="border-t border-gray-50">
                <td className="px-4 py-3 font-medium text-gray-700">{o.orderNumber}</td>
                <td className="px-4 py-3">{o.customerName}</td>
                <td className="px-4 py-3">{o.whatsapp}</td>
                <td className="px-4 py-3">Rp {o.total.toLocaleString('id-ID')}</td>
                <td className="px-4 py-3">{o.fulfillment}</td>
                <td className="px-4 py-3">{o.paymentMethod}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={o.status} />
                </td>
                <td className="px-4 py-3">
                  <select
                    className="rounded-lg border border-gray-200 px-2 py-1 text-xs"
                    value={o.status}
                    onChange={(e) => handleChange(o.orderNumber, e.target.value as OrderStatus)}
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
                  Belum ada pesanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
