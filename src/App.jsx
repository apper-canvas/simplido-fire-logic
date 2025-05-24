import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Dashboard from './pages/Dashboard';
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
    <div className="app-container min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-10 backdrop-blur-xl bg-white/80 dark:bg-surface-900/80 border-b border-surface-200/50 dark:border-surface-700/50 shadow-sm"
      >
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  SimpliDo
                </h1>
                <p className="text-xs text-surface-500 dark:text-surface-400 -mt-1">Minimal Task Manager</p>
              </div>
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-300 shadow-sm"
              aria-label="Toggle dark mode"
            >
              <motion.div
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 bg-white/70 dark:bg-surface-900/70 backdrop-blur-lg border-b border-surface-200/30 dark:border-surface-700/30"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-1">
            <Link to="/" className="px-4 py-3 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary hover:bg-surface-100/50 dark:hover:bg-surface-800/50 rounded-lg transition-all duration-200">
              🏠 Tasks
            </Link>
            <Link to="/dashboard" className="px-4 py-3 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary hover:bg-surface-100/50 dark:hover:bg-surface-800/50 rounded-lg transition-all duration-200">
              📊 Dashboard
            </Link>
          </div>
        </div>
      </motion.nav>

                ) : (
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          <Route path="/dashboard" element={<Dashboard />} />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.header>
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 py-6 px-4 md:px-6 bg-gradient-to-t from-surface-50/50 to-transparent dark:from-surface-900/50 dark:to-transparent"
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-surface-700 dark:text-surface-300">SimpliDo</p>
                <p className="text-xs text-surface-500 dark:text-surface-400">&copy; {new Date().getFullYear()} - Crafted with care</p>
              </div>
            </div>
            
            <nav className="flex gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link 
                to="/terms" 
                className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
              >
                Terms
              </Link>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </motion.footer>
      
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
        className="!z-50"
      />
    </div>
  );
}

export default App;