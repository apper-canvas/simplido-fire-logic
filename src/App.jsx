import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <>
      <div className="app-container min-h-screen flex flex-col">
        <header className="py-4 px-4 md:px-6 flex items-center justify-between bg-gradient-to-r from-aqua-400 to-secondary dark:from-aqua-600 dark:to-secondary-dark text-white shadow-md">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl wave-animation gradient-text bg-gradient-to-r from-white to-aqua-100 dark:from-white dark:to-aqua-200">
              SimpliDo
            </h1>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </header>
        
        <main className="flex-grow container mx-auto px-4 md:px-6 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <footer className="py-4 px-4 md:px-6 text-sm text-center text-surface-500 dark:text-surface-400 bg-gradient-to-t from-aqua-50/50 to-transparent dark:from-transparent">
          <div className="flex flex-col gap-2">
            <p>SimpliDo &copy; {new Date().getFullYear()} - <span className="gradient-text">Aqua Themed</span> Todo App</p>
            <div className="flex justify-center gap-4 text-xs">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </footer>
      </div>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </>
  );
}

export default App;