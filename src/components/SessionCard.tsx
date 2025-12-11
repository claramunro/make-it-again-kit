import { FileText, Video, ChevronRight } from 'lucide-react';
import { Session } from '@/types/session';
import { SessionBadge } from './SessionBadge';

interface SessionCardProps {
  session: Session;
}

export function SessionCard({ session }: SessionCardProps) {
  return (
    <button className="group flex w-full items-start gap-4 rounded-xl border border-border bg-card p-4 text-left transition-smooth hover:border-primary/20 hover:shadow-sm">
      {/* Icon */}
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground">
        {session.type === 'video' ? (
          <Video className="h-5 w-5" />
        ) : (
          <FileText className="h-5 w-5" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        <h3 className="text-sm font-medium leading-snug text-foreground">
          {session.title}
        </h3>
        <div className="flex items-center gap-3">
          <SessionBadge type={session.badge} />
          <span className="text-xs text-muted-foreground">
            {session.time} • {session.duration}
          </span>
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground/50 transition-smooth group-hover:text-muted-foreground" />
    </button>
  );
}
