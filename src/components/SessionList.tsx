import { SessionGroup } from '@/types/session';
import { SessionCard } from './SessionCard';

interface SessionListProps {
  groups: SessionGroup[];
}

export function SessionList({ groups }: SessionListProps) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.date} className="animate-fade-in">
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">
            {group.date}
          </h2>
          <div className="space-y-3">
            {group.sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
