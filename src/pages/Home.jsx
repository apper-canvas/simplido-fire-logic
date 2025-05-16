import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const SunIcon = getIcon('Sun');
const MoonIcon = getIcon('Moon');
const ListChecksIcon = getIcon('ListChecks');

const Home = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  
  useEffect(() => {
    // Update stats whenever tasks change
    const completed = tasks.filter(task => task.completed).length;
    setStats({
      total: tasks.length,
      completed,
      pending: tasks.length - completed
    });
    
    // Save to localStorage
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
    toast.success("Task added successfully!");
  };
  
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success("Task deleted successfully!");
  };
  
  const clearCompletedTasks = () => {
    if (tasks.some(task => task.completed)) {
      setTasks(tasks.filter(task => !task.completed));
      toast.success("Completed tasks cleared!");
    }
  };
  
  // Get filtered tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all' filter
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
            <ListChecksIcon className="w-8 h-8 text-primary" /> 
            <span>Your Tasks</span>
          </h1>
          <p className="text-surface-600 dark:text-surface-400">
            Stay organized with your minimal todo list
          </p>
        </div>
        
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <div className="stats flex flex-col sm:flex-row gap-2 text-sm">
            <div className="stat-card p-2 rounded-xl bg-surface-100 dark:bg-surface-800 flex-1 text-center">
              <p className="font-semibold">{stats.total}</p>
              <p className="text-surface-500 dark:text-surface-400">Total</p>
            </div>
            <div className="stat-card p-2 rounded-xl bg-green-100 dark:bg-green-900/30 flex-1 text-center">
              <p className="font-semibold">{stats.completed}</p>
              <p className="text-green-700 dark:text-green-400">Completed</p>
            </div>
            <div className="stat-card p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex-1 text-center">
              <p className="font-semibold">{stats.pending}</p>
              <p className="text-blue-700 dark:text-blue-400">Pending</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <MainFeature 
            tasks={filteredTasks} 
            addTask={addTask} 
            toggleTaskCompletion={toggleTaskCompletion} 
            deleteTask={deleteTask} 
          />
        </div>
        
        <div className="lg:col-span-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card sticky top-4"
          >
            <h3 className="text-lg font-semibold mb-4">Filters & Actions</h3>
            
            <div className="flex flex-col gap-3">
              <p className="text-surface-600 dark:text-surface-400 text-sm">Show:</p>
              <div className="flex gap-2 flex-wrap">
                <button 
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filter === 'all' 
                      ? 'bg-primary text-white' 
                      : 'bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700'
                  }`}
                  onClick={() => setFilter('all')}
                >
                  All Tasks
                </button>
                <button 
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filter === 'active' 
                      ? 'bg-primary text-white' 
                      : 'bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700'
                  }`}
                  onClick={() => setFilter('active')}
                >
                  Active
                </button>
                <button 
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filter === 'completed' 
                      ? 'bg-primary text-white' 
                      : 'bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700'
                  }`}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
                <button 
                  className="w-full py-2 px-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/40 transition-colors text-sm font-medium"
                  onClick={clearCompletedTasks}
                  disabled={!tasks.some(task => task.completed)}
                >
                  Clear Completed Tasks
                </button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-700">
              <h4 className="text-md font-medium mb-3">Theme Preference</h4>
              <div className="flex gap-3 items-center">
                <div className="flex-1 p-3 rounded-xl bg-white shadow-neu-light border border-surface-200 flex items-center justify-center">
                  <SunIcon className="w-5 h-5 text-amber-500" />
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