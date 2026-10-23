const now = Date.now()
const min = (m) => new Date(now - m * 60 * 1000).toISOString()
const hrs = (h) => new Date(now - h * 60 * 60 * 1000).toISOString()
const days = (d) => new Date(now - d * 24 * 60 * 60 * 1000).toISOString()

export const CURRENT_USER = {
  id: 'user-me',
  name: 'Alex Chen',
  email: 'alex.chen@relay.app',
  status: 'online',
  statusText: 'Available for messages',
  bio: 'Product designer · Relay team',
}

export const CONTACTS = [
  {
    id: 'contact-maya',
    name: 'Maya Rodriguez',
    status: 'online',
    lastSeen: min(2),
    title: 'Engineering Lead',
  },
  {
    id: 'contact-jordan',
    name: 'Jordan Blake',
    status: 'offline',
    lastSeen: hrs(3),
    title: 'Client Success',
  },
  {
    id: 'contact-sam',
    name: 'Sam Okonkwo',
    status: 'online',
    lastSeen: min(5),
    title: 'Backend Developer',
  },
  {
    id: 'contact-elena',
    name: 'Elena Vasquez',
    status: 'offline',
    lastSeen: days(1),
    title: 'Marketing Director',
  },
  {
    id: 'contact-liam',
    name: 'Liam Foster',
    status: 'online',
    lastSeen: min(1),
    title: 'UX Researcher',
  },
  {
    id: 'contact-priya',
    name: 'Priya Sharma',
    status: 'offline',
    lastSeen: hrs(8),
    title: 'Project Manager',
  },
  {
    id: 'contact-noah',
    name: 'Noah Kim',
    status: 'offline',
    lastSeen: days(2),
    title: 'Legal Counsel',
  },
  {
    id: 'contact-aisha',
    name: 'Aisha Patel',
    status: 'online',
    lastSeen: min(12),
    title: 'Data Analyst',
  },
  {
    id: 'contact-marcus',
    name: 'Marcus Webb',
    status: 'offline',
    lastSeen: hrs(26),
    title: 'Sales Executive',
  },
]

function msg(id, senderId, text, createdAt, read = true) {
  return { id, senderId, text, createdAt, read }
}

export function createInitialConversations() {
  return [
    {
      id: 'conv-maya',
      contactId: 'contact-maya',
      unreadCount: 2,
      messages: [
        msg('m1', 'contact-maya', 'Hey Alex — did you get a chance to review the dashboard mockups?', min(45), true),
        msg('m2', 'user-me', 'Yes! They look great. I have a few spacing tweaks for the sidebar.', min(42), true),
        msg('m3', 'contact-maya', 'Perfect. Can we sync before the client call tomorrow?', min(38), true),
        msg('m4', 'user-me', 'Absolutely. How does 10:30 work for you?', min(35), true),
        msg('m5', 'contact-maya', '10:30 works. I will send the Figma link in a bit.', min(30), true),
        msg('m6', 'contact-maya', 'Also — the client asked if we can show mobile navigation in the demo.', min(8), false),
        msg('m7', 'contact-maya', 'No rush tonight, but let me know your thoughts when you can.', min(5), false),
      ],
    },
    {
      id: 'conv-jordan',
      contactId: 'contact-jordan',
      unreadCount: 0,
      messages: [
        msg('j1', 'contact-jordan', 'Quick update: the stakeholder meeting moved to Thursday.', hrs(5), true),
        msg('j2', 'user-me', 'Thanks for the heads-up. I will adjust the timeline slide.', hrs(4), true),
        msg('j3', 'contact-jordan', 'Appreciate it. They are especially interested in the messaging flow.', hrs(3), true),
      ],
    },
    {
      id: 'conv-sam',
      contactId: 'contact-sam',
      unreadCount: 1,
      messages: [
        msg('s1', 'user-me', 'Sam, when we wire up Socket.IO, should conversations live in one channel per thread?', hrs(20), true),
        msg('s2', 'contact-sam', 'Good question. I would start with room-per-conversation and a user presence channel.', hrs(18), true),
        msg('s3', 'contact-sam', 'I pushed a draft schema to the shared doc — nothing final yet.', hrs(2), false),
      ],
    },
    {
      id: 'conv-elena',
      contactId: 'contact-elena',
      unreadCount: 0,
      messages: [
        msg('e1', 'contact-elena', 'Love the clean look of the new UI direction.', days(1), true),
        msg('e2', 'user-me', 'Thank you! We are aiming for something that feels premium but approachable.', days(1), true),
        msg('e3', 'contact-elena', 'That resonates. Can you add a line about security in the footer for the deck?', days(1), true),
      ],
    },
    {
      id: 'conv-liam',
      contactId: 'contact-liam',
      unreadCount: 0,
      messages: [
        msg('l1', 'contact-liam', 'User testing notes are in — overall sentiment is very positive.', min(90), true),
        msg('l2', 'contact-liam', 'Two participants mentioned they wanted clearer unread indicators. Might be worth emphasizing in the demo.', min(85), true),
        msg('l3', 'user-me', 'Good catch. We already have badges in the list — I will make them slightly bolder.', min(80), true),
      ],
    },
    {
      id: 'conv-priya',
      contactId: 'contact-priya',
      unreadCount: 0,
      messages: [
        msg('p1', 'contact-priya', 'Sprint review is at 4 PM. Can you walk through the chat prototype?', hrs(10), true),
        msg('p2', 'user-me', 'Sure — I will cover login, main dashboard, and mobile layout.', hrs(9), true),
      ],
    },
    {
      id: 'conv-noah',
      contactId: 'contact-noah',
      unreadCount: 0,
      messages: [
        msg('n1', 'contact-noah', 'Reminder: please avoid real client names in sample data for the approval build.', days(2), true),
        msg('n2', 'user-me', 'Understood — everything in the prototype is fictional.', days(2), true),
      ],
    },
    {
      id: 'conv-aisha',
      contactId: 'contact-aisha',
      unreadCount: 3,
      messages: [
        msg('a1', 'contact-aisha', 'I pulled engagement metrics for the last pilot.', hrs(6), true),
        msg('a2', 'contact-aisha', 'Average session length went up 18% after the redesign.', hrs(6), true),
        msg('a3', 'contact-aisha', 'Happy to share the chart in our next sync.', hrs(5), false),
        msg('a4', 'contact-aisha', 'Let me know if you need a summary for the client deck.', hrs(4), false),
        msg('a5', 'contact-aisha', 'No pressure — just flagging it.', hrs(4), false),
      ],
    },
  ]
}

export const DEFAULT_SELECTED_CONVERSATION_ID = 'conv-maya'

export function getContactById(id) {
  return CONTACTS.find((c) => c.id === id)
}

export function mergeConversationsWithPersisted(initial, persisted) {
  if (!persisted?.conversations?.length) {
    return {
      conversations: initial,
      selectedConversationId: DEFAULT_SELECTED_CONVERSATION_ID,
    }
  }
  const byId = new Map(initial.map((c) => [c.id, c]))
  const merged = persisted.conversations.map((p) => {
    const base = byId.get(p.id)
    if (!base) return p
    return {
      ...base,
      ...p,
      contactId: p.contactId || base.contactId,
      messages: p.messages?.length ? p.messages : base.messages,
    }
  })
  persisted.conversations.forEach((p) => {
    if (!merged.find((m) => m.id === p.id)) merged.push(p)
  })
  return {
    conversations: merged,
    selectedConversationId:
      persisted.selectedConversationId || DEFAULT_SELECTED_CONVERSATION_ID,
  }
}
