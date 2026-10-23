import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  CONTACTS,
  CURRENT_USER,
  createInitialConversations,
  DEFAULT_SELECTED_CONVERSATION_ID,
  getContactById,
  mergeConversationsWithPersisted,
} from '../data/mockData'
import {
  clearChatState,
  loadAuth,
  loadChatState,
  loadTheme,
  saveAuth,
  saveChatState,
  saveTheme,
} from '../utils/storage'

const AppContext = createContext(null)

function applyThemeClass(theme) {
  document.body.classList.toggle('dark-theme', theme === 'dark')
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => loadAuth() || CURRENT_USER)
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!loadAuth())
  const [theme, setTheme] = useState(() => loadTheme())
  const [searchQuery, setSearchQuery] = useState('')
  const [listFilter, setListFilter] = useState('all')
  const [mobileChatOpen, setMobileChatOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [newConvoOpen, setNewConvoOpen] = useState(false)
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const initialChat = useMemo(() => {
    const base = createInitialConversations()
    const persisted = loadChatState()
    return mergeConversationsWithPersisted(base, persisted)
  }, [])

  const [conversations, setConversations] = useState(initialChat.conversations)
  const [selectedConversationId, setSelectedConversationId] = useState(
    initialChat.selectedConversationId || DEFAULT_SELECTED_CONVERSATION_ID,
  )

  useEffect(() => {
    applyThemeClass(theme)
    saveTheme(theme)
  }, [theme])

  useEffect(() => {
    saveChatState({ conversations, selectedConversationId })
  }, [conversations, selectedConversationId])

  const showToast = useCallback((message) => {
    setToast(message)
    const t = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(t)
  }, [])

  const login = useCallback((profile) => {
    const session = { ...CURRENT_USER, ...profile, id: 'user-me' }
    saveAuth(session)
    setUser(session)
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    saveAuth(null)
    setIsAuthenticated(false)
    setUser(CURRENT_USER)
    setProfileMenuOpen(false)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const selectConversation = useCallback((id) => {
    setSelectedConversationId(id)
    setMobileChatOpen(true)
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              unreadCount: 0,
              messages: c.messages.map((m) => ({ ...m, read: true })),
            }
          : c,
      ),
    )
  }, [])

  const sendMessage = useCallback(
    (text) => {
      const trimmed = text.trim()
      if (!trimmed || !selectedConversationId) return false
      const now = new Date().toISOString()
      const newMsg = {
        id: `msg-${Date.now()}`,
        senderId: 'user-me',
        text: trimmed,
        createdAt: now,
        read: true,
      }
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversationId
            ? { ...c, messages: [...c.messages, newMsg] }
            : c,
        ),
      )
      return true
    },
    [selectedConversationId],
  )

  const startConversationWithContact = useCallback((contactId) => {
    setConversations((prev) => {
      const existing = prev.find((c) => c.contactId === contactId)
      if (existing) {
        setSelectedConversationId(existing.id)
        setMobileChatOpen(true)
        return prev
      }
      const contact = getContactById(contactId)
      const newConv = {
        id: `conv-${contactId.replace('contact-', '')}-${Date.now()}`,
        contactId,
        unreadCount: 0,
        messages: contact
          ? [
              {
                id: `msg-start-${Date.now()}`,
                senderId: 'user-me',
                text: `Started a conversation with ${contact.name.split(' ')[0]}.`,
                createdAt: new Date().toISOString(),
                read: true,
              },
            ]
          : [],
      }
      setSelectedConversationId(newConv.id)
      setMobileChatOpen(true)
      return [newConv, ...prev]
    })
    setNewConvoOpen(false)
  }, [])

  const updateProfile = useCallback((updates) => {
    setUser((u) => {
      const next = { ...u, ...updates }
      if (isAuthenticated) saveAuth(next)
      return next
    })
  }, [isAuthenticated])

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId,
  )
  const selectedContact = selectedConversation
    ? getContactById(selectedConversation.contactId)
    : null

  const filteredConversations = useMemo(() => {
    let list = [...conversations]
    if (listFilter === 'unread') {
      list = list.filter((c) => c.unreadCount > 0)
    }
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      list = list.filter((c) => {
        const contact = getContactById(c.contactId)
        const nameMatch = contact?.name.toLowerCase().includes(q)
        const msgMatch = c.messages.some((m) =>
          m.text.toLowerCase().includes(q),
        )
        return nameMatch || msgMatch
      })
    }
    return list.sort((a, b) => {
      const lastA = a.messages[a.messages.length - 1]?.createdAt || ''
      const lastB = b.messages[b.messages.length - 1]?.createdAt || ''
      return lastB.localeCompare(lastA)
    })
  }, [conversations, listFilter, searchQuery])

  const contactsWithoutConversation = useMemo(() => {
    const used = new Set(conversations.map((c) => c.contactId))
    return CONTACTS.filter((c) => !used.has(c.id))
  }, [conversations])

  const resetDemoData = useCallback(() => {
    clearChatState()
    const fresh = createInitialConversations()
    setConversations(fresh)
    setSelectedConversationId(DEFAULT_SELECTED_CONVERSATION_ID)
    showToast('Sample conversations restored.')
  }, [showToast])

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    theme,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    listFilter,
    setListFilter,
    conversations,
    filteredConversations,
    selectedConversationId,
    selectedConversation,
    selectedContact,
    selectConversation,
    sendMessage,
    mobileChatOpen,
    setMobileChatOpen,
    profileMenuOpen,
    setProfileMenuOpen,
    newConvoOpen,
    setNewConvoOpen,
    headerMenuOpen,
    setHeaderMenuOpen,
    startConversationWithContact,
    contactsWithoutConversation,
    contacts: CONTACTS,
    updateProfile,
    showToast,
    toast,
    resetDemoData,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
