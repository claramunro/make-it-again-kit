export type BadgeType = 'new' | 'coffee' | 'workout' | null;

export type WallpaperType = 'sand' | 'peach' | 'mint' | 'lavender' | 'ocean' | 'sunset';

export interface TopicBadgeInfo {
  icon: string;
  label: string;
  wallpaper?: WallpaperType;
}

export interface Session {
  id: string;
  title: string;
  badge: BadgeType;
  time: string;
  duration: string;
  date: string;
  type: 'video' | 'document';
  isFavorite?: boolean;
  topicId?: string;
  topicBadge?: TopicBadgeInfo;
}

export interface SessionGroup {
  date: string;
  sessions: Session[];
}
