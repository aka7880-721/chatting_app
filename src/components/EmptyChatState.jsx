import { MessageCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function EmptyChatState() {
  const { setNewConvoOpen } = useApp()

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-relay-canvas px-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-relay-accent-soft text-[#c4a8ff]">
        <MessageCircle className="h-8 w-8" />
      </div>
      <h2 className="text-lg font-semibold text-relay-text">Select a conversation</h2>
      <p className="mt-2 max-w-sm text-sm text-relay-muted">
        Choose a chat from the sidebar or start a new conversation with your team.
      </p>
      <button
        type="button"
        onClick={() => setNewConvoOpen(true)}
        className="mt-6 rounded-lg bg-relay-accent px-4 py-2.5 text-sm font-medium text-white transition duration-150 hover:bg-relay-accent-hover"
      >
        New conversation
      </button>
    </div>
  )
}
