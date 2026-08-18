const colorMap: Record<string, string> = {
  'Menunggu Konfirmasi': 'bg-yellow-100 text-yellow-800',
  'Dikonfirmasi': 'bg-blue-100 text-blue-800',
  'Terjadwal': 'bg-indigo-100 text-indigo-800',
  'Selesai': 'bg-green-100 text-green-800',
  'Dibatalkan': 'bg-red-100 text-red-800',
  'Permintaan Baru': 'bg-yellow-100 text-yellow-800',
  'Sedang Diproses': 'bg-blue-100 text-blue-800',
  'Dijadwalkan': 'bg-indigo-100 text-indigo-800',
  'Pesanan Masuk': 'bg-yellow-100 text-yellow-800',
  'Siap Diambil': 'bg-indigo-100 text-indigo-800',
  'Sedang Diantar': 'bg-orange-100 text-orange-800',
}

export default function StatusBadge({ status }: { status: string }) {
  const cls = colorMap[status] || 'bg-gray-100 text-gray-800'
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>{status}</span>
}
