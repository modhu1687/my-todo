// Generates a reasonably unique id without extra dependencies
export function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

// Priority metadata used to drive the "priority rail" signature across the app
export const PRIORITIES = {
  high: { label: 'High', rail: 'bg-brick', chip: 'bg-brick-soft text-brick', dot: 'bg-brick' },
  medium: { label: 'Medium', rail: 'bg-amber', chip: 'bg-amber-soft text-amber', dot: 'bg-amber' },
  low: { label: 'Low', rail: 'bg-teal', chip: 'bg-teal-soft text-teal', dot: 'bg-teal' },
}

export function priorityMeta(priority) {
  return PRIORITIES[priority] || PRIORITIES.medium
}

// Formats an ISO date string (yyyy-mm-dd) into a short, human label
export function formatDate(dateStr) {
  if (!dateStr) return 'No date'
  const date = new Date(`${dateStr}T00:00:00`)
  if (Number.isNaN(date.getTime())) return 'No date'
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function isOverdue(dateStr, done) {
  if (!dateStr || done) return false
  const date = new Date(`${dateStr}T23:59:59`)
  return date.getTime() < Date.now()
}

export function isToday(dateStr) {
  if (!dateStr) return false
  const today = new Date().toISOString().slice(0, 10)
  return dateStr === today
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10)
}
