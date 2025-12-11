export interface Topic {
  id: string;
  name: string;
  icon: string;
  sessionCount: number;
  date: string;
  description?: string;
  sharedBy?: string;
}

export const topics: Topic[] = [
  {
    id: '1',
    name: 'Hedy Redesign',
    icon: '🎨',
    sessionCount: 10,
    date: 'Dec 1',
    sharedBy: 'Julian',
  },
  {
    id: '2',
    name: 'New',
    icon: '📦',
    sessionCount: 4,
    date: 'Nov 4',
  },
  {
    id: '3',
    name: 'Working Out',
    icon: '🏋️',
    sessionCount: 3,
    date: 'Oct 29',
  },
  {
    id: '4',
    name: 'Coffee',
    icon: '☕',
    sessionCount: 3,
    date: 'Oct 29',
  },
  {
    id: '5',
    name: 'Joey',
    icon: '🐶',
    sessionCount: 4,
    date: 'Oct 29',
    description: 'Things about lil Joe',
  },
  {
    id: '6',
    name: 'Schedule',
    icon: '📅',
    sessionCount: 1,
    date: 'Oct 14',
    description: 'Scheduling stuff',
  },
  {
    id: '7',
    name: 'Product Launch',
    icon: '🚀',
    sessionCount: 8,
    date: 'Oct 10',
    description: 'Q4 product launch planning',
  },
  {
    id: '8',
    name: 'Engineering',
    icon: '💻',
    sessionCount: 15,
    date: 'Oct 8',
    description: 'Technical discussions and sprint planning',
  },
  {
    id: '9',
    name: 'Marketing',
    icon: '📢',
    sessionCount: 6,
    date: 'Oct 5',
    description: 'Marketing campaigns and strategy',
  },
  {
    id: '10',
    name: 'Customer Success',
    icon: '🤝',
    sessionCount: 12,
    date: 'Oct 3',
    sharedBy: 'Sarah',
  },
  {
    id: '11',
    name: 'Finance',
    icon: '💰',
    sessionCount: 4,
    date: 'Oct 1',
    description: 'Budget and financial planning',
  },
  {
    id: '12',
    name: 'HR & Recruiting',
    icon: '👥',
    sessionCount: 7,
    date: 'Sep 28',
    description: 'Hiring and team building',
  },
  {
    id: '13',
    name: 'Research',
    icon: '🔬',
    sessionCount: 5,
    date: 'Sep 25',
    description: 'User research and competitive analysis',
  },
  {
    id: '14',
    name: 'Legal',
    icon: '⚖️',
    sessionCount: 2,
    date: 'Sep 20',
    description: 'Contract reviews and compliance',
  },
  {
    id: '15',
    name: 'Team Building',
    icon: '🎉',
    sessionCount: 3,
    date: 'Sep 15',
    description: 'Team events and culture',
  },
];
