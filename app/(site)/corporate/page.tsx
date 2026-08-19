'use client'

import Link from 'next/link'

// Fungsi download template CSV dari kode asli Anda
function downloadTemplate() {
  const csv = 'Nama,No KTP,Jenis Kelamin,Tanggal Lahir,Jabatan\nContoh Nama,1234567890123456,Laki-laki,1990-01-01'
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'template-peserta-mcu-oza-medika.csv'
  a.click()
}

export default function CorporatePage() {
  const googleFormUrl = "https://forms.gle/EUjNbh3ty2D7xJ148"

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        
        {/* Header Section */}
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Pengajuan MCU Corporate
        </h1>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          Silakan unduh acuan format data terlebih dahulu atau langsung isi formulir pendaftaran peserta melalui Google Form.
        </p>

        {/* Action Section */}
        <div className="mt-8 space-y-4">
          
          {/* Tombol Download Template */}
          <button
            onClick={downloadTemplate}
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Template Peserta (.csv)
          </button>

          {/* Tombol Link Google Form */}
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm hover:shadow transition-all duration-150 group"
          >
            <span>Isi Pendaftaran via Google Form</span>
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

        </div>

      </div>
    </div>
  )
}