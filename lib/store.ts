'use client'
import {
  MCUReservation,
  CorporateRequest,
  MedicineOrder,
  ReservationStatus,
  CorporateStatus,
  OrderStatus,
} from './types'

// This module simulates a backend database using localStorage.
// Replace these functions with real API calls to Supabase/PostgreSQL later.

const isBrowser = typeof window !== 'undefined'

function read<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  if (!isBrowser) return
  localStorage.setItem(key, JSON.stringify(value))
}

function nextNumber(prefix: 'MCU' | 'CORP' | 'MED') {
  const key = `oza_seq_${prefix}`
  const current = read<number>(key, 0) + 1
  write(key, current)
  const padded = String(current).padStart(4, '0')
  return `OZA-${prefix}-2026-${padded}`
}

// ---- Mock WhatsApp notification service (swap for real WhatsApp API later) ----
export function notify(event: string, payload: Record<string, unknown>) {
  const log = read<any[]>('oza_notifications', [])
  log.push({ event, payload, timestamp: new Date().toISOString() })
  write('oza_notifications', log)
  // eslint-disable-next-line no-console
  console.log(`[Notifikasi WhatsApp - simulasi] ${event}`, payload)
}

// ---- Individual MCU Reservations ----
export function getReservations(): MCUReservation[] {
  return read<MCUReservation[]>('oza_reservations', [])
}

export function createReservation(
  data: Omit<MCUReservation, 'bookingNumber' | 'status' | 'createdAt'>
): MCUReservation {
  const reservation: MCUReservation = {
    ...data,
    bookingNumber: nextNumber('MCU'),
    status: 'Menunggu Konfirmasi',
    createdAt: new Date().toISOString(),
  }
  const all = getReservations()
  all.unshift(reservation)
  write('oza_reservations', all)
  notify('reservation_created', { bookingNumber: reservation.bookingNumber, whatsapp: reservation.whatsapp })
  return reservation
}

export function updateReservationStatus(bookingNumber: string, status: ReservationStatus) {
  const all = getReservations().map((r) => (r.bookingNumber === bookingNumber ? { ...r, status } : r))
  write('oza_reservations', all)
  notify('reservation_status_updated', { bookingNumber, status })
}

// ---- Corporate MCU Requests ----
export function getCorporateRequests(): CorporateRequest[] {
  return read<CorporateRequest[]>('oza_corporate', [])
}

export function createCorporateRequest(
  data: Omit<CorporateRequest, 'requestNumber' | 'status' | 'createdAt'>
): CorporateRequest {
  const request: CorporateRequest = {
    ...data,
    requestNumber: nextNumber('CORP'),
    status: 'Permintaan Baru',
    createdAt: new Date().toISOString(),
  }
  const all = getCorporateRequests()
  all.unshift(request)
  write('oza_corporate', all)
  notify('corporate_request_created', { requestNumber: request.requestNumber, whatsapp: request.whatsapp })
  return request
}

export function updateCorporateStatus(requestNumber: string, status: CorporateStatus) {
  const all = getCorporateRequests().map((r) => (r.requestNumber === requestNumber ? { ...r, status } : r))
  write('oza_corporate', all)
  notify('corporate_status_updated', { requestNumber, status })
}

// ---- Medicine Orders ----
export function getOrders(): MedicineOrder[] {
  return read<MedicineOrder[]>('oza_orders', [])
}

export function createOrder(data: Omit<MedicineOrder, 'orderNumber' | 'status' | 'createdAt'>): MedicineOrder {
  const order: MedicineOrder = {
    ...data,
    orderNumber: nextNumber('MED'),
    status: 'Pesanan Masuk',
    createdAt: new Date().toISOString(),
  }
  const all = getOrders()
  all.unshift(order)
  write('oza_orders', all)
  notify('order_created', { orderNumber: order.orderNumber, whatsapp: order.whatsapp })
  return order
}

export function updateOrderStatus(orderNumber: string, status: OrderStatus) {
  const all = getOrders().map((o) => (o.orderNumber === orderNumber ? { ...o, status } : o))
  write('oza_orders', all)
  notify('order_status_updated', { orderNumber, status })
}

// ---- Public tracking lookup ----
export function trackByQuery(query: string) {
  const q = query.trim().toLowerCase()
  const qDigits = q.replace(/\D/g, '')

  const reservation = getReservations().find(
    (r) => r.bookingNumber.toLowerCase() === q || (qDigits && r.whatsapp.replace(/\D/g, '') === qDigits)
  )
  const corporate = getCorporateRequests().find(
    (r) => r.requestNumber.toLowerCase() === q || (qDigits && r.whatsapp.replace(/\D/g, '') === qDigits)
  )
  const order = getOrders().find(
    (o) => o.orderNumber.toLowerCase() === q || (qDigits && o.whatsapp.replace(/\D/g, '') === qDigits)
  )

  return { reservation, corporate, order }
}
