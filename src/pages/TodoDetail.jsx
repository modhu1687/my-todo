import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTodos } from '../contexts/TodoContext'
import { priorityMeta } from '../utils/helpers'

export default function TodoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTodo, updateTodo, deleteTodo, toggleTodo, categories } = useTodos()
  const todo = getTodo(id)
  const [draft, setDraft] = useState(todo || null)
  const [saved, setSaved] = useState(false)

  if (!todo) {
    return (
      <div className="flex flex-col gap-4">
        <Link to="/todos" className="text-sm text-mist-400 hover:text-mist-50">&larr; Back to todos</Link>
        <div className="rounded-xl border border-dashed border-ink-700 py-10 text-center">
          <p className="text-mist-400 text-sm">This task doesn't exist anymore.</p>
        </div>
      </div>
    )
  }

  function handleSave(e) {
    e.preventDefault()
    updateTodo(todo.id, draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  function handleDelete() {
    deleteTodo(todo.id)
    navigate('/todos')
  }

  const priority = priorityMeta(draft.priority)

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <Link to="/todos" className="text-sm text-mist-400 hover:text-mist-50 w-fit">&larr; Back to todos</Link>

      <div className="rounded-xl bg-ink-800 border border-ink-700 shadow-panel overflow-hidden">
        <div className={`h-1.5 ${priority.rail}`} />
        <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="flex-1 bg-transparent font-display font-bold text-xl text-mist-50 focus:outline-none border-b border-transparent focus:border-ink-600 pb-1"
            />
            <button
              type="button"
              onClick={() => {
                toggleTodo(todo.id)
                setDraft((d) => ({ ...d, done: !d.done }))
              }}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                draft.done ? 'bg-teal-soft text-teal' : 'bg-ink-700 text-mist-200'
              }`}
            >
              {draft.done ? 'Completed' : 'Mark done'}
            </button>
          </div>

          <textarea
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            placeholder="Add a description..."
            rows={4}
            className="bg-ink-900 border border-ink-700 rounded-lg px-4 py-3 text-sm text-mist-200 placeholder:text-mist-400 focus:outline-none focus:border-amber/60 resize-none"
          />

          <div className="grid grid-cols-3 gap-3">
            <Field label="Category">
              <select
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                className="w-full bg-ink-900 border border-ink-700 rounded-lg px-3 py-2 text-sm text-mist-50 focus:outline-none focus:border-amber/60"
              >
                <option value="">None</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Priority">
              <select
                value={draft.priority}
                onChange={(e) => setDraft({ ...draft, priority: e.target.value })}
                className="w-full bg-ink-900 border border-ink-700 rounded-lg px-3 py-2 text-sm text-mist-50 focus:outline-none focus:border-amber/60"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </Field>
            <Field label="Due date">
              <input
                type="date"
                value={draft.dueDate}
                onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
                className="w-full bg-ink-900 border border-ink-700 rounded-lg px-3 py-2 text-sm text-mist-50 focus:outline-none focus:border-amber/60"
              />
            </Field>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-amber text-ink-950 text-sm font-semibold hover:brightness-110 transition"
            >
              Save changes
            </button>
            {saved && <span className="text-xs text-teal font-mono">Saved</span>}
            <button
              type="button"
              onClick={handleDelete}
              className="ml-auto px-4 py-2 rounded-lg bg-brick-soft text-brick text-sm font-semibold hover:brightness-110 transition"
            >
              Delete task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-mono uppercase tracking-wider text-mist-400">{label}</span>
      {children}
    </label>
  )
}
