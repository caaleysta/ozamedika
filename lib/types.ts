export type ReservationStatus =
  | 'Menunggu Konfirmasi'
  | 'Dikonfirmasi'
  | 'Terjadwal'
  | 'Selesai'
  | 'Dibatalkan'

export type CorporateStatus =
  | 'Permintaan Baru'
  | 'Sedang Diproses'
  | 'Menunggu Konfirmasi'
  | 'Dijadwalkan'
  | 'Selesai'
  | 'Dibatalkan'

export type OrderStatus =
  | 'Pesanan Masuk'
  | 'Sedang Diproses'
  | 'Siap Diambil'
  | 'Sedang Diantar'
  | 'Selesai'
  | 'Dibatalkan'

export interface MCUPackage {
  id: string
  name: string
  description: string
  items: string[]
  price: number
}

export interface MCUReservation {
  bookingNumber: string
  fullName: string
  whatsapp: string
  email: string
  ktp: string
  gender: 'Laki-laki' | 'Perempuan'
  birthDate: string
  address: string
  packageId: string
  packageName: string
  examDate: string
  examTime: string
  notes: string
  estimatedCost: number
  status: ReservationStatus
  createdAt: string
}

export interface CorporateRequest {
  requestNumber: string
  companyName: string
  picName: string
  picPosition: string
  whatsapp: string
  email: string
  address: string
  participants: number
  examDate: string
  location: 'Pemeriksaan di Klinik OZA' | 'Pemeriksaan di Lokasi Perusahaan'
  packageId: string
  packageName: string
  participantFileName?: string
  status: CorporateStatus
  createdAt: string
}

export type MedicineCategory =
  | 'Obat Bebas'
  | 'Obat Resep'
  | 'Vitamin & Suplemen'
  | 'Alat Kesehatan'

export interface Medicine {
  id: string
  name: string
  description: string
  category: MedicineCategory
  price: number
  stock: number
  image: string
}

export interface CartItem {
  medicineId: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface MedicineOrder {
  orderNumber: string
  customerName: string
  whatsapp: string
  address: string
  notes: string
  items: CartItem[]
  fulfillment: 'Ambil di Klinik' | 'Diantar dari Klinik OZA'
  deliveryFee: number
  paymentMethod: 'Transfer Bank' | 'QRIS' | 'Cash / Bayar di Klinik'
  subtotal: number
  total: number
  status: OrderStatus
  createdAt: string
}
