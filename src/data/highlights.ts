export interface Highlight {
  id: string;
  datetime: string;
  timestamp: string;
  sessionTitle: string;
  title: string;
  description: string;
}

export const highlights: Highlight[] = [
  {
    id: '1',
    datetime: 'Oct 29 7:17 PM',
    timestamp: '00:46',
    sessionTitle: 'Short Meeting with Robert Baratheon',
    title: 'Session Activation Successfully Achieved',
    description: 'The core idea is the successful activation and confirmation of a live session, marked by a moment of recognition and celebration upon achieving functional engagement, with references to a thematic or coded language (e.g., "Robert Baratheon") possibly signaling internal triggers or modes.',
  },
  {
    id: '2',
    datetime: 'Oct 29 7:16 PM',
    timestamp: '00:39',
    sessionTitle: 'Short Meeting with Robert Baratheon',
    title: 'Unclear Communication Disrupts Meeting Flow',
    description: 'During the meeting, fragmented and seemingly random language was used, potentially indicating confusion, technical difficulties, or a breakdown in clear communication, which disrupted the coherence and effectiveness of the session.',
  },
  {
    id: '3',
    datetime: 'Oct 29 7:16 PM',
    timestamp: '00:17',
    sessionTitle: 'Short Meeting with Robert Baratheon',
    title: 'Legacy Through Physical Traits',
    description: "Physical characteristics such as hair color can serve as visible markers of lineage and heritage, and discrepancies in these traits—such as Joffrey's golden hair compared to Robert's black hair—can imply breaks in expected familial inheritance, raising questions about ancestry and legitimacy.",
  },
];
