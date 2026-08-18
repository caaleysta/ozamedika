'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (email === 'admin@ozamedika.id' && password === 'admin123') {
      localStorage.setItem('oza_admin_auth', '1')
      router.push('/admin')
    } else {
      setError('Email atau password salah.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center text-xl font-extrabold">
          <span className="text-red-600">OZA</span> <span className="text-orange-500">ADMIN</span>
        </div>
        <label className="mb-3 block text-sm">
          <span className="mb-1 block font-medium text-gray-600">Email</span>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@ozamedika.id" />
        </label>
        <label className="mb-4 block text-sm">
          <span className="mb-1 block font-medium text-gray-600">Password</span>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="admin123" />
        </label>
        {error && <p className="mb-3 text-xs text-red-500">{error}</p>}
        <Button type="submit" className="w-full">Masuk</Button>
        <p className="mt-4 text-center text-xs text-gray-400">Demo: admin@ozamedika.id / admin123</p>
      </form>
    </div>
  )
}
