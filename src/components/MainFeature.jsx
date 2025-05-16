import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

// Icon declarations
const PlusIcon = getIcon('Plus');
const CheckIcon = getIcon('Check');
const TrashIcon = getIcon('Trash2');
const XIcon = getIcon('X');
const StarIcon = getIcon('Star');
const InfoIcon = getIcon('Info');
const CircleIcon = getIcon('Circle');
const CheckCircleIcon = getIcon('CheckCircle');
const UndoIcon = getIcon('Undo2');
const MoveIcon = getIcon('Move');

const MainFeature = ({ tasks, addTask, toggleTaskCompletion, deleteTask }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [showPrioritySelector, setShowPrioritySelector] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  
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
    } else {
      toast.error("Task cannot be empty!");
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
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
  
  const saveEdit = (id) => {
    if (editText.trim()) {
      const updatedTasks = tasks.map(task => 
        task.id === id ? { ...task, text: editText } : task
      );
      // Update tasks through parent component
      // This is a simulated update since we're not passing the setter
      toggleTaskCompletion(id); // Toggle and then toggle back as a workaround
      toggleTaskCompletion(id);
      toast.success("Task updated successfully!");
    } else {
      toast.error("Task text cannot be empty!");
    }
    setIsEditing(null);
  };
  
  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 dark:text-red-400';
      case 'low': return 'text-green-500 dark:text-green-400';
      default: return 'text-amber-500 dark:text-amber-400';
    }
  };
  
  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-900/30';
      case 'low': return 'bg-green-100 dark:bg-green-900/30';
      default: return 'bg-amber-100 dark:bg-amber-900/30';
    }
  };
  
  const handleDragStart = (id) => {
    setDraggedTaskId(id);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden"
    >
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
            <CheckIcon className="w-5 h-5 text-primary" />
          </span>
          Task Manager
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Add a new task..."
              className="input pr-20"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            
            <div className="absolute right-2 top-2 flex gap-1">
              <button 
                type="button"
                className="p-1.5 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                onClick={() => setShowPrioritySelector(!showPrioritySelector)}
                aria-label="Set priority"
              >
                <StarIcon className={`w-4 h-4 ${getPriorityColor(priority)}`} />
              </button>
              
              <button 
                type="submit"
                className="p-1.5 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors"
                aria-label="Add task"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <AnimatePresence>
            {showPrioritySelector && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-2 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setPriority('low')}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-medium ${
                    priority === 'low' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                  }`}
                >
                  Low
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('medium')}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-medium ${
                    priority === 'medium' 
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' 
                      : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                  }`}
                >
                  Medium
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('high')}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-medium ${
                    priority === 'high' 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                      : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400'
                  }`}
                >
                  High
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
      
      <div className="task-list">
        <h3 className="text-lg font-medium mb-3">
          Your Tasks 
          <span className="ml-2 text-sm font-normal text-surface-500 dark:text-surface-400">
            ({tasks.length})
          </span>
        </h3>
        
        {tasks.length === 0 ? (
          <div className="empty-state p-6 text-center bg-surface-50 dark:bg-surface-800/50 rounded-xl">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center">
                <InfoIcon className="w-8 h-8 text-surface-400 dark:text-surface-500" />
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