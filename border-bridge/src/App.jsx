import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Intake from './pages/Intake';
import Submitted from './pages/Submitted';
import Login from './pages/Login';
import CaseFile from './pages/CaseFile';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function Home() {
  return (
    <div className="max-w-4xl mx-auto border-2 border-dashed border-gray-300 rounded-lg p-12 mt-8 text-center bg-white shadow-sm">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Border Bridge</h1>
      <p className="text-gray-600 text-lg">
        Use the navigation to get started. The Intake form is under the "Intake" page.
      </p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1 p-4 md:p-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/intake" element={<Intake />} />
                <Route path="/submitted" element={<Submitted />} />
                <Route path="/case/:id" element={<CaseFile />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
