// components/calendar/CalendarFilter.tsx
export default function CalendarFilter({
    selectedCategories,
    selectedPriorities,
    onCategoryChange,
    onPriorityChange
  }) {
    // Category filters
    const categories = [
      { id: 'work', name: 'Work', icon: '💼' },
      { id: 'personal', name: 'Personal', icon: '🏠' },
      { id: 'other', name: 'Other', icon: '📌' }
    ];
  
    // Priority filters
    const priorities = [
      { id: 'high', name: 'High', color: '#ef4444' },
      { id: 'medium', name: 'Medium', color: '#f59e0b' },
      { id: 'low', name: 'Low', color: '#10b981' }
    ];
  
    // Toggle category filter
    const toggleCategory = (categoryId) => {
      if (selectedCategories.includes(categoryId)) {
        onCategoryChange(selectedCategories.filter(id => id !== categoryId));
      } else {
        onCategoryChange([...selectedCategories, categoryId]);
      }
    };
  
    // Toggle priority filter
    const togglePriority = (priorityId) => {
      if (selectedPriorities.includes(priorityId)) {
        onPriorityChange(selectedPriorities.filter(id => id !== priorityId));
      } else {
        onPriorityChange([...selectedPriorities, priorityId]);
      }
    };
  
    return (
      <div className="shadow-md rounded-lg p-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
          <div className="space-y-1">
            {categories.map(category => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor={`category-${category.id}`} className="ml-2 flex items-center text-sm">
                  <span className="mr-1">{category.icon}</span>
                  <span>{category.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
  
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Priority</h3>
          <div className="space-y-1">
            {priorities.map(priority => (
              <div key={priority.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`priority-${priority.id}`}
                  checked={selectedPriorities.includes(priority.id)}
                  onChange={() => togglePriority(priority.id)}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor={`priority-${priority.id}`} className="ml-2 flex items-center text-sm">
                  <span 
                    className="h-3 w-3 rounded-full mr-1" 
                    style={{ backgroundColor: priority.color }}
                  ></span>
                  <span>{priority.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
  
        <button 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          + Add Task
        </button>
      </div>
    );
  }