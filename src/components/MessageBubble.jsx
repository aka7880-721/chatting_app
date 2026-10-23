import { formatMessageTime } from '../utils/avatar'

export default function MessageBubble({ message, isOwn }) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[min(100%,36rem)] rounded-2xl px-3.5 py-2 ${
          isOwn
            ? 'rounded-br-md bg-relay-accent text-white'
            : 'rounded-bl-md bg-relay-incoming text-relay-text'
        }`}
      >
        <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">{message.text}</p>
        <p
          className={`mt-1 text-right text-[10px] tracking-wide ${
            isOwn ? 'text-white/55' : 'text-relay-subtle'
          }`}
        >
          {formatMessageTime(message.createdAt)}
        </p>
      </div>
    </div>
  )
}
