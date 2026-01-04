import { useState } from 'react';
import { FileText, Video, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Session } from '@/types/session';
import { SessionBadge } from './SessionBadge';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';

interface SessionCardProps {
  session: Session;
  onToggleFavorite?: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  selectionMode?: boolean;
  isChecked?: boolean;
  onCheckChange?: (id: string, checked: boolean) => void;
}

export function SessionCard({ 
  session, 
  onToggleFavorite, 
  isSelected, 
  onSelect,
  selectionMode,
  isChecked,
  onCheckChange
}: SessionCardProps) {
  const [isFavorite, setIsFavorite] = useState(session.isFavorite || false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(session.id);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (selectionMode) {
      e.preventDefault();
      onCheckChange?.(session.id, !isChecked);
    } else if (onSelect) {
      e.preventDefault();
      onSelect(session.id);
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    onCheckChange?.(session.id, checked);
  };

  // Session id "2" goes to the legacy view
  const sessionUrl = session.id === '2' ? `/session-legacy/${session.id}` : `/session/${session.id}`;

  return (
    <Link 
      to={selectionMode ? '#' : (onSelect ? '#' : sessionUrl)}
      onClick={handleClick}
      className={cn(
        "group flex w-full items-start gap-4 rounded-xl border border-border bg-card p-4 text-left transition-smooth hover:border-primary/20 hover:shadow-sm",
        isSelected && !selectionMode && "border-primary bg-primary/[0.03]",
        isChecked && selectionMode && "border-primary bg-primary/[0.03]"
      )}
    >
      {/* Checkbox or Icon */}
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center">
        {selectionMode ? (
          <Checkbox 
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
            onClick={(e) => e.stopPropagation()}
            className="h-5 w-5 border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
        ) : (
          <div className="text-muted-foreground">
            {session.type === 'video' ? (
              <Video className="h-5 w-5" />
            ) : (
              <FileText className="h-5 w-5" />
            )}
          </div>
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
            Time: {session.time}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          Duration: {session.duration}
        </div>
      </div>

      {/* Star Button - only show when not in selection mode */}
      {!selectionMode && (
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
      )}

      {/* Arrow - only show when not in selection mode */}
      {!selectionMode && (
        <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground/50 transition-smooth group-hover:text-muted-foreground" />
      )}
    </Link>
  );
}
