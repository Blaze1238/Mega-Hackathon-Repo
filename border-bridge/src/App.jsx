import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Intake from './pages/Intake';

function App() {
  return (
    <Router>
      <div>
        <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Border Bridge</div>
            <nav style={{ display: 'flex', gap: '0.5rem' }}>
              <Link
                to="/"
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
            </nav>
          </div>
        </header>

        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route
              path="/"
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
