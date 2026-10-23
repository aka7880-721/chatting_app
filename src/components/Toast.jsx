import { Info } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null
  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-[60] flex max-w-sm -translate-x-1/2 items-center gap-2 rounded-lg border border-relay-border bg-relay-header px-4 py-3 text-sm text-relay-text shadow-lg shadow-black/30"
      role="status"
    >
      <Info className="h-4 w-4 shrink-0 text-[#a78bff]" aria-hidden />
      {toast}
    </div>
  )
}
