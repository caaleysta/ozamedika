import Link from 'next/link'
import Button from '@/components/ui/Button'

const services = [
  { title: 'Medical Check Up Perorangan', desc: 'Pesan pemeriksaan kesehatan pribadi dengan jadwal yang fleksibel.', href: '/mcu', icon: '🩺' },
  { title: 'Medical Check Up Perusahaan', desc: 'Ajukan pemeriksaan kesehatan untuk karyawan perusahaan Anda.', href: '/corporate', icon: '🏢' },
  { title: 'Klinik OZA', desc: 'Layanan konsultasi dan pemeriksaan kesehatan langsung dari klinik.', href: '/mcu', icon: '⚕️' },
  { title: 'Pesan Obat', desc: 'Pesan obat dan produk kesehatan, ambil sendiri atau diantar.', href: '/obat', icon: '💊' },
]

const whyUs = [
  { title: 'Proses Cepat & Mudah', desc: 'Reservasi online tanpa antre, hanya dalam beberapa menit.' },
  { title: 'Tenaga Medis Profesional', desc: 'Ditangani oleh dokter dan tenaga kesehatan berpengalaman.' },
  { title: 'Transparan & Terpercaya', desc: 'Informasi harga dan status layanan yang jelas di setiap tahap.' },
  { title: 'Layanan Fleksibel', desc: 'Tersedia untuk individu maupun kebutuhan perusahaan.' },
]

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-red-50 via-white to-white px-4 py-20 text-center md:px-8">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold text-orange-600">
            Klinik & Layanan Kesehatan Terpercaya
          </span>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-800 md:text-5xl">
            Solusi Pemeriksaan Kesehatan yang <span className="text-red-600">Cepat</span>,{' '}
            <span className="text-orange-500">Mudah</span>, dan Terpercaya
          </h1>
          <p className="mb-8 text-gray-500 md:text-lg">
            OZA MEDIKA menyediakan layanan Medical Check Up untuk perorangan maupun perusahaan serta layanan klinik
            dan pemesanan obat dengan proses reservasi yang mudah dan praktis.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/mcu"><Button>Reservasi MCU</Button></Link>
            <Link href="/corporate"><Button variant="secondary">MCU Perusahaan</Button></Link>
            <Link href="/obat"><Button variant="outline">Pesan Obat</Button></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">Layanan Kami</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-3 text-3xl">{s.icon}</div>
              <h3 className="mb-2 font-semibold text-gray-800 group-hover:text-red-600">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Tentang OZA MEDIKA</h2>
            <p className="text-gray-500">
              OZA MEDIKA hadir sebagai mitra kesehatan Anda, menghadirkan layanan pemeriksaan kesehatan yang praktis
              dan terpercaya bagi individu maupun perusahaan. Kami berkomitmen memberikan pelayanan yang cepat,
              akurat, dan nyaman di setiap kunjungan.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {whyUs.map((w) => (
              <div key={w.title} className="rounded-2xl bg-white p-5 shadow-sm">
                <h4 className="mb-1 text-sm font-semibold text-gray-800">{w.title}</h4>
                <p className="text-xs text-gray-500">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Hubungi Kami</h2>
        <p className="mb-8 text-gray-500">
          Klinik OZA MEDIKA, Grand Taruma Dharmawangsa, Telukjambe Timur, Karawang, Jawa Barat
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="https://wa.me/6281513616321" target="_blank" rel="noreferrer">
            <Button>Hubungi via WhatsApp</Button>
          </a>
          <a href="tel:+622678417202">
            <Button variant="secondary">Telepon Klinik</Button>
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Grand+Taruma+Dharmawangsa+Telukjambe+Timur+Karawang"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline">Lihat Lokasi</Button>
          </a>
        </div>
      </section>
    </div>
  )
}
