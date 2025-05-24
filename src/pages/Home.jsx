import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  
  useEffect(() => {
    const completed = tasks.filter(task => task.completed).length;
    setStats({
      total: tasks.length,
      completed,
      pending: tasks.length - completed
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = (text, priority = 'medium') => {
    if (!text.trim()) return;
    
    const newTask = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      priority
    };
    
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully! 🎯");
  };
  
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    const task = tasks.find(t => t.id === id);
    if (task && !task.completed) {
      toast.success("Great job! Task completed! 🎉");
    }
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.info("Task removed 🗑️");
  };
  
  const clearCompletedTasks = () => {
    if (tasks.some(task => task.completed)) {
      setTasks(tasks.filter(task => !task.completed));
      toast.success("Completed tasks cleared! ✨");
    }
  };
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      {/* Hero Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Manage Your Day</span>
        </h1>
        <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
          A beautiful, minimal task manager to help you stay organized and productive
        </p>
      </motion.div>
      
      {/* Stats Cards */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        <div className="stat-card bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">Total Tasks</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="stat-card bg-gradient-to-br from-green-500/10 to-green-600/10 dark:from-green-500/20 dark:to-green-600/20 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">Completed</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="stat-card bg-gradient-to-br from-amber-500/10 to-amber-600/10 dark:from-amber-500/20 dark:to-amber-600/20 border border-amber-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.pending}</p>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">In Progress</p>
            </div>
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <MainFeature 
            tasks={filteredTasks} 
            addTask={addTask} 
            toggleTaskCompletion={toggleTaskCompletion} 
            deleteTask={deleteTask} 
          />
        </motion.div>
        
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Filters */}
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter Tasks
            </h3>
            
            <div className="flex flex-col gap-2">
              {['all', 'active', 'completed'].map((filterType) => (
                <button 
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === filterType 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md' 
                      : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {filterType === 'all' && '📋'}
                    {filterType === 'active' && '🔄'}
                    {filterType === 'completed' && '✅'}
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </h3>
            
            <button 
              onClick={clearCompletedTasks}
              disabled={!tasks.some(task => task.completed)}
              className="w-full btn btn-secondary group"
            >
              <svg className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Completed
            </button>
          </div>
          
          {/* Tips */}
          <div className="glass-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Pro Tips
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex gap-2">
                <span className="text-primary">•</span>
                <p className="text-surface-600 dark:text-surface-400">
                  Double-click any task to edit it
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">•</span>
                <p className="text-surface-600 dark:text-surface-400">
                  Set priority levels for better organization
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">•</span>
                <p className="text-surface-600 dark:text-surface-400">
                  Drag tasks to reorder them
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
                </div>
                <div className="flex-1 p-3 rounded-xl bg-surface-800 shadow-neu-dark border border-surface-700 flex items-center justify-center">
                  <MoonIcon className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <p className="mt-3 text-xs text-surface-500 dark:text-surface-400">
                Use the toggle in the header to switch between light and dark mode
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;