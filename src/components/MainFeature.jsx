import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const MainFeature = ({ tasks, addTask, toggleTaskCompletion, deleteTask }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [showPrioritySelector, setShowPrioritySelector] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');
  
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask(newTaskText, priority);
      setNewTaskText('');
      setPriority('medium');
      setShowPrioritySelector(false);
      inputRef.current?.focus();
    }
  };
  
  const startEditing = (task) => {
    setIsEditing(task.id);
    setEditText(task.text);
  };
  
  const cancelEditing = () => {
    setIsEditing(null);
    setEditText('');
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-amber-600 dark:text-amber-400';
    }
  };
  
  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'low': return 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default: return 'bg-amber-100 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Task Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Task
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="What needs to be done?"
              className="input pr-24"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />
            
            <div className="absolute right-2 top-2 flex gap-1">
              <button 
                type="button"
                onClick={() => setShowPrioritySelector(!showPrioritySelector)}
                className={`p-2 rounded-lg transition-all ${
                  showPrioritySelector 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
              >
                <svg className={`w-4 h-4 ${getPriorityColor(priority)}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
              
              <button 
                type="submit"
                className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white hover:shadow-md transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          
          <AnimatePresence>
            {showPrioritySelector && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-3 gap-2 overflow-hidden"
              >
                {[
                  { value: 'low', label: 'Low', color: 'green' },
                  { value: 'medium', label: 'Medium', color: 'amber' },
                  { value: 'high', label: 'High', color: 'red' }
                ].map(({ value, label, color }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPriority(value)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      priority === value 
                        ? `bg-${color}-100 dark:bg-${color}-900/20 text-${color}-700 dark:text-${color}-400 ring-2 ring-${color}-500/30` 
                        : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {label}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
      
      {/* Tasks List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Tasks
          </h3>
          <span className="text-sm text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-700 px-3 py-1 rounded-full">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>
        
        {tasks.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-surface-700 dark:text-surface-300 mb-2">No tasks yet</h4>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Add your first task to get started!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative rounded-xl border transition-all ${
                    task.completed
                      ? 'bg-surface-50 dark:bg-surface-800/50 border-surface-200 dark:border-surface-700'
                      : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 hover:border-primary/30 hover:shadow-sm'
                  }`}
                >
                  <div className={`priority-indicator ${
                    task.priority === 'high' ? 'priority-high' : 
                    task.priority === 'low' ? 'priority-low' : 'priority-medium'
                  }`} />
                  
                  <div className="flex items-center p-4">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="mr-4 flex-shrink-0"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {task.completed ? (
                          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-surface-400 hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                          </svg>
                        )}
                      </motion.div>
                    </button>
                    
                    {isEditing === task.id ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          ref={editInputRef}
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 px-3 py-1 rounded-lg border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && editText.trim()) {
                              // Save edit logic here
                              cancelEditing();
                            } else if (e.key === 'Escape') {
                              cancelEditing();
                            }
                          }}
                        />
                        <button
                          onClick={cancelEditing}
                          className="p-1 text-surface-500 hover:text-surface-700"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p 
                            className={`flex-1 ${
                              task.completed 
                                ? 'line-through text-surface-500 dark:text-surface-400' 
                                : 'text-surface-900 dark:text-surface-100'
                            }`}
                            onDoubleClick={() => !task.completed && startEditing(task)}
                          >
                            {task.text}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityBg(task.priority)} ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                          {format(new Date(task.createdAt), 'MMM d, yyyy • h:mm a')}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!task.completed && !isEditing && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => startEditing(task)}
                          className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                        >
                          <svg className="w-4 h-4 text-surface-600 dark:text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </motion.button>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteTask(task.id)}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors group/delete"
                      >
                        <svg className="w-4 h-4 text-surface-600 dark:text-surface-400 group-hover/delete:text-red-600 dark:group-hover/delete:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MainFeature;
              </div>
            </div>
            <h4 className="text-lg font-medium mb-2">No tasks yet</h4>
            <p className="text-surface-600 dark:text-surface-400 text-sm">
              Add your first task using the form above
            </p>
          </div>
        ) : (
          <div
            className="space-y-2 mt-2"
            onDragOver={handleDragOver}
          >
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  layoutId={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`group relative task-item rounded-xl border ${
                    task.completed
                      ? 'border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50'
                      : 'border-surface-200 dark:border-surface-700 hover:border-primary/30 dark:hover:border-primary/30'
                  }`}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                >
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-100 transition-opacity">
                    <MoveIcon className="w-4 h-4 text-surface-400 cursor-move" />
                  </div>
                  
                  <div className={`absolute h-full w-1 left-0 top-0 rounded-l-xl ${getPriorityBg(task.priority)}`}></div>
                  
                  <div className="flex items-center ml-6 flex-1">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="mr-3 focus:outline-none"
                      aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {task.completed ? (
                        <CheckCircleIcon className="w-5 h-5 text-primary" />
                      ) : (
                        <CircleIcon className="w-5 h-5 text-surface-400 dark:text-surface-500" />
                      )}
                    </button>
                    
                    {isEditing === task.id ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          ref={editInputRef}
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="input"
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                        />
                        <div className="flex gap-1">
                          <button
                            onClick={() => saveEdit(task.id)}
                            className="p-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-500"
                            aria-label="Save"
                          >
                            <CheckIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-500"
                            aria-label="Cancel"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p 
                            className={`flex-1 ${
                              task.completed 
                                ? 'line-through text-surface-400 dark:text-surface-500' 
                                : ''
                            }`}
                            onDoubleClick={() => !task.completed && startEditing(task)}
                          >
                            {task.text}
                          </p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityBg(task.priority)} ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="text-xs text-surface-400 dark:text-surface-500 mt-1">
                          {format(new Date(task.createdAt), 'MMM d, yyyy')}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="task-actions flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {task.completed ? (
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
                        aria-label="Mark as incomplete"
                      >
                        <UndoIcon className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => startEditing(task)}
                        className="p-1.5 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                        aria-label="Edit task"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                        </svg>
                      </button>
                    )}
                    
                    <button
                      onClick={() => confirmDelete(task.id)}
                      className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 dark:hover:bg-red-800/40 transition-colors"
                      aria-label="Delete task"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MainFeature;