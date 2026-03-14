import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Hidden on /login or when not authenticated
  if (!isAuthenticated || location.pathname === '/login') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex justify-between items-center py-4 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-xl font-bold text-gray-900">
          Border Bridge
        </div>
        <nav className="flex space-x-2 items-center">
          <Link
            to="/"
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/intake"
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Intake
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
