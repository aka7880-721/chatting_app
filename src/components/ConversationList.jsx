import { useApp } from '../context/AppContext'
import { getContactById } from '../data/mockData'
import ConversationItem from './ConversationItem'

export default function ConversationList() {
  const {
    filteredConversations,
    selectedConversationId,
    selectConversation,
    listFilter,
  } = useApp()

  if (filteredConversations.length === 0) {
    return (
      <div className="px-4 py-10 text-center">
        <p className="text-sm font-medium text-relay-muted">No conversations found</p>
        <p className="mt-1 text-xs text-relay-subtle">
          {listFilter === 'unread'
            ? 'You have read all messages in this demo.'
            : 'Try a different search term.'}
        </p>
      </div>
    )
  }

  return (
    <ul className="space-y-0.5 px-2 pb-4" aria-label="Conversations">
      {filteredConversations.map((conv) => {
        const contact = getContactById(conv.contactId)
        if (!contact) return null
        return (
          <li key={conv.id}>
            <ConversationItem
              contact={contact}
              conversation={conv}
              selected={conv.id === selectedConversationId}
              onSelect={selectConversation}
            />
          </li>
        )
      })}
    </ul>
  )
}
