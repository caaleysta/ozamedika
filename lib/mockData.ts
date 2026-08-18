import { MCUPackage, Medicine, MedicineCategory } from './types'

export const mcuPackages: MCUPackage[] = [
  {
    id: 'basic',
    name: 'Basic Medical Check Up',
    description: 'Pemeriksaan dasar untuk mengetahui kondisi kesehatan umum.',
    items: ['Pemeriksaan fisik umum', 'Tekanan darah', 'Gula darah sewaktu', 'Kolesterol total', 'Golongan darah'],
    price: 350000,
  },
  {
    id: 'standard',
    name: 'Standard Medical Check Up',
    description: 'Pemeriksaan lebih lengkap dengan tambahan laboratorium.',
    items: ['Semua item Basic', 'Fungsi hati (SGOT/SGPT)', 'Fungsi ginjal (Ureum/Kreatinin)', 'Urine lengkap', 'Rontgen thorax'],
    price: 750000,
  },
  {
    id: 'executive',
    name: 'Executive Medical Check Up',
    description: 'Pemeriksaan menyeluruh untuk deteksi dini penyakit serius.',
    items: ['Semua item Standard', 'EKG', 'USG Abdomen', 'Profil lipid lengkap', 'Konsultasi dokter spesialis'],
    price: 1500000,
  },
  {
    id: 'custom',
    name: 'Custom Package',
    description: 'Sesuaikan pemeriksaan dengan kebutuhan khusus Anda.',
    items: ['Konsultasi kebutuhan', 'Pemeriksaan sesuai permintaan', 'Rekomendasi dokter'],
    price: 500000,
  },
]

export const medicineCategories: MedicineCategory[] = [
  'Obat Bebas',
  'Obat Resep',
  'Vitamin & Suplemen',
  'Alat Kesehatan',
]

export const medicines: Medicine[] = [
  { id: 'med-1', name: 'Paracetamol 500mg', description: 'Meredakan demam dan nyeri ringan.', category: 'Obat Bebas', price: 12000, stock: 120, image: 'https://picsum.photos/seed/paracetamol/300/200' },
  { id: 'med-2', name: 'Amoxicillin 500mg', description: 'Antibiotik, wajib resep dokter.', category: 'Obat Resep', price: 35000, stock: 40, image: 'https://picsum.photos/seed/amoxicillin/300/200' },
  { id: 'med-3', name: 'Vitamin C 1000mg', description: 'Meningkatkan daya tahan tubuh.', category: 'Vitamin & Suplemen', price: 45000, stock: 80, image: 'https://picsum.photos/seed/vitaminc/300/200' },
  { id: 'med-4', name: 'Masker Medis (isi 50)', description: 'Masker bedah 3 lapis sekali pakai.', category: 'Alat Kesehatan', price: 55000, stock: 200, image: 'https://picsum.photos/seed/masker/300/200' },
  { id: 'med-5', name: 'Omeprazole 20mg', description: 'Mengatasi asam lambung berlebih.', category: 'Obat Resep', price: 28000, stock: 60, image: 'https://picsum.photos/seed/omeprazole/300/200' },
  { id: 'med-6', name: 'Vitamin D3 1000IU', description: 'Menjaga kesehatan tulang dan imun.', category: 'Vitamin & Suplemen', price: 60000, stock: 70, image: 'https://picsum.photos/seed/vitamind/300/200' },
  { id: 'med-7', name: 'Termometer Digital', description: 'Pengukur suhu tubuh akurat dan cepat.', category: 'Alat Kesehatan', price: 85000, stock: 30, image: 'https://picsum.photos/seed/termometer/300/200' },
  { id: 'med-8', name: 'Antasida Tablet Kunyah', description: 'Meredakan gejala maag dan perut kembung.', category: 'Obat Bebas', price: 15000, stock: 100, image: 'https://picsum.photos/seed/antasida/300/200' },
]
