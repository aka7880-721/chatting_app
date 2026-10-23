const AUTH_KEY = 'relay_demo_auth'
const THEME_KEY = 'relay_theme'
const CHAT_KEY = 'relay_chat_state'

export function loadAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveAuth(user) {
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(AUTH_KEY)
  }
}

export function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'light') return 'light'
  return 'dark'
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
}

export function loadChatState() {
  try {
    const raw = localStorage.getItem(CHAT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveChatState(state) {
  localStorage.setItem(CHAT_KEY, JSON.stringify(state))
}

export function clearChatState() {
  localStorage.removeItem(CHAT_KEY)
}
