import { LogOut, Settings, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function ProfileMenu({ open, onClose }) {
  const { logout, isAuthenticated } = useApp()
  const navigate = useNavigate()

  if (!open) return null

  const handleLogout = () => {
    onClose()
    logout()
    navigate('/login')
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-30 cursor-default"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        role="menu"
        className="absolute bottom-full left-3 right-3 z-40 mb-2 overflow-hidden rounded-lg border border-relay-border bg-relay-header py-1 shadow-lg shadow-black/25"
      >
        <Link
          to="/settings"
          role="menuitem"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2.5 text-sm text-relay-text transition duration-150 hover:bg-[#1e2438]"
        >
          <User className="h-4 w-4 text-relay-subtle" />
          Profile & preferences
        </Link>
        <Link
          to="/settings"
          role="menuitem"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2.5 text-sm text-relay-text transition duration-150 hover:bg-[#1e2438]"
        >
          <Settings className="h-4 w-4 text-relay-subtle" />
          Settings
        </Link>
        {isAuthenticated && (
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-400 transition duration-150 hover:bg-red-950/30"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        )}
      </div>
    </>
  )
}
