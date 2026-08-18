'use client'
import { useState, FormEvent, ReactNode } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import StatusBadge from '@/components/ui/StatusBadge'
import { mcuPackages } from '@/lib/mockData'
import { createCorporateRequest } from '@/lib/store'
import { CorporateRequest } from '@/lib/types'

const emptyForm = {
  companyName: '',
  picName: '',
  picPosition: '',
  whatsapp: '',
  email: '',
  address: '',
  participants: '',
  examDate: '',
  location: 'Pemeriksaan di Klinik OZA' as 'Pemeriksaan di Klinik OZA' | 'Pemeriksaan di Lokasi Perusahaan',
  packageId: mcuPackages[0].id,
}

function downloadTemplate() {
  const csv = 'Nama,No KTP,Jenis Kelamin,Tanggal Lahir,Jabatan\nContoh Nama,1234567890123456,Laki-laki,1990-01-01,Staff\n'
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'template-peserta-mcu-oza-medika.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export default function CorporatePage() {
  const [form, setForm] = useState(emptyForm)
  const [fileName, setFileName] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [result, setResult] = useState<CorporateRequest | null>(null)

  function validate() {
    const e: Record<string, string> = {}
    if (!form.companyName.trim()) e.companyName = 'Nama perusahaan wajib diisi'
    if (!form.picName.trim()) e.picName = 'Nama PIC wajib diisi'
    if (!form.picPosition.trim()) e.picPosition = 'Jabatan PIC wajib diisi'
    if (!/^08[0-9]{8,12}$/.test(form.whatsapp.replace(/\s/g, ''))) e.whatsapp = 'Nomor WhatsApp tidak valid'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Email tidak valid'
    if (!form.address.trim()) e.address = 'Alamat perusahaan wajib diisi'
    if (!form.participants || Number(form.participants) < 1) e.participants = 'Jumlah peserta minimal 1'
    if (!form.examDate) e.examDate = 'Tanggal pemeriksaan wajib dipilih'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    const pkg = mcuPackages.find((p) => p.id === form.packageId)!
    const request = createCorporateRequest({
      companyName: form.companyName,
      picName: form.picName,
      picPosition: form.picPosition,
      whatsapp: form.whatsapp,
      email: form.email,
      address: form.address,
      participants: Number(form.participants),
      examDate: form.examDate,
      location: form.location,
      packageId: pkg.id,
      packageName: pkg.name,
      participantFileName: fileName || undefined,
    })
    setResult(request)
  }

  if (result) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-3xl border border-green-100 bg-green-50 p-8 text-center shadow-sm">
          <div className="mb-3 text-4xl">✅</div>
          <h1 className="mb-1 text-2xl font-bold text-gray-800">Permintaan MCU Perusahaan Terkirim!</h1>
          <p className="mb-6 text-sm text-gray-500">Tim kami akan menghubungi PIC melalui WhatsApp dalam 1x24 jam kerja.</p>
          <dl className="mx-auto grid max-w-md grid-cols-2 gap-y-3 text-left text-sm">
            <dt className="text-gray-500">Nomor Permintaan</dt>
            <dd className="font-semibold text-red-600">{result.requestNumber}</dd>
            <dt className="text-gray-500">Perusahaan</dt>
            <dd className="font-medium">{result.companyName}</dd>
            <dt className="text-gray-500">Jumlah Peserta</dt>
            <dd className="font-medium">{result.participants} orang</dd>
            <dt className="text-gray-500">Paket</dt>
            <dd className="font-medium">{result.packageName}</dd>
            <dt className="text-gray-500">Lokasi</dt>
            <dd className="font-medium">{result.location}</dd>
            <dt className="text-gray-500">Status</dt>
            <dd><StatusBadge status={result.status} /></dd>
          </dl>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/lacak"><Button variant="outline">Lacak Permintaan</Button></Link>
            <Link href="/"><Button>Kembali ke Beranda</Button></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-800">MCU Perusahaan</h1>
      <p className="mb-8 text-gray-500">Ajukan pemeriksaan kesehatan untuk karyawan perusahaan Anda.</p>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8"
      >
        <Field label="Nama Perusahaan" error={errors.companyName}>
          <input className="input" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
        </Field>
        <Field label="Nama PIC" error={errors.picName}>
          <input className="input" value={form.picName} onChange={(e) => setForm({ ...form, picName: e.target.value })} />
        </Field>
        <Field label="Jabatan PIC" error={errors.picPosition}>
          <input className="input" value={form.picPosition} onChange={(e) => setForm({ ...form, picPosition: e.target.value })} />
        </Field>
        <Field label="Nomor WhatsApp" error={errors.whatsapp}>
          <input className="input" placeholder="08123456789" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
        </Field>
        <Field label="Email Perusahaan" error={errors.email}>
          <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Field>
        <Field label="Estimasi Jumlah Peserta" error={errors.participants}>
          <input className="input" type="number" min={1} value={form.participants} onChange={(e) => setForm({ ...form, participants: e.target.value })} />
        </Field>
        <Field label="Alamat Perusahaan" error={errors.address} full>
          <textarea className="input" rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </Field>
        <Field label="Tanggal Pemeriksaan" error={errors.examDate}>
          <input className="input" type="date" value={form.examDate} onChange={(e) => setForm({ ...form, examDate: e.target.value })} />
        </Field>
        <Field label="Lokasi Pemeriksaan">
          <select
            className="input"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value as 'Pemeriksaan di Klinik OZA' | 'Pemeriksaan di Lokasi Perusahaan' })
            }
          >
            <option>Pemeriksaan di Klinik OZA</option>
            <option>Pemeriksaan di Lokasi Perusahaan</option>
          </select>
        </Field>
        <Field label="Paket MCU" full>
          <select className="input" value={form.packageId} onChange={(e) => setForm({ ...form, packageId: e.target.value })}>
            {mcuPackages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — Rp {p.price.toLocaleString('id-ID')}/orang
              </option>
            ))}
          </select>
        </Field>
        <Field label="Daftar Peserta (Excel/CSV)" full>
          <div className="flex flex-wrap items-center gap-3">
            <input
              className="text-sm"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
            />
            <button type="button" onClick={downloadTemplate} className="text-xs font-medium text-red-600 underline underline-offset-2">
              Unduh Template Contoh
            </button>
          </div>
          {fileName && <p className="mt-1 text-xs text-gray-500">File dipilih: {fileName}</p>}
        </Field>

        <div className="md:col-span-2">
          <Button type="submit" className="w-full md:w-auto">Kirim Permintaan</Button>
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
