import { useMemo, useState } from 'react'
import { useTodos } from '../contexts/TodoContext'
import TodoList from '../components/TodoList'

const FILTERS = ['All', 'Active', 'Done']

export default function Todos() {
  const { todos, categories, addTodo } = useTodos()
  const [filter, setFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', category: '', priority: 'medium', dueDate: '' })

  const filtered = useMemo(() => {
    return todos.filter((t) => {
      if (filter === 'Active' && t.done) return false
      if (filter === 'Done' && !t.done) return false
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false
      return true
    })
  }, [todos, filter, categoryFilter])

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    addTodo(form)
    setForm({ title: '', description: '', category: '', priority: 'medium', dueDate: '' })
    setShowForm(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-mist-400 mb-1">All tasks</p>
          <h1 className="font-display font-bold text-2xl text-mist-50">Todos</h1>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="px-4 py-2.5 rounded-lg bg-amber text-ink-950 text-sm font-semibold hover:brightness-110 transition"
        >
          {showForm ? 'Cancel' : '+ New task'}
        </button>
      </header>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-xl bg-ink-800 border border-ink-700 p-5 flex flex-col gap-3">
          <input
            autoFocus
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Task title"
            className="bg-ink-900 border border-ink-700 rounded-lg px-4 py-2.5 text-sm text-mist-50 placeholder:text-mist-400 focus:outline-none focus:border-amber/60"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description (optional)"
            rows={2}
            className="bg-ink-900 border border-ink-700 rounded-lg px-4 py-2.5 text-sm text-mist-50 placeholder:text-mist-400 focus:outline-none focus:border-amber/60 resize-none"
          />
          <div className="grid grid-cols-3 gap-3">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-ink-900 border border-ink-700 rounded-lg px-3 py-2 text-sm text-mist-50 focus:outline-none focus:border-amber/60"
            >
              <option value="">No category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="bg-ink-900 border border-ink-700 rounded-lg px-3 py-2 text-sm text-mist-50 focus:outline-none focus:border-amber/60"
            >
              <option value="low">Low priority</option>
              <option value="medium">Medium priority</option>
              <option value="high">High priority</option>
            </select>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="bg-ink-900 border border-ink-700 rounded-lg px-3 py-2 text-sm text-mist-50 focus:outline-none focus:border-amber/60"
            />
          </div>
          <button
            type="submit"
            className="self-start px-4 py-2 rounded-lg bg-amber text-ink-950 text-sm font-semibold hover:brightness-110 transition"
          >
            Create task
          </button>
        </form>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 bg-ink-800 border border-ink-700 rounded-lg p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                filter === f ? 'bg-ink-700 text-mist-50' : 'text-mist-400 hover:text-mist-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-ink-800 border border-ink-700 rounded-lg px-3 py-2 text-xs text-mist-200 focus:outline-none focus:border-amber/60"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <span className="text-xs font-mono text-mist-400 ml-auto">{filtered.length} shown</span>
      </div>

      <TodoList todos={filtered} emptyMessage="No tasks match these filters." />
    </div>
  )
}
