'use client'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import Button from '@/components/ui/Button'

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mb-3 text-4xl">🛒</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Keranjang Anda Kosong</h1>
        <p className="mb-6 text-sm text-gray-500">Yuk, mulai pilih obat yang Anda butuhkan.</p>
        <Link href="/obat">
          <Button>Lihat Produk Obat</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Keranjang Belanja</h1>

      <div className="mb-6 space-y-4">
        {items.map((item) => (
          <div key={item.medicineId} className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">Rp {item.price.toLocaleString('id-ID')}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 rounded-lg border border-gray-200" onClick={() => updateQuantity(item.medicineId, item.quantity - 1)}>
                -
              </button>
              <span className="w-6 text-center text-sm">{item.quantity}</span>
              <button className="h-8 w-8 rounded-lg border border-gray-200" onClick={() => updateQuantity(item.medicineId, item.quantity + 1)}>
                +
              </button>
            </div>
            <div className="w-28 text-right font-semibold text-gray-700">
              Rp {(item.price * item.quantity).toLocaleString('id-ID')}
            </div>
            <button className="text-xs text-red-500 underline" onClick={() => removeItem(item.medicineId)}>
              Hapus
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-6">
        <div>
          <p className="text-sm text-gray-500">Total Belanja</p>
          <p className="text-2xl font-bold text-gray-800">Rp {subtotal.toLocaleString('id-ID')}</p>
        </div>
        <Link href="/checkout">
          <Button>Lanjut ke Checkout</Button>
        </Link>
      </div>
    </div>
  )
}
