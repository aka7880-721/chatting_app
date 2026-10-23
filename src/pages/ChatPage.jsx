import AppSidebar from '../components/AppSidebar'
import ChatHeader from '../components/ChatHeader'
import EmptyChatState from '../components/EmptyChatState'
import MessageComposer from '../components/MessageComposer'
import MessageList from '../components/MessageList'
import NewConversationModal from '../components/NewConversationModal'
import { useApp } from '../context/AppContext'

export default function ChatPage() {
  const { selectedConversation, mobileChatOpen, setMobileChatOpen } = useApp()

  return (
    <div className="flex h-dvh max-h-dvh overflow-hidden bg-relay-canvas text-relay-text">
      <AppSidebar
        className={`w-full shrink-0 lg:w-[340px] xl:w-[360px] ${
          mobileChatOpen ? 'hidden lg:flex' : 'flex'
        }`}
      />

      <main
        className={`flex min-w-0 flex-1 flex-col bg-relay-header ${
          mobileChatOpen ? 'flex' : 'hidden lg:flex'
        }`}
      >
        {selectedConversation ? (
          <>
            <ChatHeader showBack onBack={() => setMobileChatOpen(false)} />
            <div className="flex min-h-0 flex-1 flex-col chat-canvas">
              <MessageList />
              <MessageComposer />
            </div>
          </>
        ) : (
          <EmptyChatState />
        )}
      </main>

      <NewConversationModal />
    </div>
  )
}
