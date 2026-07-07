import { Link } from 'react-router-dom'
import { useTodos } from '../contexts/TodoContext'
import { priorityMeta, formatDate, isOverdue } from '../utils/helpers'

export default function TodoList({ todos, emptyMessage = 'Nothing here yet.' }) {
  const { toggleTodo, deleteTodo, categories } = useTodos()

  if (!todos.length) {
    return (
      <div className="rounded-xl border border-dashed border-ink-700 py-10 text-center">
        <p className="text-mist-400 text-sm">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => {
        const priority = priorityMeta(todo.priority)
        const category = categories.find((c) => c.id === todo.category)
        const overdue = isOverdue(todo.dueDate, todo.done)

        return (
          <li
            key={todo.id}
            className="group relative flex items-center gap-3 rounded-xl bg-ink-800 border border-ink-700 pl-0 pr-4 py-3 overflow-hidden hover:border-ink-600 transition-colors"
          >
            <span className={`absolute left-0 top-0 bottom-0 w-1 ${priority.rail}`} />

            <button
              onClick={() => toggleTodo(todo.id)}
              className={`ml-5 shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                todo.done ? 'bg-teal border-teal' : 'border-ink-600 hover:border-mist-400'
              }`}
              aria-label={todo.done ? 'Mark as not done' : 'Mark as done'}
            >
              {todo.done && (
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6.2L4.7 9L10 3" stroke="#0D1015" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            <Link to={`/todos/${todo.id}`} className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${todo.done ? 'text-mist-400 line-through' : 'text-mist-50'}`}>
                {todo.title}
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {category && (
                  <span className="text-[11px] font-mono text-mist-400">{category.name}</span>
                )}
                {todo.dueDate && (
                  <span className={`text-[11px] font-mono ${overdue ? 'text-brick' : 'text-mist-400'}`}>
                    {overdue ? 'Overdue · ' : ''}{formatDate(todo.dueDate)}
                  </span>
                )}
              </div>
            </Link>

            <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md ${priority.chip} shrink-0`}>
              {priority.label}
            </span>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-mist-400 opacity-0 group-hover:opacity-100 hover:text-brick hover:bg-brick-soft transition-all"
              aria-label="Delete todo"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 3.5H11.5M5.5 3.5V2.3C5.5 1.9 5.8 1.5 6.2 1.5H7.8C8.2 1.5 8.5 1.9 8.5 2.3V3.5M11 3.5L10.6 11.2C10.6 11.7 10.1 12.1 9.6 12.1H4.4C3.9 12.1 3.4 11.7 3.4 11.2L3 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
