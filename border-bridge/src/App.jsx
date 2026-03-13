import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Intake from './pages/Intake';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white/60 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <div className="text-lg font-semibold">Border Bridge</div>
            <nav className="flex gap-3">
              <Link
                to="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Home
              </Link>
              <Link
                to="/intake"
                className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Intake
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-10 text-center">
                  <h1 className="text-3xl font-semibold text-slate-900">Welcome to Border Bridge</h1>
                  <p className="mt-3 text-slate-600">
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
