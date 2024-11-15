import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseEnroll from './CourseEnroll';
import CourtReservation from './CourtReservation';
import CourseManagement from './CourseManagement';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(''); // 'admin', 'user', or 'paid'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();

    // Simple hardcoded check for demonstration
    if (username === 'admin' && password === 'admin') {
      setRole('admin');
      setIsLoggedIn(true);
      setError('');
    } else if (username === 'user' && password === 'user') {
      setRole('user');
      setIsLoggedIn(true);
      setError('');
    } else if (username === 'paid' && password === 'paid') {
      setRole('paid');
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole('');
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        {isLoggedIn ? (
          <div>
            {/* Dashboard and Navigation */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
              <div className="space-x-4">
                <Link
                  to="/course-enroll"
                  className={`p-3 ${role === 'paid' ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded-md hover:bg-blue-600`}
                >
                  Course Enrollment
                </Link>

                {/* Only show Court Reservation link for 'paid' users */}
                {(role === 'paid' || role === 'admin' || role === 'user') && (
                  <Link
                    to="/court-reservation"
                    className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Court Reservation
                  </Link>
                )}

                {role === 'admin' && (
                  <Link
                    to="/course-management"
                    className="p-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Course Management
                  </Link>
                )}
              </div>
            </div>

            {/* Conditional Render for Admin, Paid User, or Regular User */}
            <Routes>
              <Route path="/course-enroll" element={<CourseEnroll customerType={role} />} />
              {role === 'paid' && (
                <Route path="/court-reservation" element={<CourtReservation userRole={role} />} />
              )}
              {(role === 'admin' || role === 'user') && (
                <Route path="/court-reservation" element={<CourtReservation userRole={role} />} />
              )}
              {role === 'admin' && <Route path="/course-management" element={<CourseManagement />} />}
            </Routes>

            <button
              onClick={handleLogout}
              className="mt-6 p-3 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            <form onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mt-4">
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <button
                type="submit"
                className="mt-6 w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Log In
              </button>
            </form>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
