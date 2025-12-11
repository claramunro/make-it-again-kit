export type BadgeType = 'new' | 'coffee' | 'workout' | null;

export interface Session {
  id: string;
  title: string;
  badge: BadgeType;
  time: string;
  duration: string;
  date: string;
  type: 'video' | 'document';
}

export interface SessionGroup {
  date: string;
  sessions: Session[];
}
