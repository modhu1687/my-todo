import { Routes, Route } from 'react-router-dom'
import { TodoProvider } from './contexts/TodoContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Todos from './pages/Todos'
import TodoDetail from './pages/TodoDetail'
import Categories from './pages/Categories'
import Settings from './pages/Settings'
import './App.css'

function App() {
  return (
    <TodoProvider>
      <div className="flex min-h-screen bg-ink-900">
        <Navbar />
        <main className="flex-1 px-8 py-8 max-w-5xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/todos/:id" element={<TodoDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </TodoProvider>
  )
}

export default App
