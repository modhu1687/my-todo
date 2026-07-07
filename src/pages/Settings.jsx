import { useState } from 'react'
import { useTodos } from '../contexts/TodoContext'

export default function Settings() {
  const { todos, categories, clearAllData } = useTodos()
  const [confirming, setConfirming] = useState(false)

  function handleClear() {
    if (!confirming) {
      setConfirming(true)
      return
    }
    clearAllData()
    setConfirming(false)
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <header>
        <p className="text-[11px] font-mono uppercase tracking-wider text-mist-400 mb-1">Preferences</p>
        <h1 className="font-display font-bold text-2xl text-mist-50">Settings</h1>
      </header>

      <section className="rounded-xl bg-ink-800 border border-ink-700 p-5 flex flex-col gap-4">
        <h2 className="font-display font-semibold text-sm text-mist-200 uppercase tracking-wide">Overview</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-mist-400 text-xs font-mono uppercase tracking-wider">Total tasks</p>
            <p className="text-mist-50 font-display font-bold text-xl mt-1">{todos.length}</p>
          </div>
          <div>
            <p className="text-mist-400 text-xs font-mono uppercase tracking-wider">Categories</p>
            <p className="text-mist-50 font-display font-bold text-xl mt-1">{categories.length}</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-ink-800 border border-ink-700 p-5 flex flex-col gap-3">
        <h2 className="font-display font-semibold text-sm text-mist-200 uppercase tracking-wide">Data</h2>
        <p className="text-sm text-mist-400">
          All tasks and categories are stored locally in this browser. Clearing data removes every task and resets categories to the defaults.
        </p>
        <button
          onClick={handleClear}
          className={`self-start px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            confirming ? 'bg-brick text-ink-950' : 'bg-brick-soft text-brick hover:brightness-110'
          }`}
        >
          {confirming ? 'Click again to confirm' : 'Clear all data'}
        </button>
        {confirming && (
          <button onClick={() => setConfirming(false)} className="self-start text-xs text-mist-400 hover:text-mist-200">
            Cancel
          </button>
        )}
      </section>

      <section className="rounded-xl bg-ink-800 border border-ink-700 p-5 flex flex-col gap-2">
        <h2 className="font-display font-semibold text-sm text-mist-200 uppercase tracking-wide">About</h2>
        <p className="text-sm text-mist-400">Taskboard — a lightweight local todo manager built with React and Tailwind CSS.</p>
      </section>
    </div>
  )
}
