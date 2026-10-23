import Modal from './Modal'
import Avatar from './Avatar'
import { useApp } from '../context/AppContext'

export default function NewConversationModal() {
  const {
    newConvoOpen,
    setNewConvoOpen,
    contacts,
    conversations,
    startConversationWithContact,
  } = useApp()

  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <Modal
      open={newConvoOpen}
      onClose={() => setNewConvoOpen(false)}
      title="Start a conversation"
    >
      <p className="border-b border-relay-border px-5 py-3 text-xs text-relay-muted">
        Select a teammate. Existing chats will open automatically.
      </p>
      <ul className="divide-y divide-relay-border">
        {sortedContacts.map((contact) => {
          const hasChat = conversations.some((c) => c.contactId === contact.id)
          return (
            <li key={contact.id}>
              <button
                type="button"
                onClick={() => startConversationWithContact(contact.id)}
                className="flex w-full items-center gap-3 px-5 py-3 text-left transition duration-150 hover:bg-[#1e2438]"
              >
                <Avatar name={contact.name} seed={contact.id} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-relay-text">{contact.name}</p>
                  <p className="truncate text-xs text-relay-subtle">{contact.title}</p>
                </div>
                {hasChat && (
                  <span className="text-xs text-[#a78bff]">Open</span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </Modal>
  )
}
