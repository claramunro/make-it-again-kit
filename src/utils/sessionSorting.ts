import { Session, SessionGroup } from '@/types/session';
import { SessionSortOption } from '@/components/SessionsHeader';

function parseSessionDate(dateStr: string): Date {
  // Parse dates like "Nov 4, 2025"
  return new Date(dateStr);
}

function parseDuration(durationStr: string): number {
  // Parse durations like "12 minutes", "1 minutes", "90 minutes"
  const match = durationStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

export function sortSessions(groups: SessionGroup[], sortBy: SessionSortOption): SessionGroup[] {
  // Flatten all sessions
  const allSessions = groups.flatMap(group => group.sessions);
  
  // Sort sessions based on the selected option
  const sortedSessions = [...allSessions].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return parseSessionDate(a.date).getTime() - parseSessionDate(b.date).getTime();
      case 'longest':
        return parseDuration(b.duration) - parseDuration(a.duration);
      case 'shortest':
        return parseDuration(a.duration) - parseDuration(b.duration);
      case 'starred':
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return parseSessionDate(b.date).getTime() - parseSessionDate(a.date).getTime();
      case 'most-recent':
      default:
        return parseSessionDate(b.date).getTime() - parseSessionDate(a.date).getTime();
    }
  });
  
  // Re-group by date
  const groupMap = new Map<string, Session[]>();
  
  for (const session of sortedSessions) {
    const dateKey = session.date;
    if (!groupMap.has(dateKey)) {
      groupMap.set(dateKey, []);
    }
    groupMap.get(dateKey)!.push(session);
  }
  
  // Convert map to array, maintaining order based on sort
  // For most-recent/oldest, we sort groups by date
  // For longest/shortest/starred, we use the first session's position
  const groupEntries = Array.from(groupMap.entries());
  
  if (sortBy === 'most-recent' || sortBy === 'oldest') {
    groupEntries.sort((a, b) => {
      const dateA = parseSessionDate(a[0]).getTime();
      const dateB = parseSessionDate(b[0]).getTime();
      return sortBy === 'most-recent' ? dateB - dateA : dateA - dateB;
    });
  }
  
  return groupEntries.map(([date, sessions]) => ({ date, sessions }));
}
