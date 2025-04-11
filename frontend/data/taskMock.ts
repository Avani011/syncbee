export const mockTasks = [
  {
    id: '1',
    title: 'Design UI',
    description: 'Create wireframe for the dashboard.',
    priority: 'High',
    type: 'work',
    bgColor: 'bg-purple-400/10',
    subtasks: [
      { id: 's1', title: 'Create Figma mockup', isComplete: true },
      { id: 's2', title: 'Get review from team', isComplete: false }
    ]
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Pick up items from the store.',
    priority: 'Low',
    type: 'personal',
    bgColor: 'bg-green-400/10',
    subtasks: []
  }
];
