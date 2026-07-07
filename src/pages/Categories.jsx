import { useState } from 'react'
import { useTodos } from '../contexts/TodoContext'

export default function Categories() {
  const { categories, todos, addCategory, deleteCategory } = useTodos()
  const [name, setName] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    if (!name.trim()) return
    addCategory(name)
    setName('')
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <header>
        <p className="text-[11px] font-mono uppercase tracking-wider text-mist-400 mb-1">Organize</p>
        <h1 className="font-display font-bold text-2xl text-mist-50">Categories</h1>
      </header>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="flex-1 bg-ink-800 border border-ink-700 rounded-lg px-4 py-2.5 text-sm text-mist-50 placeholder:text-mist-400 focus:outline-none focus:border-amber/60"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-lg bg-amber text-ink-950 text-sm font-semibold hover:brightness-110 transition"
        >
          Add
        </button>
      </form>

      <ul className="flex flex-col gap-2">
        {categories.map((c) => {
          const count = todos.filter((t) => t.category === c.id).length
          return (
            <li
              key={c.id}
              className="flex items-center gap-3 rounded-xl bg-ink-800 border border-ink-700 px-4 py-3"
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
              <span className="text-sm font-medium text-mist-50 flex-1">{c.name}</span>
              <span className="text-xs font-mono text-mist-400">{count} task{count === 1 ? '' : 's'}</span>
              <button
                onClick={() => deleteCategory(c.id)}
                className="w-7 h-7 rounded-md flex items-center justify-center text-mist-400 hover:text-brick hover:bg-brick-soft transition-colors"
                aria-label={`Delete ${c.name}`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 3.5H11.5M5.5 3.5V2.3C5.5 1.9 5.8 1.5 6.2 1.5H7.8C8.2 1.5 8.5 1.9 8.5 2.3V3.5M11 3.5L10.6 11.2C10.6 11.7 10.1 12.1 9.6 12.1H4.4C3.9 12.1 3.4 11.7 3.4 11.2L3 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          )
        })}
        {categories.length === 0 && (
          <li className="rounded-xl border border-dashed border-ink-700 py-10 text-center">
            <p className="text-mist-400 text-sm">No categories yet. Add one above.</p>
          </li>
        )}
      </ul>
    </div>
  )
}
