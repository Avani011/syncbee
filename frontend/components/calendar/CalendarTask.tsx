// components/calendar/CalendarTask.tsx
export default function CalendarTask({ task, onClose }) {
    // Get priority color
    const getPriorityColor = (priority) => {
      const colors = {
        high: '#ef4444',
        medium: '#f59e0b',
        low: '#10b981'
      };
      return colors[priority] || colors.medium;
    };
  
    // Get category icon
    const getCategoryIcon = (category) => {
      const icons = {
        work: '💼',
        personal: '🏠',
        other: '📌'
      };
      return icons[category] || icons.other;
    };
  
    return (
      <div className="fixed inset-0 bg-[#d9d9d9]/80 backdrop-blur-xs flex items-center justify-center z-50" onClick={onClose}>
        <div 
          className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4" style={{ backgroundColor: `${getPriorityColor(task.priority)}20` }}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center mb-3">
              <span 
                className="inline-block w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              ></span>
              <span className="text-sm text-gray-600">{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="mr-1">{getCategoryIcon(task.category)}</span>
              <span className="text-sm text-gray-600">{task.category.charAt(0).toUpperCase() + task.category.slice(1)}</span>
            </div>
            
            <div className="text-sm text-gray-600 mb-4">
              Time: {task.time}
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button 
                className="px-4 py-2 bg-red-600 border border-gray-300 rounded-md text-sm font-medium text-white hover:bg-gray-50"
                onClick={onClose}
              >
                Delete
              </button>
              <button 
                className="px-4 py-2 bg-green-600 rounded-md text-sm font-medium text-white hover:bg-green-700"
              >
                Mark Complete
              </button>
              <button 
                className="px-4 py-2 bg-purple-600 rounded-md text-sm font-medium text-white hover:bg-purple-700"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }