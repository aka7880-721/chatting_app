import { ArrowLeft, MoreVertical, Search } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import Avatar from './Avatar'
import { formatFullTimestamp } from '../utils/avatar'

function statusLabel(contact) {
  if (!contact) return ''
  if (contact.status === 'online') return 'Online'
  return `Last seen ${formatFullTimestamp(contact.lastSeen)}`
}

export default function ChatHeader({ showBack = false, onBack }) {
  const { selectedContact, headerMenuOpen, setHeaderMenuOpen, showToast } = useApp()
  const menuRef = useRef(null)

  useEffect(() => {
    setHeaderMenuOpen(false)
  }, [selectedContact?.id, setHeaderMenuOpen])

  useEffect(() => {
    if (!headerMenuOpen) return
    const onDoc = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setHeaderMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [headerMenuOpen, setHeaderMenuOpen])

  if (!selectedContact) return null

  return (
    <header className="flex shrink-0 items-center justify-between gap-3 border-b border-relay-border bg-relay-header px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg p-2 text-relay-muted transition duration-150 hover:bg-[#1e2438] hover:text-relay-text lg:hidden"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <Avatar name={selectedContact.name} seed={selectedContact.id} size="md" />
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-relay-text">
            {selectedContact.name}
          </h1>
          <p
            className={`truncate text-xs ${
              selectedContact.status === 'online' ? 'text-emerald-400/90' : 'text-relay-subtle'
            }`}
          >
            {statusLabel(selectedContact)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() =>
            showToast('In-chat search will connect to the server in a future release.')
          }
          className="rounded-lg p-2 text-relay-muted transition duration-150 hover:bg-[#1e2438] hover:text-relay-text"
          aria-label="Search in conversation"
        >
          <Search className="h-5 w-5" />
        </button>
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setHeaderMenuOpen(!headerMenuOpen)}
            className="rounded-lg p-2 text-relay-muted transition duration-150 hover:bg-[#1e2438] hover:text-relay-text"
            aria-label="More options"
            aria-expanded={headerMenuOpen}
          >
            <MoreVertical className="h-5 w-5" />
          </button>
          {headerMenuOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-lg border border-relay-border bg-relay-header py-1 shadow-lg shadow-black/20">
              {['View profile', 'Mute notifications', 'Clear chat history'].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm text-relay-text transition duration-150 hover:bg-[#1e2438]"
                  onClick={() => {
                    setHeaderMenuOpen(false)
                    showToast(`${label} is not available in this prototype.`)
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
