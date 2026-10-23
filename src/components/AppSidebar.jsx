import { MessageSquare, MessageSquarePlus, Search, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Avatar from './Avatar'
import ConversationList from './ConversationList'
import ProfileMenu from './ProfileMenu'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
]

export default function AppSidebar({ className = '' }) {
  const {
    user,
    searchQuery,
    setSearchQuery,
    listFilter,
    setListFilter,
    setNewConvoOpen,
    profileMenuOpen,
    setProfileMenuOpen,
  } = useApp()

  return (
    <aside
      className={`flex h-full flex-col border-r border-relay-border bg-relay-sidebar ${className}`}
    >
      <div className="border-b border-relay-border px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-relay-accent text-white">
              <MessageSquare className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-relay-text">Relay</p>
              <p className="text-[11px] text-relay-muted">Team messaging</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNewConvoOpen(true)}
            className="rounded-lg bg-relay-accent p-2 text-white transition duration-150 hover:bg-relay-accent-hover"
            aria-label="New conversation"
          >
            <MessageSquarePlus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative px-4 py-3">
        <Search
          className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-relay-subtle"
          aria-hidden
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search chats or messages"
          className="w-full rounded-lg border border-relay-border bg-relay-input py-2 pl-9 pr-3 text-sm text-relay-text placeholder:text-relay-subtle transition duration-150 focus:border-relay-accent focus:outline-none focus:ring-2 focus:ring-relay-accent/25"
          aria-label="Search conversations"
        />
      </div>

      <div className="flex gap-1 px-4 pb-2" role="tablist" aria-label="Conversation filters">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={listFilter === f.id}
            onClick={() => setListFilter(f.id)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition duration-150 ${
              listFilter === f.id
                ? 'bg-relay-accent-soft text-[#c4a8ff]'
                : 'text-relay-muted hover:bg-[#1a2035] hover:text-relay-text'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
        <ConversationList />
      </div>

      <div className="relative border-t border-relay-border p-3">
        <button
          type="button"
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition duration-150 hover:bg-[#1a2035]"
          aria-expanded={profileMenuOpen}
          aria-haspopup="menu"
        >
          <Avatar name={user.name} seed={user.id} size="md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-relay-text">{user.name}</p>
            <p className="truncate text-xs text-emerald-400/90">Online</p>
          </div>
        </button>
        <ProfileMenu open={profileMenuOpen} onClose={() => setProfileMenuOpen(false)} />
        <Link
          to="/settings"
          className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-relay-muted transition duration-150 hover:bg-[#1a2035] hover:text-relay-text"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </aside>
  )
}
