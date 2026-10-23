import Avatar from './Avatar'
import { formatListTime } from '../utils/avatar'

export default function ConversationItem({
  contact,
  conversation,
  selected,
  onSelect,
}) {
  const last = conversation.messages[conversation.messages.length - 1]
  const preview =
    last?.senderId === 'user-me' ? `You: ${last.text}` : last?.text || 'No messages yet'
  const time = last ? formatListTime(last.createdAt) : ''

  return (
    <button
      type="button"
      onClick={() => onSelect(conversation.id)}
      className={`flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition duration-150 ${
        selected
          ? 'bg-relay-accent-soft/80 ring-1 ring-relay-accent/20'
          : 'hover:bg-[#1a2035]'
      }`}
    >
      <div className="relative">
        <Avatar name={contact.name} seed={contact.id} size="md" />
        {contact.status === 'online' && (
          <span
            className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-relay-sidebar bg-emerald-500"
            aria-label="Online"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span
            className={`truncate text-sm font-semibold ${
              selected ? 'text-relay-text' : 'text-[#dce1ef]'
            }`}
          >
            {contact.name}
          </span>
          <span className="shrink-0 text-[11px] text-relay-subtle">{time}</span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p
            className={`truncate text-sm ${
              selected ? 'text-relay-muted' : 'text-relay-subtle'
            }`}
          >
            {preview}
          </p>
          {conversation.unreadCount > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-relay-accent px-1.5 text-[11px] font-semibold text-white">
              {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
