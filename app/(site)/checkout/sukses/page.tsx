'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import StatusBadge from '@/components/ui/StatusBadge'
import { getOrders } from '@/lib/store'
import { MedicineOrder } from '@/lib/types'

function SuccessContent() {
  const params = useSearchParams()
  const orderNumber = params.get('order')
  const [order, setOrder] = useState<MedicineOrder | null>(null)

  useEffect(() => {
    if (orderNumber) {
      const found = getOrders().find((o) => o.orderNumber === orderNumber)
      setOrder(found || null)
    }
  }, [orderNumber])

  if (!order) {
    return <p className="py-20 text-center text-gray-500">Pesanan tidak ditemukan.</p>
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-3xl border border-green-100 bg-green-50 p-8 text-center shadow-sm">
        <div className="mb-3 text-4xl">✅</div>
        <h1 className="mb-1 text-2xl font-bold text-gray-800">Pesanan Berhasil Dibuat!</h1>
        <p className="mb-6 text-sm text-gray-500">Simpan nomor pesanan ini untuk melacak status pengiriman.</p>
        <dl className="mx-auto grid max-w-md grid-cols-2 gap-y-3 text-left text-sm">
          <dt className="text-gray-500">Nomor Pesanan</dt>
          <dd className="font-semibold text-red-600">{order.orderNumber}</dd>
          <dt className="text-gray-500">Metode</dt>
          <dd className="font-medium">{order.fulfillment}</dd>
          <dt className="text-gray-500">Pembayaran</dt>
          <dd className="font-medium">{order.paymentMethod}</dd>
          <dt className="text-gray-500">Total Bayar</dt>
          <dd className="font-medium">Rp {order.total.toLocaleString('id-ID')}</dd>
          <dt className="text-gray-500">Status</dt>
          <dd>
            <StatusBadge status={order.status} />
          </dd>
        </dl>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/lacak">
            <Button variant="outline">Lacak Pesanan</Button>
          </Link>
          <Link href="/">
            <Button>Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<p className="py-20 text-center text-gray-500">Memuat...</p>}>
      <SuccessContent />
    </Suspense>
  )
}
