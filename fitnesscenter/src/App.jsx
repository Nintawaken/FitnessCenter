import { useState } from 'react'
import CourseManagement from './CourseManagement'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault()
    // Simple hardcoded check for demonstration
    if (username === 'admin' && password === 'password123') {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {isLoggedIn ? (
        <CourseManagement />
      ) : (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Log In
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default App
