import { useEffect, useMemo, useRef } from 'react'
import { useApp } from '../context/AppContext'
import MessageBubble from './MessageBubble'
import { formatDateSeparator, sameCalendarDay } from '../utils/avatar'

export default function MessageList() {
  const { selectedConversation } = useApp()
  const bottomRef = useRef(null)
  const messages = selectedConversation?.messages ?? []

  const items = useMemo(() => {
    const result = []
    let lastDay = null
    let unreadDividerShown = false
    messages.forEach((msg, index) => {
      if (!sameCalendarDay(msg.createdAt, lastDay)) {
        result.push({ type: 'date', id: `date-${msg.createdAt}`, label: formatDateSeparator(msg.createdAt) })
        lastDay = msg.createdAt
      }
      if (
        !unreadDividerShown &&
        !msg.read &&
        msg.senderId !== 'user-me' &&
        messages.slice(index).some((m) => !m.read && m.senderId !== 'user-me')
      ) {
        result.push({ type: 'unread', id: 'unread-divider' })
        unreadDividerShown = true
      }
      result.push({ type: 'message', id: msg.id, message: msg })
    })
    return result
  }, [messages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, selectedConversation?.id])

  if (!selectedConversation) return null

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin md:px-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-2.5">
        {items.map((item) => {
          if (item.type === 'date') {
            return (
              <div key={item.id} className="flex justify-center py-2">
                <span className="rounded-full bg-[#1e2438]/90 px-3 py-1 text-[11px] font-medium text-relay-muted">
                  {item.label}
                </span>
              </div>
            )
          }
          if (item.type === 'unread') {
            return (
              <div key={item.id} className="flex items-center gap-3 py-2">
                <div className="h-px flex-1 bg-relay-border" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a78bff]">
                  Unread messages
                </span>
                <div className="h-px flex-1 bg-relay-border" />
              </div>
            )
          }
          const isOwn = item.message.senderId === 'user-me'
          return <MessageBubble key={item.id} message={item.message} isOwn={isOwn} />
        })}
        <div ref={bottomRef} aria-hidden />
      </div>
    </div>
  )
}
