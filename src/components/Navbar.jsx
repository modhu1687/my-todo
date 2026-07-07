import { NavLink } from 'react-router-dom'
import { useTodos } from '../contexts/TodoContext'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: GridIcon, end: true },
  { to: '/todos', label: 'Todos', icon: ListIcon },
  { to: '/categories', label: 'Categories', icon: TagIcon },
  { to: '/settings', label: 'Settings', icon: GearIcon },
]

export default function Navbar() {
  const { todos } = useTodos()
  const openCount = todos.filter((t) => !t.done).length

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col bg-ink-950 border-r border-ink-700">
      <div className="px-5 pt-6 pb-5 border-b border-ink-700">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-soft border border-amber/30 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-amber shadow-[0_0_8px_rgba(232,163,61,0.8)]" />
          </div>
          <div>
            <p className="font-display font-bold text-sm tracking-wide text-mist-50">TASKBOARD</p>
            <p className="text-[11px] text-mist-400 font-mono">{openCount} open</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-ink-800 text-mist-50 shadow-panel'
                  : 'text-mist-400 hover:text-mist-50 hover:bg-ink-800/60'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon active={isActive} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-ink-700">
        <div className="rounded-lg bg-ink-800 border border-ink-700 px-3 py-2.5">
          <p className="text-[11px] text-mist-400 font-mono uppercase tracking-wider">Status</p>
          <p className="text-xs text-mist-200 mt-1">All systems nominal</p>
        </div>
      </div>
    </aside>
  )
}

function GridIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1.5" stroke={active ? '#E8A33D' : '#5A6577'} strokeWidth="1.6" />
      <rect x="10" y="2" width="6" height="6" rx="1.5" stroke={active ? '#E8A33D' : '#5A6577'} strokeWidth="1.6" />
      <rect x="2" y="10" width="6" height="6" rx="1.5" stroke={active ? '#E8A33D' : '#5A6577'} strokeWidth="1.6" />
      <rect x="10" y="10" width="6" height="6" rx="1.5" stroke={active ? '#E8A33D' : '#5A6577'} strokeWidth="1.6" />
    </svg>
  )
}

function ListIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="3.5" cy="4.5" r="1.3" fill={active ? '#E8A33D' : '#5A6577'} />
      <circle cx="3.5" cy="9" r="1.3" fill={active ? '#E8A33D' : '#5A6577'} />
      <circle cx="3.5" cy="13.5" r="1.3" fill={active ? '#E8A33D' : '#5A6577'} />
      <line x1="7" y1="4.5" x2="15.5" y2="4.5" stroke={active ? '#E8A33D' : '#5A6577'} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="7" y1="9" x2="15.5" y2="9" stroke={active ? '#E8A33D' : '#5A6577'} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="7" y1="13.5" x2="15.5" y2="13.5" stroke={active ? '#E8A33D' : '#5A6577'} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function TagIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9.5 2.5H4.5C3.4 2.5 2.5 3.4 2.5 4.5V9.5L9.7 16.7C10.5 17.5 11.7 17.5 12.5 16.7L16.2 13C17 12.2 17 11 16.2 10.2L9.5 2.5Z"
        stroke={active ? '#E8A33D' : '#5A6577'}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="6.5" r="1.2" fill={active ? '#E8A33D' : '#5A6577'} />
    </svg>
  )
}

function GearIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="2.6" stroke={active ? '#E8A33D' : '#5A6577'} strokeWidth="1.6" />
      <path
        d="M9 2.5v1.6M9 13.9v1.6M15.5 9h-1.6M4.1 9H2.5M13.4 4.6l-1.1 1.1M5.7 12.3l-1.1 1.1M13.4 13.4l-1.1-1.1M5.7 5.7L4.6 4.6"
        stroke={active ? '#E8A33D' : '#5A6577'}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
