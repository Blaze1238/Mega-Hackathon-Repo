import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Intake from './pages/Intake';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Hide Navbar completely on the login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Border Bridge</div>
        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          <Link
            to="/home"
            style={{ padding: '0.5rem 0.75rem', textDecoration: 'none', color: '#333' }}
          >
            Home
          </Link>
          <Link
            to="/intake"
            style={{ padding: '0.5rem 0.75rem', textDecoration: 'none', color: '#333' }}
          >
            Intake
          </Link>
          {isAuthenticated ? (
            <button
              onClick={logout}
              style={{
                padding: '0.5rem 0.75rem',
                border: 'none',
                background: 'none',
                color: '#333',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              style={{ padding: '0.5rem 0.75rem', textDecoration: 'none', color: '#333' }}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <main style={{ padding: '2rem' }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/home"
                  element={
                    <div style={{ border: '2px dashed #ccc', padding: '2rem', textAlign: 'center' }}>
                      <h1>Welcome to Border Bridge</h1>
                      <p style={{ marginTop: '1rem' }}>
                        Use the navigation to get started. The Intake form is under the "Intake" page.
                      </p>
                    </div>
                  }
                />
                <Route path="/intake" element={<Intake />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
