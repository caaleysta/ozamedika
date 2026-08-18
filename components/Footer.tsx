import Image from 'next/image';
export default function Footer() {
  return ( 
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        <div>
          <Image 
  src="/logo.png" 
  alt="Oza Medika Logo" 
  width={160} 
  height={45} 
  className="h-10 w-auto object-contain mb-3"
/>
          <p className="text-sm text-gray-500">
            Solusi pemeriksaan kesehatan yang cepat, mudah, dan terpercaya untuk perorangan maupun perusahaan.
          </p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-gray-700">Alamat Klinik</h4>
          <p className="text-sm text-gray-500">Grand Taruma Dharmawangsa, Telukjambe Timur, Karawang, Jawa Barat</p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-gray-700">Kontak</h4>
          <p className="text-sm text-gray-500">+62 815 1361 6321</p>
          <p className="text-sm text-gray-500">+62 267 8417202</p>
        </div>
      </div>
      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
        © 2026 OZA MEDIKA. Semua hak dilindungi.
      </div>
    </footer>
  )
}
