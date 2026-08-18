'use client'
import { useMemo, useState } from 'react'
import { medicines, medicineCategories } from '@/lib/mockData'
import { useCart } from '@/lib/cart-context'
import Button from '@/components/ui/Button'

export default function ObatPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('Semua')
  const { addItem } = useCart()
  const [qty, setQty] = useState<Record<string, number>>({})
  const [added, setAdded] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return medicines.filter((m) => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === 'Semua' || m.category === category
      return matchSearch && matchCategory
    })
  }, [search, category])

  function handleAdd(m: (typeof medicines)[number]) {
    addItem(m, qty[m.id] || 1)
    setAdded(m.id)
    setTimeout(() => setAdded(null), 1500)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-800">Pesan Obat</h1>
      <p className="mb-6 text-gray-500">Temukan obat dan produk kesehatan dari Klinik OZA MEDIKA.</p>

      <div className="mb-8 flex flex-wrap gap-3">
        <input
          className="input max-w-xs"
          placeholder="Cari nama obat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="input max-w-xs" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Semua</option>
          {medicineCategories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((m) => (
          <div key={m.id} className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <img src={m.image} alt={m.name} className="h-36 w-full object-cover" />
            <div className="flex flex-1 flex-col p-4">
              <span className="mb-1 w-fit rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-medium text-orange-600">
                {m.category}
              </span>
              <h3 className="mb-1 font-semibold text-gray-800">{m.name}</h3>
              <p className="mb-2 flex-1 text-xs text-gray-500">{m.description}</p>
              <p className="mb-3 text-xs text-gray-400">Stok: {m.stock}</p>
              <div className="mb-3 font-bold text-red-600">Rp {m.price.toLocaleString('id-ID')}</div>
              <div className="mb-3 flex items-center gap-2">
                <button
                  type="button"
                  className="h-8 w-8 rounded-lg border border-gray-200 text-gray-500"
                  onClick={() => setQty({ ...qty, [m.id]: Math.max(1, (qty[m.id] || 1) - 1) })}
                >
                  -
                </button>
                <span className="w-6 text-center text-sm">{qty[m.id] || 1}</span>
                <button
                  type="button"
                  className="h-8 w-8 rounded-lg border border-gray-200 text-gray-500"
                  onClick={() => setQty({ ...qty, [m.id]: (qty[m.id] || 1) + 1 })}
                >
                  +
                </button>
              </div>
              <Button variant={added === m.id ? 'secondary' : 'primary'} className="w-full text-sm" onClick={() => handleAdd(m)}>
                {added === m.id ? 'Ditambahkan ✓' : 'Tambah ke Keranjang'}
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="col-span-full text-center text-sm text-gray-400">Obat tidak ditemukan.</p>}
      </div>
    </div>
  )
}
