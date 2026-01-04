export interface TopicSession {
  id: string;
  title: string;
  date: string;
  duration: string;
  type?: 'audio' | 'document';
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  sessionCount: number;
  date: string;
  description?: string;
  sharedBy?: string;
  isFavorite?: boolean;
  sessions?: TopicSession[];
  wallpaper?: 'sand' | 'peach' | 'mint' | 'lavender' | 'ocean' | 'sunset';
}

export const topics: Topic[] = [
  {
    id: '1',
    name: 'Hedy Redesign',
    icon: '🎨',
    sessionCount: 10,
    date: 'Dec 1',
    sharedBy: 'Julian',
    isFavorite: true,
    wallpaper: 'mint',
    sessions: [
      { id: 's1', title: 'Design Review: Mobile App Refresh', date: 'Oct 22', duration: '45 min', type: 'document' },
      { id: 's2', title: 'UI Component Library Planning', date: 'Oct 20', duration: '30 min', type: 'document' },
    ],
  },
  {
    id: '2',
    name: 'New',
    icon: '📦',
    sessionCount: 4,
    date: 'Nov 4',
    isFavorite: true,
    wallpaper: 'sand',
    sessions: [
      { id: 's3', title: 'Product Roadmap Planning', date: 'Nov 4', duration: '60 min', type: 'audio' },
      { id: 's4', title: 'Feature Prioritization', date: 'Nov 2', duration: '45 min', type: 'document' },
    ],
  },
  {
    id: '3',
    name: 'Product Launch',
    icon: '🚀',
    sessionCount: 8,
    date: 'Oct 10',
    description: 'Q4 product launch planning',
    isFavorite: true,
    wallpaper: 'lavender',
    sessions: [
      { id: 's12', title: 'Launch Timeline Review', date: 'Oct 10', duration: '55 min', type: 'audio' },
      { id: 's13', title: 'Marketing Coordination', date: 'Oct 8', duration: '40 min', type: 'document' },
    ],
  },
  {
    id: '4',
    name: 'Working Out',
    icon: '🏋️',
    sessionCount: 3,
    date: 'Oct 29',
    isFavorite: false,
    wallpaper: 'ocean',
    sessions: [
      { id: 's5', title: 'Morning Workout Routine', date: 'Oct 29', duration: '35 min', type: 'audio' },
      { id: 's6', title: 'Gym Equipment Review', date: 'Oct 25', duration: '20 min', type: 'document' },
    ],
  },
  {
    id: '5',
    name: 'Coffee',
    icon: '☕',
    sessionCount: 3,
    date: 'Oct 29',
    isFavorite: false,
    wallpaper: 'peach',
    sessions: [
      { id: 's7', title: 'Best Coffee Beans Discussion', date: 'Oct 29', duration: '25 min' },
      { id: 's8', title: 'Brewing Methods Comparison', date: 'Oct 27', duration: '40 min' },
    ],
  },
  {
    id: '6',
    name: 'Joey',
    icon: '🐶',
    sessionCount: 4,
    date: 'Oct 29',
    description: 'Things about lil Joe',
    isFavorite: false,
    wallpaper: 'sunset',
    sessions: [
      { id: 's9', title: 'Vet Appointment Notes', date: 'Oct 29', duration: '15 min' },
      { id: 's10', title: 'Training Progress', date: 'Oct 26', duration: '30 min' },
    ],
  },
  {
    id: '7',
    name: 'Schedule',
    icon: '📅',
    sessionCount: 1,
    date: 'Oct 14',
    description: 'Scheduling stuff',
    isFavorite: false,
    wallpaper: 'sand',
    sessions: [
      { id: 's11', title: 'Weekly Planning Session', date: 'Oct 14', duration: '20 min' },
    ],
  },
  {
    id: '8',
    name: 'Engineering',
    icon: '💻',
    sessionCount: 15,
    date: 'Oct 8',
    description: 'Technical discussions and sprint planning',
    isFavorite: false,
    wallpaper: 'ocean',
    sessions: [
      { id: 's14', title: 'Sprint Retrospective', date: 'Oct 8', duration: '45 min' },
      { id: 's15', title: 'Architecture Discussion', date: 'Oct 5', duration: '60 min' },
    ],
  },
  {
    id: '9',
    name: 'Marketing',
    icon: '📢',
    sessionCount: 6,
    date: 'Oct 5',
    description: 'Marketing campaigns and strategy',
    isFavorite: false,
    wallpaper: 'peach',
    sessions: [
      { id: 's16', title: 'Campaign Performance Review', date: 'Oct 5', duration: '35 min' },
      { id: 's17', title: 'Social Media Strategy', date: 'Oct 3', duration: '50 min' },
    ],
  },
  {
    id: '10',
    name: 'Customer Success',
    icon: '🤝',
    sessionCount: 12,
    date: 'Oct 3',
    sharedBy: 'Sarah',
    isFavorite: false,
    wallpaper: 'mint',
    sessions: [
      { id: 's18', title: 'Customer Feedback Analysis', date: 'Oct 3', duration: '40 min' },
      { id: 's19', title: 'Support Ticket Review', date: 'Oct 1', duration: '30 min' },
    ],
  },
  {
    id: '11',
    name: 'Finance',
    icon: '💰',
    sessionCount: 4,
    date: 'Oct 1',
    description: 'Budget and financial planning',
    isFavorite: false,
    wallpaper: 'sand',
    sessions: [
      { id: 's20', title: 'Q3 Budget Review', date: 'Oct 1', duration: '50 min' },
      { id: 's21', title: 'Expense Approval', date: 'Sep 28', duration: '25 min' },
    ],
  },
  {
    id: '12',
    name: 'HR & Recruiting',
    icon: '👥',
    sessionCount: 7,
    date: 'Sep 28',
    description: 'Hiring and team building',
    isFavorite: false,
    wallpaper: 'lavender',
    sessions: [
      { id: 's22', title: 'Interview Debrief', date: 'Sep 28', duration: '30 min' },
      { id: 's23', title: 'Candidate Review', date: 'Sep 25', duration: '45 min' },
    ],
  },
  {
    id: '13',
    name: 'Research',
    icon: '🔬',
    sessionCount: 5,
    date: 'Sep 25',
    description: 'User research and competitive analysis',
    isFavorite: false,
    wallpaper: 'ocean',
    sessions: [
      { id: 's24', title: 'User Interview Analysis', date: 'Sep 25', duration: '55 min' },
      { id: 's25', title: 'Competitor Deep Dive', date: 'Sep 22', duration: '40 min' },
    ],
  },
  {
    id: '14',
    name: 'Legal',
    icon: '⚖️',
    sessionCount: 2,
    date: 'Sep 20',
    description: 'Contract reviews and compliance',
    isFavorite: false,
    wallpaper: 'lavender',
    sessions: [
      { id: 's26', title: 'Contract Review', date: 'Sep 20', duration: '35 min' },
    ],
  },
  {
    id: '15',
    name: 'Team Building',
    icon: '🎉',
    sessionCount: 3,
    date: 'Sep 15',
    description: 'Team events and culture',
    isFavorite: false,
    wallpaper: 'sunset',
    sessions: [
      { id: 's27', title: 'Team Offsite Planning', date: 'Sep 15', duration: '30 min' },
      { id: 's28', title: 'Culture Survey Results', date: 'Sep 12', duration: '25 min' },
    ],
  },
];
