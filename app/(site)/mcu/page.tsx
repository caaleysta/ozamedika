'use client'
import { useState, FormEvent, ReactNode } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import StatusBadge from '@/components/ui/StatusBadge'
import { mcuPackages } from '@/lib/mockData'
import { createReservation } from '@/lib/store'
import { MCUReservation } from '@/lib/types'

const emptyForm = {
  fullName: '',
  whatsapp: '',
  email: '',
  ktp: '',
  gender: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
  birthDate: '',
  address: '',
  examDate: '',
  examTime: '',
  notes: '',
}

export default function MCUPage() {
  const [selectedPackage, setSelectedPackage] = useState(mcuPackages[0].id)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [result, setResult] = useState<MCUReservation | null>(null)

  const pkg = mcuPackages.find((p) => p.id === selectedPackage)!

  function validate() {
    const e: Record<string, string> = {}
    if (!form.fullName.trim()) e.fullName = 'Nama lengkap wajib diisi'
    if (!/^08[0-9]{8,12}$/.test(form.whatsapp.replace(/\s/g, ''))) e.whatsapp = 'Nomor WhatsApp tidak valid (contoh: 08123456789)'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Email tidak valid'
    if (!form.ktp.trim() || form.ktp.length < 8) e.ktp = 'Nomor KTP wajib diisi'
    if (!form.birthDate) e.birthDate = 'Tanggal lahir wajib diisi'
    if (!form.address.trim()) e.address = 'Alamat wajib diisi'
    if (!form.examDate) e.examDate = 'Tanggal pemeriksaan wajib dipilih'
    if (!form.examTime) e.examTime = 'Waktu pemeriksaan wajib dipilih'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    const reservation = createReservation({
      ...form,
      packageId: pkg.id,
      packageName: pkg.name,
      estimatedCost: pkg.price,
    })
    setResult(reservation)
  }

  if (result) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-3xl border border-green-100 bg-green-50 p-8 text-center shadow-sm">
          <div className="mb-3 text-4xl">✅</div>
          <h1 className="mb-1 text-2xl font-bold text-gray-800">Reservasi Berhasil Dibuat!</h1>
          <p className="mb-6 text-sm text-gray-500">Simpan nomor booking ini untuk melacak status reservasi Anda.</p>
          <dl className="mx-auto grid max-w-md grid-cols-2 gap-y-3 text-left text-sm">
            <dt className="text-gray-500">Nomor Booking</dt>
            <dd className="font-semibold text-red-600">{result.bookingNumber}</dd>
            <dt className="text-gray-500">Nama Pasien</dt>
            <dd className="font-medium">{result.fullName}</dd>
            <dt className="text-gray-500">Paket</dt>
            <dd className="font-medium">{result.packageName}</dd>
            <dt className="text-gray-500">Tanggal Pemeriksaan</dt>
            <dd className="font-medium">{result.examDate}</dd>
            <dt className="text-gray-500">Waktu Pemeriksaan</dt>
            <dd className="font-medium">{result.examTime}</dd>
            <dt className="text-gray-500">Estimasi Biaya</dt>
            <dd className="font-medium">Rp {result.estimatedCost.toLocaleString('id-ID')}</dd>
            <dt className="text-gray-500">Status</dt>
            <dd><StatusBadge status={result.status} /></dd>
          </dl>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/lacak"><Button variant="outline">Lacak Reservasi</Button></Link>
            <Link href="/"><Button>Kembali ke Beranda</Button></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-800">Reservasi Medical Check Up</h1>
      <p className="mb-8 text-gray-500">Pilih paket pemeriksaan dan lengkapi data diri Anda.</p>

      <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mcuPackages.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedPackage(p.id)}
            className={`rounded-2xl border-2 p-5 text-left transition ${
              selectedPackage === p.id ? 'border-red-500 bg-red-50 shadow-md' : 'border-gray-100 hover:border-red-200'
            }`}
          >
            <h3 className="mb-1 font-bold text-gray-800">{p.name}</h3>
            <p className="mb-3 text-xs text-gray-500">{p.description}</p>
            <ul className="mb-3 space-y-1 text-xs text-gray-500">
              {p.items.slice(0, 3).map((it) => (
                <li key={it}>• {it}</li>
              ))}
            </ul>
            <div className="font-bold text-red-600">Rp {p.price.toLocaleString('id-ID')}</div>
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8"
      >
        <Field label="Nama Lengkap" error={errors.fullName}>
          <input className="input" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        </Field>
        <Field label="Nomor WhatsApp" error={errors.whatsapp}>
          <input className="input" placeholder="08123456789" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
        </Field>
        <Field label="Email" error={errors.email}>
          <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Field>
        <Field label="Nomor KTP" error={errors.ktp}>
          <input className="input" value={form.ktp} onChange={(e) => setForm({ ...form, ktp: e.target.value })} />
        </Field>
        <Field label="Jenis Kelamin">
          <select className="input" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value as 'Laki-laki' | 'Perempuan' })}>
            <option>Laki-laki</option>
            <option>Perempuan</option>
          </select>
        </Field>
        <Field label="Tanggal Lahir" error={errors.birthDate}>
          <input className="input" type="date" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} />
        </Field>
        <Field label="Alamat" error={errors.address} full>
          <textarea className="input" rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </Field>
        <Field label="Tanggal Pemeriksaan" error={errors.examDate}>
          <input className="input" type="date" value={form.examDate} onChange={(e) => setForm({ ...form, examDate: e.target.value })} />
        </Field>
        <Field label="Waktu Pemeriksaan" error={errors.examTime}>
          <select className="input" value={form.examTime} onChange={(e) => setForm({ ...form, examTime: e.target.value })}>
            <option value="">Pilih waktu</option>
            <option>08:00</option>
            <option>09:00</option>
            <option>10:00</option>
            <option>13:00</option>
            <option>14:00</option>
            <option>15:00</option>
          </select>
        </Field>
        <Field label="Catatan Tambahan / Keluhan" full>
          <textarea className="input" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </Field>

        <div className="md:col-span-2">
          <Button type="submit" className="w-full md:w-auto">Konfirmasi Reservasi</Button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, error, full, children }: { label: string; error?: string; full?: boolean; children: ReactNode }) {
  return (
    <label className={`block text-sm ${full ? 'md:col-span-2' : ''}`}>
      <span className="mb-1 block font-medium text-gray-600">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  )
}
