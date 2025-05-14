// components/notes/mockNotes.ts

const mockNotes = [
    {
      id: '1',
      title: 'Project Meeting',
      content: 'Discuss development timeline and resource allocation',
      checklist: [
        { id: '1a', text: 'Prepare slides', completed: true },
        { id: '1b', text: 'Book room', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Shopping List',
      content: 'Weekly groceries and essentials',
      checklist: [
        { id: '2a', text: 'Milk', completed: false },
        { id: '2b', text: 'Eggs', completed: true }
      ]
    }
  ];
  
  // ✅ THIS is important
  export default mockNotes;
  