import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'
import { useApp } from '../context/AppContext'

export default function SettingsPage() {
  const {
    user,
    updateProfile,
    theme,
    toggleTheme,
    showToast,
    resetDemoData,
    logout,
  } = useApp()

  const handleSave = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    updateProfile({
      name: String(fd.get('name') || user.name).trim(),
      statusText: String(fd.get('status') || user.statusText).trim(),
      bio: String(fd.get('bio') || user.bio).trim(),
    })
    showToast('Profile updated locally for this demo.')
  }

  return (
    <div className="min-h-dvh bg-[#f4f6f9] dark:bg-[#0f1419]">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4">
          <Link
            to="/chat"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Back to messages"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Settings</h1>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-4">
            <Avatar name={user.name} seed={user.id} size="lg" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="settings-name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Display name
              </label>
              <input
                id="settings-name"
                name="name"
                defaultValue={user.name}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="settings-status" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Status message
              </label>
              <input
                id="settings-status"
                name="status"
                defaultValue={user.statusText}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="settings-bio" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Bio
              </label>
              <textarea
                id="settings-bio"
                name="bio"
                rows={3}
                defaultValue={user.bio}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Save profile
            </button>
          </form>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Appearance</h2>
          <p className="mt-1 text-sm text-slate-500">Switch between light and dark themes for the demo.</p>
          <button
            type="button"
            onClick={toggleTheme}
            className="mt-4 flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-left text-sm transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/60"
          >
            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              Theme
            </span>
            <span className="font-medium capitalize text-indigo-600 dark:text-indigo-400">{theme}</span>
          </button>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Prototype</h2>
          <p className="mt-1 text-sm text-slate-500">
            Reset sample conversations or sign out to view the login flow again.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={resetDemoData}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Restore sample data
            </button>
            <Link
              to="/login"
              onClick={() => logout()}
              className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              Sign out
            </Link>
          </div>
        </section>

        <p className="text-center text-xs text-slate-400 pb-8">
          Notifications, security, and connected accounts require backend integration.
        </p>
      </div>
    </div>
  )
}
