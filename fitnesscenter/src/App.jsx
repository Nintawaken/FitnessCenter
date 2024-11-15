import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseEnroll from './CourseEnroll';
import CourtReservation from './CourtReservation';
import CourseManagement from './CourseManagement';
import Subscription from './Subscription';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(''); // 'admin', 'user', or 'paid'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Predefined user data (simulating a database)
  const userData = {
    admin: { password: 'admin', role: 'admin', isPaid: false },
    user: { password: 'user', role: 'user', isPaid: false },
  };

  // Initialize localStorage with predefined users
  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(userData));
    }
  }, []);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();

    // If the username and password match predefined credentials, log the user in
    const user = userData[username];
    if (user && user.password === password) {
      setIsLoggedIn(true);
      setRole(user.isPaid ? 'paid' : user.role);
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

  // Reset all users' isPaid status to false
  const resetUsers = () => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || {};
      
      // Reset isPaid to false for all users
      Object.keys(users).forEach(userKey => {
        users[userKey].isPaid = false;
      });
      
      // Save the updated users data to localStorage
      localStorage.setItem('users', JSON.stringify(users));

      // Optionally, you could also update state here if needed
      alert('All users have been reset. Their subscription status is now "Not Subscribed".');
    } catch (error) {
      console.error('Error resetting users:', error);
      alert('Failed to reset users.');
    }
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

                {(role === 'paid' || role === 'admin' || role === 'user') && (
                  <Link
                    to="/court-reservation"
                    className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Court Reservation
                  </Link>
                )}

                <Link
                  to="/subscription"
                  className="p-3 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                >
                  Subscription
                </Link>

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
              <Route path="/course-enroll" element={<CourseEnroll username={username} />} />
              <Route
                path="/court-reservation"
                element={<CourtReservation username={username} />}
              />
              {role === 'admin' && <Route path="/course-management" element={<CourseManagement />} />}
              <Route path="/subscription" element={<Subscription username={username} />} />
            </Routes>

            <button
              onClick={handleLogout}
              className="mt-6 p-3 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Log Out
            </button>

            {/* Reset Users Button for Admin */}
            {role === 'admin' && (
              <button
                onClick={resetUsers}
                className="mt-4 p-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Reset All Users to Not Subscribed
              </button>
            )}
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
