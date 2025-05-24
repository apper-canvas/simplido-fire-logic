import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format, subDays, subWeeks, subMonths, subYears, startOfDay, endOfDay, isWithinInterval, parseISO } from 'date-fns';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [selectedMetric, setSelectedMetric] = useState('completed');
  const [isLoading, setIsLoading] = useState(true);
  
  // Generate comprehensive sample data
  const generateSampleData = () => {
    const now = new Date();
    const data = [];
    
    // Generate 365 days of historical data
    for (let i = 365; i >= 0; i--) {
      const date = subDays(now, i);
      const dayOfWeek = date.getDay();
      
      // Simulate realistic patterns - higher activity on weekdays
      const baseActivity = dayOfWeek === 0 || dayOfWeek === 6 ? 2 : 5;
      const randomVariation = Math.random() * 3;
      
      const newTasks = Math.max(0, Math.floor(baseActivity + randomVariation));
      const completedTasks = Math.max(0, Math.floor(newTasks * (0.6 + Math.random() * 0.3)));
      
      data.push({
        date: format(date, 'yyyy-MM-dd'),
        newTasks,
        completedTasks,
        pendingTasks: Math.max(0, newTasks - completedTasks),
        totalTasks: newTasks,
        completionRate: newTasks > 0 ? Math.round((completedTasks / newTasks) * 100) : 0
      });
    }
    
    return data;
  };
  
  const [sampleData] = useState(() => generateSampleData());
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Dashboard data loaded successfully! 📊");
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate current period data
  const currentPeriodData = useMemo(() => {
    const now = new Date();
    let startDate;
    
    switch (selectedPeriod) {
      case 'day':
        startDate = startOfDay(now);
        break;
      case 'week':
        startDate = subWeeks(now, 1);
        break;
      case 'month':
        startDate = subMonths(now, 1);
        break;
      case 'year':
        startDate = subYears(now, 1);
        break;
      default:
        startDate = startOfDay(now);
    }
    
    const filteredData = sampleData.filter(item => {
      const itemDate = parseISO(item.date);
      return isWithinInterval(itemDate, { start: startDate, end: now });
    });
    
    return filteredData.reduce((acc, item) => ({
      newTasks: acc.newTasks + item.newTasks,
      completedTasks: acc.completedTasks + item.completedTasks,
      pendingTasks: acc.pendingTasks + item.pendingTasks,
      totalTasks: acc.totalTasks + item.totalTasks,
      avgCompletionRate: filteredData.length > 0 ? 
        Math.round(filteredData.reduce((sum, d) => sum + d.completionRate, 0) / filteredData.length) : 0
    }), { newTasks: 0, completedTasks: 0, pendingTasks: 0, totalTasks: 0, avgCompletionRate: 0 });
  }, [sampleData, selectedPeriod]);
  
  // Calculate previous period data for comparison
  const previousPeriodData = useMemo(() => {
    const now = new Date();
    let currentStart, previousStart, previousEnd;
    
    switch (selectedPeriod) {
      case 'day':
        currentStart = startOfDay(now);
        previousStart = subDays(currentStart, 1);
        previousEnd = subDays(now, 1);
        break;
      case 'week':
        currentStart = subWeeks(now, 1);
        previousStart = subWeeks(currentStart, 1);
        previousEnd = currentStart;
        break;
      case 'month':
        currentStart = subMonths(now, 1);
        previousStart = subMonths(currentStart, 1);
        previousEnd = currentStart;
        break;
      case 'year':
        currentStart = subYears(now, 1);
        previousStart = subYears(currentStart, 1);
        previousEnd = currentStart;
        break;
      default:
        currentStart = startOfDay(now);
        previousStart = subDays(currentStart, 1);
        previousEnd = subDays(now, 1);
    }
    
    const filteredData = sampleData.filter(item => {
      const itemDate = parseISO(item.date);
      return isWithinInterval(itemDate, { start: previousStart, end: previousEnd });
    });
    
    return filteredData.reduce((acc, item) => ({
      newTasks: acc.newTasks + item.newTasks,
      completedTasks: acc.completedTasks + item.completedTasks,
      pendingTasks: acc.pendingTasks + item.pendingTasks,
      totalTasks: acc.totalTasks + item.totalTasks,
      avgCompletionRate: filteredData.length > 0 ? 
        Math.round(filteredData.reduce((sum, d) => sum + d.completionRate, 0) / filteredData.length) : 0
    }), { newTasks: 0, completedTasks: 0, pendingTasks: 0, totalTasks: 0, avgCompletionRate: 0 });
  }, [sampleData, selectedPeriod]);
  
  // Calculate trends
  const calculateTrend = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };
  
  const trends = {
    newTasks: calculateTrend(currentPeriodData.newTasks, previousPeriodData.newTasks),
    completedTasks: calculateTrend(currentPeriodData.completedTasks, previousPeriodData.completedTasks),
    pendingTasks: calculateTrend(currentPeriodData.pendingTasks, previousPeriodData.pendingTasks),
    completionRate: calculateTrend(currentPeriodData.avgCompletionRate, previousPeriodData.avgCompletionRate)
  };
  
  // Get chart data for visualization
  const getChartData = () => {
    const now = new Date();
    let startDate, dataPoints;
    
    switch (selectedPeriod) {
      case 'day':
        startDate = subDays(now, 7);
        dataPoints = 7;
        break;
      case 'week':
        startDate = subWeeks(now, 8);
        dataPoints = 8;
        break;
      case 'month':
        startDate = subMonths(now, 12);
        dataPoints = 12;
        break;
      case 'year':
        startDate = subYears(now, 5);
        dataPoints = 5;
        break;
      default:
        startDate = subDays(now, 7);
        dataPoints = 7;
    }
    
    const chartData = [];
    for (let i = dataPoints - 1; i >= 0; i--) {
      let date;
      switch (selectedPeriod) {
        case 'day':
          date = subDays(now, i);
          break;
        case 'week':
          date = subWeeks(now, i);
          break;
        case 'month':
          date = subMonths(now, i);
          break;
        case 'year':
          date = subYears(now, i);
          break;
        default:
          date = subDays(now, i);
      }
      
      const periodData = sampleData.filter(item => {
        const itemDate = parseISO(item.date);
        let periodStart, periodEnd;
        
        switch (selectedPeriod) {
          case 'day':
            periodStart = startOfDay(date);
            periodEnd = endOfDay(date);
            break;
          case 'week':
            periodStart = subDays(date, 7);
            periodEnd = date;
            break;
          case 'month':
            periodStart = subMonths(date, 1);
            periodEnd = date;
            break;
          case 'year':
            periodStart = subYears(date, 1);
            periodEnd = date;
            break;
          default:
            periodStart = startOfDay(date);
            periodEnd = endOfDay(date);
        }
        
        return isWithinInterval(itemDate, { start: periodStart, end: periodEnd });
      });
      
      const aggregated = periodData.reduce((acc, item) => ({
        newTasks: acc.newTasks + item.newTasks,
        completedTasks: acc.completedTasks + item.completedTasks,
        pendingTasks: acc.pendingTasks + item.pendingTasks
      }), { newTasks: 0, completedTasks: 0, pendingTasks: 0 });
      
      chartData.push({
        label: format(date, selectedPeriod === 'day' ? 'MMM dd' : selectedPeriod === 'week' ? 'MMM dd' : selectedPeriod === 'month' ? 'MMM yyyy' : 'yyyy'),
        ...aggregated
      });
    }
    
    return chartData;
  };
  
  const chartData = getChartData();
  const maxValue = Math.max(...chartData.map(d => Math.max(d.newTasks, d.completedTasks, d.pendingTasks)));
  
  const periodLabels = {
    day: 'Today vs Yesterday',
    week: 'This Week vs Last Week',
    month: 'This Month vs Last Month',
    year: 'This Year vs Last Year'
  };
  
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    toast.info(`Switched to ${period} view 📅`);
  };
  
  const handleMetricChange = (metric) => {
    setSelectedMetric(metric);
    toast.info(`Viewing ${metric} tasks trend 📈`);
  };
  
  const handleExportData = () => {
    const exportData = {
      period: selectedPeriod,
      currentPeriod: currentPeriodData,
      previousPeriod: previousPeriodData,
      trends,
      chartData,
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-export-${format(new Date(), 'yyyy-MM-dd')}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("Dashboard data exported successfully! 📄");
  };
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
          />
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">Analytics Dashboard</span>
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-400">
            Track your productivity trends and insights
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleExportData}
            className="btn btn-secondary flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Data
          </button>
        </div>
      </motion.div>
      
      {/* Period Filter */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Time Period
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {['day', 'week', 'month', 'year'].map((period) => (
            <motion.button
              key={period}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePeriodChange(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                  : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </motion.button>
          ))}
        </div>
        
        <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
          Comparing: {periodLabels[selectedPeriod]}
        </p>
      </motion.div>
      
      {/* Key Metrics */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          {
            label: 'New Tasks',
            value: currentPeriodData.newTasks,
            trend: trends.newTasks,
            icon: '📝',
            color: 'blue',
            key: 'newTasks'
          },
          {
            label: 'Completed Tasks',
            value: currentPeriodData.completedTasks,
            trend: trends.completedTasks,
            icon: '✅',
            color: 'green',
            key: 'completedTasks'
          },
          {
            label: 'Pending Tasks',
            value: currentPeriodData.pendingTasks,
            trend: trends.pendingTasks,
            icon: '⏳',
            color: 'amber',
            key: 'pendingTasks'
          },
          {
            label: 'Completion Rate',
            value: `${currentPeriodData.avgCompletionRate}%`,
            trend: trends.completionRate,
            icon: '📊',
            color: 'purple',
            key: 'completionRate'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.key}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`stat-card bg-gradient-to-br from-${metric.color}-500/10 to-${metric.color}-600/10 dark:from-${metric.color}-500/20 dark:to-${metric.color}-600/20 border border-${metric.color}-500/20 cursor-pointer`}
            onClick={() => handleMetricChange(metric.key)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 bg-${metric.color}-500/20 rounded-xl flex items-center justify-center text-xl`}>
                {metric.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                metric.trend > 0 ? 'text-green-600 dark:text-green-400' : 
                metric.trend < 0 ? 'text-red-600 dark:text-red-400' : 
                'text-surface-500'
              }`}>
                {metric.trend > 0 ? '↗️' : metric.trend < 0 ? '↘️' : '➡️'}
                {Math.abs(metric.trend)}%
              </div>
            </div>
            
            <div>
              <p className={`text-3xl font-bold text-${metric.color}-600 dark:text-${metric.color}-400 mb-1`}>
                {metric.value}
              </p>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                {metric.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Chart Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Task Trends Over Time
          </h3>
          
          <div className="flex gap-2 mt-2 md:mt-0">
            {['newTasks', 'completedTasks', 'pendingTasks'].map((metric) => (
              <button
                key={metric}
                onClick={() => handleMetricChange(metric)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedMetric === metric
                    ? 'bg-primary text-white'
                    : 'bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
              >
                {metric === 'newTasks' ? 'New' : metric === 'completedTasks' ? 'Completed' : 'Pending'}
              </button>
            ))}
          </div>
        </div>
        
        {/* Simple Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-2 p-4 bg-surface-50/50 dark:bg-surface-800/50 rounded-lg">
          <AnimatePresence>
            {chartData.map((item, index) => (
              <motion.div
                key={`${item.label}-${selectedMetric}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: `${maxValue > 0 ? (item[selectedMetric] / maxValue) * 100 : 0}%`,
                  opacity: 1 
                }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-primary/80 to-primary/60 rounded-t-md min-h-[8px] relative group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-900 dark:bg-surface-100 text-white dark:text-surface-900 text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none z-10">
                  {item[selectedMetric]} tasks
                </div>
                
                {/* Label */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-surface-600 dark:text-surface-400 rotate-45 origin-left whitespace-nowrap">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="mt-8 pt-4 border-t border-surface-200 dark:border-surface-700">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-surface-600 dark:text-surface-400">New Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-surface-600 dark:text-surface-400">Completed Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-surface-600 dark:text-surface-400">Pending Tasks</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Insights Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Key Insights
          </h3>
          
          <div className="space-y-4">
            {[
              {
                icon: '🎯',
                title: 'Completion Rate',
                description: `Your current completion rate is ${currentPeriodData.avgCompletionRate}%, ${trends.completionRate > 0 ? 'up' : 'down'} ${Math.abs(trends.completionRate)}% from last ${selectedPeriod}`
              },
              {
                icon: '📈',
                title: 'Productivity Trend',
                description: `You completed ${currentPeriodData.completedTasks} tasks this ${selectedPeriod}, ${trends.completedTasks > 0 ? 'an increase' : 'a decrease'} of ${Math.abs(trends.completedTasks)}%`
              },
              {
                icon: '⚡',
                title: 'Activity Level',
                description: `You created ${currentPeriodData.newTasks} new tasks this ${selectedPeriod}, showing ${trends.newTasks > 0 ? 'increased' : 'decreased'} activity`
              }
            ].map((insight, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex gap-3 p-3 bg-surface-50/50 dark:bg-surface-800/50 rounded-lg"
              >
                <div className="text-2xl">{insight.icon}</div>
                <div>
                  <h4 className="font-medium text-surface-900 dark:text-surface-100 mb-1">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    {insight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="glass-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Quick Stats
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Best Day', value: 'Monday', icon: '🌟' },
              { label: 'Avg Daily Tasks', value: Math.round(currentPeriodData.totalTasks / (selectedPeriod === 'day' ? 1 : selectedPeriod === 'week' ? 7 : selectedPeriod === 'month' ? 30 : 365)), icon: '📊' },
              { label: 'Streak Days', value: '12', icon: '🔥' },
              { label: 'Total This Year', value: sampleData.reduce((sum, item) => sum + item.completedTasks, 0), icon: '🏆' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center p-3 bg-surface-50/50 dark:bg-surface-800/50 rounded-lg"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-surface-600 dark:text-surface-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;