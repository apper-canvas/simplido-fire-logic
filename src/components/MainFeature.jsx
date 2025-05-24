import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format, addDays, addWeeks, addMonths, addYears, parseISO } from 'date-fns';

const MainFeature = ({ tasks, addTask, toggleTaskCompletion, deleteTask }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [showPrioritySelector, setShowPrioritySelector] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');
  
  // Advanced scheduling options
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceType, setRecurrenceType] = useState('daily');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [recurrenceEndType, setRecurrenceEndType] = useState('never');
  const [recurrenceEndDate, setRecurrenceEndDate] = useState('');
  const [recurrenceCount, setRecurrenceCount] = useState(1);
  const [weeklyDays, setWeeklyDays] = useState([]);
  const [monthlyType, setMonthlyType] = useState('date'); // 'date' or 'day'
  const [reminderTime, setReminderTime] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);
  
  const resetForm = () => {
    setNewTaskText('');
    setPriority('medium');
    setShowPrioritySelector(false);
    setShowAdvancedOptions(false);
    setStartDate('');
    setEndDate('');
    setIsRecurring(false);
    setRecurrenceType('daily');
    setRecurrenceInterval(1);
    setRecurrenceEndType('never');
    setRecurrenceEndDate('');
    setRecurrenceCount(1);
    setWeeklyDays([]);
    setMonthlyType('date');
    setReminderTime('');
    setDescription('');
    setCategory('general');
  };
  
  const generateRecurringTasks = (baseTask) => {
    if (!isRecurring) return [baseTask];
    
    const tasks = [];
    let currentDate = startDate ? new Date(startDate) : new Date();
    let taskCount = 0;
    const maxTasks = recurrenceEndType === 'count' ? recurrenceCount : 50; // Limit to prevent infinite loops
    const endDateLimit = recurrenceEndType === 'date' && recurrenceEndDate ? new Date(recurrenceEndDate) : null;
    
    while (taskCount < maxTasks) {
      if (endDateLimit && currentDate > endDateLimit) break;
      
      // Create task for current date
      const taskForDate = {
        ...baseTask,
        id: `${baseTask.id}_${taskCount}`,
        scheduledDate: currentDate.toISOString(),
        recurrenceInfo: {
          isRecurring: true,
          originalId: baseTask.id,
          sequence: taskCount + 1
        }
      };
      
      tasks.push(taskForDate);
      taskCount++;
      
      // Calculate next date based on recurrence type
      switch (recurrenceType) {
        case 'daily':
          currentDate = addDays(currentDate, recurrenceInterval);
          break;
        case 'weekly':
          if (weeklyDays.length > 0) {
            // For weekly with specific days, calculate next occurrence
            let nextDate = new Date(currentDate);
            let daysAdded = 0;
            let found = false;
            
            while (!found && daysAdded < 7 * recurrenceInterval) {
              nextDate = addDays(nextDate, 1);
              daysAdded++;
              if (weeklyDays.includes(nextDate.getDay())) {
                found = true;
              }
            }
            currentDate = nextDate;
          } else {
            currentDate = addWeeks(currentDate, recurrenceInterval);
          }
          break;
        case 'monthly':
          currentDate = addMonths(currentDate, recurrenceInterval);
          break;
        case 'yearly':
          currentDate = addYears(currentDate, recurrenceInterval);
          break;
        default:
          currentDate = addDays(currentDate, recurrenceInterval);
      }
      
      if (recurrenceEndType === 'never' && taskCount >= 10) break; // Limit for 'never' ending
    }
    
    return tasks;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      const baseTask = {
        id: Date.now().toString(),
        text: newTaskText,
        completed: false,
        createdAt: new Date().toISOString(),
        priority,
        startDate: startDate || null,
        endDate: endDate || null,
        reminderTime: reminderTime || null,
        description: description || null,
        category,
        isRecurring,
        recurrenceSettings: isRecurring ? {
          type: recurrenceType,
          interval: recurrenceInterval,
          endType: recurrenceEndType,
          endDate: recurrenceEndDate || null,
          count: recurrenceCount,
          weeklyDays: weeklyDays,
          monthlyType: monthlyType
        } : null
      };
      
      if (isRecurring) {
        const recurringTasks = generateRecurringTasks(baseTask);
        recurringTasks.forEach(task => addTask(task.text, task.priority, task));
        toast.success(`Created ${recurringTasks.length} recurring tasks! 🔄`);
      } else {
        addTask(newTaskText, priority, baseTask);
        toast.success("Task created successfully! 🎯");
      }
      
      resetForm();
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
              <button 
                {/* Description */}
                <div>
                  <textarea
                    placeholder="Add a description (optional)"
                    className="input resize-none"
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                {/* Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="input"
                    >
                      <option value="general">📋 General</option>
                      <option value="work">💼 Work</option>
                      <option value="personal">👤 Personal</option>
                      <option value="health">🏥 Health</option>
                      <option value="finance">💰 Finance</option>
                      <option value="learning">📚 Learning</option>
                      <option value="home">🏠 Home</option>
                      <option value="social">👥 Social</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Reminder Time
                    </label>
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
                
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800';
            />
            
            <div className="absolute right-2 top-2 flex gap-1">
              <button
                type="button"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className={`p-2 rounded-lg transition-all ${
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
          
          <AnimatePresence>
            {showAdvancedOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 border-t border-surface-200 dark:border-surface-700 pt-4"
              >
                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                      className="input"
                    />
                  </div>
                </div>
                
                {/* Recurring Task Toggle */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isRecurring}
                      onChange={(e) => setIsRecurring(e.target.checked)}
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                      Make this a recurring task
                    </span>
                  </label>
                </div>
                
                {/* Recurrence Options */}
                <AnimatePresence>
                  {isRecurring && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 bg-surface-50 dark:bg-surface-800/50 p-4 rounded-lg border border-surface-200 dark:border-surface-700"
                    >
                      {/* Recurrence Type */}
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Repeat
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={recurrenceType}
                            onChange={(e) => setRecurrenceType(e.target.value)}
                            className="input"
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                          </select>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-surface-600 dark:text-surface-400">Every</span>
                            <input
                              type="number"
                              min="1"
                              max="99"
                              value={recurrenceInterval}
                              onChange={(e) => setRecurrenceInterval(parseInt(e.target.value) || 1)}
                              className="input flex-1"
                            />
                            <span className="text-sm text-surface-600 dark:text-surface-400">
                              {recurrenceType === 'daily' ? 'day(s)' :
                               recurrenceType === 'weekly' ? 'week(s)' :
                               recurrenceType === 'monthly' ? 'month(s)' : 'year(s)'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Weekly Days Selection */}
                      {recurrenceType === 'weekly' && (
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            On these days
                          </label>
                          <div className="flex gap-1">
                            {weekDays.map(day => (
                              <button
                                key={day.value}
                                type="button"
                                onClick={() => toggleWeeklyDay(day.value)}
                                className={`px-3 py-2 text-xs rounded-lg font-medium transition-all ${
                                  weeklyDays.includes(day.value)
                                    ? 'bg-primary text-white'
                                    : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600'
                                }`}
                              >
                                {day.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Monthly Type */}
                      {recurrenceType === 'monthly' && (
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Repeat by
                          </label>
                          <div className="flex gap-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="monthlyType"
                                value="date"
                                checked={monthlyType === 'date'}
                                onChange={(e) => setMonthlyType(e.target.value)}
                                className="text-primary"
                              />
                              <span className="text-sm">Day of month</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="monthlyType"
                                value="day"
                                checked={monthlyType === 'day'}
                                onChange={(e) => setMonthlyType(e.target.value)}
                                className="text-primary"
                              />
                              <span className="text-sm">Day of week</span>
                            </label>
                          </div>
                        </div>
                      )}
                      
                      {/* Recurrence End */}
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          End repeat
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="recurrenceEnd"
                              value="never"
                              checked={recurrenceEndType === 'never'}
                              onChange={(e) => setRecurrenceEndType(e.target.value)}
                              className="text-primary"
                            />
                            <span className="text-sm">Never</span>
                          </label>
                          
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="recurrenceEnd"
                              value="date"
                              checked={recurrenceEndType === 'date'}
                              onChange={(e) => setRecurrenceEndType(e.target.value)}
                              className="text-primary"
                            />
                            <span className="text-sm">On date</span>
                            <input
                              type="date"
                              value={recurrenceEndDate}
                              onChange={(e) => setRecurrenceEndDate(e.target.value)}
                              disabled={recurrenceEndType !== 'date'}
                              className="input text-sm"
                              min={startDate || new Date().toISOString().split('T')[0]}
                            />
                          </label>
                          
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="recurrenceEnd"
                              value="count"
                              checked={recurrenceEndType === 'count'}
                              onChange={(e) => setRecurrenceEndType(e.target.value)}
                              className="text-primary"
                            />
                            <span className="text-sm">After</span>
                            <input
                              type="number"
                              min="1"
                              max="365"
                              value={recurrenceCount}
                              onChange={(e) => setRecurrenceCount(parseInt(e.target.value) || 1)}
                              disabled={recurrenceEndType !== 'count'}
                              className="input text-sm w-20"
                            />
                            <span className="text-sm">occurrences</span>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
                {/* Description */}
                <div>
                  <textarea
                    placeholder="Add a description (optional)"
                    className="input resize-none"
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                {/* Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="input"
                    >
                      <option value="general">📋 General</option>
                      <option value="work">💼 Work</option>
                      <option value="personal">👤 Personal</option>
                      <option value="health">🏥 Health</option>
                      <option value="finance">💰 Finance</option>
                      <option value="learning">📚 Learning</option>
                      <option value="home">🏠 Home</option>
                      <option value="social">👥 Social</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Reminder Time
                    </label>
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
                
          </AnimatePresence>
          
          <AnimatePresence>
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
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn btn-primary"
          >
            {isRecurring ? 'Create Recurring Tasks' : 'Add Task'}
          </button>
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
                        