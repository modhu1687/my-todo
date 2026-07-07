import { useState } from 'react'
import { useTodos } from '../contexts/TodoContext'
import StatsCard from '../components/StatsCard'
import TodoList from '../components/TodoList'
import { isToday, isOverdue, todayIso } from '../utils/helpers'

export default function Dashboard() {
  const { todos, addTodo } = useTodos()
  const [quickTitle, setQuickTitle] = useState('')

  const open = todos.filter((t) => !t.done)
  const done = todos.filter((t) => t.done)
  const overdue = todos.filter((t) => isOverdue(t.dueDate, t.done))
  const todayTodos = open.filter((t) => isToday(t.dueDate))
  const upNext = open.filter((t) => !isToday(t.dueDate)).slice(0, 5)

  function handleQuickAdd(e) {
    e.preventDefault()
    if (!quickTitle.trim()) return
    addTodo({ title: quickTitle, dueDate: todayIso() })
    setQuickTitle('')
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="text-[11px] font-mono uppercase tracking-wider text-mist-400 mb-1">
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h1 className="font-display font-bold text-2xl text-mist-50">Dashboard</h1>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard label="Open" value={open.length} accent="amber" sublabel="tasks in flight" />
        <StatsCard label="Done" value={done.length} accent="teal" sublabel="completed" />
        <StatsCard label="Overdue" value={overdue.length} accent="brick" sublabel="need attention" />
        <StatsCard label="Due today" value={todayTodos.length} accent="mist" sublabel="on the clock" />
      </div>

      <form onSubmit={handleQuickAdd} className="flex gap-2">
        <input
          value={quickTitle}
          onChange={(e) => setQuickTitle(e.target.value)}
          placeholder="Quick add a task for today..."
          className="flex-1 bg-ink-800 border border-ink-700 rounded-lg px-4 py-2.5 text-sm text-mist-50 placeholder:text-mist-400 focus:outline-none focus:border-amber/60 focus:ring-1 focus:ring-amber/40"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-lg bg-amber text-ink-950 text-sm font-semibold hover:brightness-110 transition"
        >
          Add
        </button>
      </form>

      <section className="flex flex-col gap-3">
        <h2 className="font-display font-semibold text-sm text-mist-200 uppercase tracking-wide">
          Today · {todayTodos.length}
        </h2>
        <TodoList todos={todayTodos} emptyMessage="Nothing due today. Add a task above or enjoy the calm." />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display font-semibold text-sm text-mist-200 uppercase tracking-wide">Up next</h2>
        <TodoList todos={upNext} emptyMessage="No upcoming tasks queued." />
      </section>
    </div>
  )
}
