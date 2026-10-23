import { Paperclip, Send } from 'lucide-react'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useApp } from '../context/AppContext'

const MIN_INPUT_HEIGHT = 44
const MAX_INPUT_HEIGHT = 132

export default function MessageComposer() {
  const { sendMessage, showToast, selectedConversationId } = useApp()
  const [text, setText] = useState('')
  const [scrollable, setScrollable] = useState(false)
  const textareaRef = useRef(null)

  const syncTextareaHeight = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    const contentHeight = el.scrollHeight
    const nextHeight = Math.min(Math.max(contentHeight, MIN_INPUT_HEIGHT), MAX_INPUT_HEIGHT)
    el.style.height = `${nextHeight}px`
    const needsScroll = contentHeight > MAX_INPUT_HEIGHT
    setScrollable(needsScroll)
    el.style.overflowY = needsScroll ? 'auto' : 'hidden'
  }, [])

  useLayoutEffect(() => {
    syncTextareaHeight()
  }, [text, selectedConversationId, syncTextareaHeight])

  const handleSend = () => {
    const ok = sendMessage(text)
    if (ok) {
      setText('')
      requestAnimationFrame(() => syncTextareaHeight())
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="shrink-0 border-t border-relay-border bg-relay-header px-4 py-3 md:px-6">
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <button
          type="button"
          onClick={() =>
            showToast('File attachments will be enabled when storage is connected.')
          }
          className="mb-0.5 shrink-0 rounded-lg p-2 text-relay-subtle transition duration-150 hover:bg-[#1e2438] hover:text-relay-muted"
          aria-label="Attach file"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <label className="sr-only" htmlFor="message-input">
          Message
        </label>
        <textarea
          ref={textareaRef}
          id="message-input"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Write a message…"
          disabled={!selectedConversationId}
          className={`composer-textarea min-h-[44px] flex-1 resize-none rounded-xl border border-relay-border bg-relay-input px-4 py-2.5 text-sm leading-relaxed text-relay-text placeholder:text-relay-subtle transition duration-150 focus:border-relay-accent focus:outline-none focus:ring-2 focus:ring-relay-accent/25 disabled:opacity-50 ${
            scrollable ? 'composer-textarea--scroll' : ''
          }`}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!text.trim() || !selectedConversationId}
          className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-relay-accent text-white transition duration-150 hover:bg-relay-accent-hover disabled:cursor-not-allowed disabled:bg-[#3a3f52] disabled:text-relay-subtle"
          aria-label="Send message"
        >
          <Send className="h-[18px] w-[18px]" />
        </button>
      </div>
      <p className="mx-auto mt-2 hidden max-w-3xl text-[10px] text-relay-subtle sm:block">
        Press Enter to send · Shift+Enter for a new line
      </p>
    </div>
  )
}
