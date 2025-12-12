import { useState } from 'react';
import { FileText, Video, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Session } from '@/types/session';
import { SessionBadge } from './SessionBadge';
import { cn } from '@/lib/utils';

interface SessionCardProps {
  session: Session;
  onToggleFavorite?: (id: string) => void;
}

export function SessionCard({ session, onToggleFavorite }: SessionCardProps) {
  const [isFavorite, setIsFavorite] = useState(session.isFavorite || false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(session.id);
  };

  // Session id "2" goes to the legacy view
  const sessionUrl = session.id === '2' ? `/session-legacy/${session.id}` : `/session/${session.id}`;

  return (
    <Link 
      to={sessionUrl}
      className="group flex w-full items-start gap-4 rounded-xl border border-border bg-card p-4 text-left transition-smooth hover:border-primary/20 hover:shadow-sm"
    >
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

      {/* Star Button */}
      <button
        onClick={handleToggleFavorite}
        className="mt-1 shrink-0 p-1 rounded-md transition-smooth hover:bg-muted"
      >
        <Star 
          className={cn(
            "h-4 w-4 transition-colors",
            isFavorite 
              ? "fill-yellow-400 text-yellow-400" 
              : "text-muted-foreground/50 group-hover:text-muted-foreground"
          )} 
        />
      </button>

      {/* Arrow */}
      <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground/50 transition-smooth group-hover:text-muted-foreground" />
    </Link>
  );
}
