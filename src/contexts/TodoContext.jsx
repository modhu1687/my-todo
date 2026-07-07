import { createContext, useContext, useEffect, useState } from 'react'
import { generateId } from '../utils/helpers'

const TodoContext = createContext(null)

const STORAGE_KEY = 'control-panel:todos'
const CATEGORY_KEY = 'control-panel:categories'

const DEFAULT_CATEGORIES = [
  { id: 'work', name: 'Work', color: '#E8A33D' },
  { id: 'personal', name: 'Personal', color: '#5EA88A' },
  { id: 'errands', name: 'Errands', color: '#D1654F' },
]

const SEED_TODOS = [
  {
    id: generateId(),
    title: 'Ship the quarterly report',
    description: 'Finalize numbers with finance and send to stakeholders.',
    category: 'work',
    priority: 'high',
    done: false,
    dueDate: new Date().toISOString().slice(0, 10),
    createdAt: Date.now(),
  },
  {
    id: generateId(),
    title: 'Book dentist appointment',
    description: '',
    category: 'personal',
    priority: 'low',
    done: false,
    dueDate: '',
    createdAt: Date.now(),
  },
  {
    id: generateId(),
    title: 'Pick up dry cleaning',
    description: '',
    category: 'errands',
    priority: 'medium',
    done: true,
    dueDate: new Date().toISOString().slice(0, 10),
    createdAt: Date.now(),
  },
]

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(() => loadFromStorage(STORAGE_KEY, SEED_TODOS))
  const [categories, setCategories] = useState(() => loadFromStorage(CATEGORY_KEY, DEFAULT_CATEGORIES))

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories))
  }, [categories])

  function addTodo(todo) {
    const newTodo = {
      id: generateId(),
      title: todo.title?.trim() || 'Untitled task',
      description: todo.description || '',
      category: todo.category || categories[0]?.id || '',
      priority: todo.priority || 'medium',
      done: false,
      dueDate: todo.dueDate || '',
      createdAt: Date.now(),
    }
    setTodos((prev) => [newTodo, ...prev])
    return newTodo.id
  }

  function updateTodo(id, updates) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  function toggleTodo(id) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  function getTodo(id) {
    return todos.find((t) => t.id === id)
  }

  function addCategory(name) {
    const trimmed = name.trim()
    if (!trimmed) return
    const palette = ['#E8A33D', '#5EA88A', '#D1654F', '#8B93A1', '#C4C9D1']
    const id = trimmed.toLowerCase().replace(/\s+/g, '-') + '-' + generateId().slice(0, 4)
    setCategories((prev) => [...prev, { id, name: trimmed, color: palette[prev.length % palette.length] }])
  }

  function deleteCategory(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id))
    setTodos((prev) => prev.map((t) => (t.category === id ? { ...t, category: '' } : t)))
  }

  function clearAllData() {
    setTodos([])
    setCategories(DEFAULT_CATEGORIES)
  }

  const value = {
    todos,
    categories,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    getTodo,
    addCategory,
    deleteCategory,
    clearAllData,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodos() {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodos must be used within a TodoProvider')
  return ctx
}
