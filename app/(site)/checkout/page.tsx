'use client'
import { useState, FormEvent, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { createOrder } from '@/lib/store'
import Button from '@/components/ui/Button'

const DELIVERY_FEE = 15000

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()
  const [form, setForm] = useState({ fullName: '', whatsapp: '', address: '', notes: '' })
  const [fulfillment, setFulfillment] = useState<'Ambil di Klinik' | 'Diantar dari Klinik OZA'>('Ambil di Klinik')
  const [payment, setPayment] = useState<'Transfer Bank' | 'QRIS' | 'Cash / Bayar di Klinik'>('Transfer Bank')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const deliveryFee = fulfillment === 'Diantar dari Klinik OZA' ? DELIVERY_FEE : 0
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="mb-4 text-gray-500">Keranjang Anda kosong. Silakan pilih obat terlebih dahulu.</p>
        <Link href="/obat">
          <Button>Lihat Produk Obat</Button>
        </Link>
      </div>
    )
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.fullName.trim()) e.fullName = 'Nama lengkap wajib diisi'
    if (!/^08[0-9]{8,12}$/.test(form.whatsapp.replace(/\s/g, ''))) e.whatsapp = 'Nomor WhatsApp tidak valid'
    if (fulfillment === 'Diantar dari Klinik OZA' && !form.address.trim()) e.address = 'Alamat pengiriman wajib diisi'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    const order = createOrder({
      customerName: form.fullName,
      whatsapp: form.whatsapp,
      address: form.address,
      notes: form.notes,
      items,
      fulfillment,
      deliveryFee,
      paymentMethod: payment,
      subtotal,
      total,
    })
    clearCart()
    router.push(`/checkout/sukses?order=${order.orderNumber}`)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Checkout</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:col-span-2 md:p-8">
          <Field label="Nama Lengkap" error={errors.fullName}>
            <input className="input" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          </Field>
          <Field label="Nomor WhatsApp" error={errors.whatsapp}>
            <input className="input" placeholder="08123456789" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
          </Field>

          <div>
            <span className="mb-2 block text-sm font-medium text-gray-600">Metode Pengambilan</span>
            <div className="grid gap-3 sm:grid-cols-2">
              {(['Ambil di Klinik', 'Diantar dari Klinik OZA'] as const).map((opt) => (
                <label key={opt} className={`cursor-pointer rounded-xl border-2 p-3 text-sm ${fulfillment === opt ? 'border-red-500 bg-red-50' : 'border-gray-100'}`}>
                  <input type="radio" name="fulfillment" className="mr-2" checked={fulfillment === opt} onChange={() => setFulfillment(opt)} />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {fulfillment === 'Diantar dari Klinik OZA' ? (
            <Field label="Alamat Pengiriman" error={errors.address}>
              <textarea className="input" rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </Field>
          ) : (
            <div className="rounded-xl bg-gray-50 p-3 text-xs text-gray-500">
              Ambil di: Klinik OZA MEDIKA, Grand Taruma Dharmawangsa, Telukjambe Timur, Karawang, Jawa Barat
            </div>
          )}

          <Field label="Catatan Tambahan">
            <textarea className="input" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </Field>

          <div>
            <span className="mb-2 block text-sm font-medium text-gray-600">Metode Pembayaran</span>
            <div className="grid gap-3 sm:grid-cols-3">
              {(['Transfer Bank', 'QRIS', 'Cash / Bayar di Klinik'] as const).map((opt) => (
                <label key={opt} className={`cursor-pointer rounded-xl border-2 p-3 text-center text-xs ${payment === opt ? 'border-red-500 bg-red-50' : 'border-gray-100'}`}>
                  <input type="radio" name="payment" className="mr-1" checked={payment === opt} onChange={() => setPayment(opt)} />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">Buat Pesanan</Button>
        </form>

        <div className="h-fit rounded-3xl border border-gray-100 bg-gray-50 p-6">
          <h3 className="mb-4 font-semibold text-gray-700">Ringkasan Pesanan</h3>
          <ul className="mb-4 space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.medicineId} className="flex justify-between text-gray-600">
                <span>
                  {i.name} x{i.quantity}
                </span>
                <span>Rp {(i.price * i.quantity).toLocaleString('id-ID')}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-1 border-t border-gray-200 pt-3 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Ongkos Kirim</span>
              <span>Rp {deliveryFee.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between pt-2 text-base font-bold text-gray-800">
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-gray-600">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  )
}
