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
];
