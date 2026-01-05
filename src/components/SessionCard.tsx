import { useState } from 'react';
import { FileText, AudioLines, ChevronRight, Star, FolderOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Session, TopicBadgeInfo } from '@/types/session';
import { SessionBadge } from './SessionBadge';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';

// Max characters for title display (balanced 2-line wrap)
const MAX_TITLE_LENGTH = 85;

// Empty state badge component for sessions without topics
const EmptyTopicBadge = () => (
  <div
    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap border cursor-pointer hover:bg-[hsl(0,0%,92%)] transition-colors"
    style={{
      backgroundColor: 'hsl(0, 0%, 96%)',
      color: 'hsl(0, 0%, 55%)',
      borderColor: 'hsl(0, 0%, 88%)',
    }}
  >
    <FolderOpen className="h-3.5 w-3.5" />
    <span>Select topic</span>
  </div>
);

interface SessionCardProps {
  session: Session;
  onToggleFavorite?: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  selectionMode?: boolean;
  isChecked?: boolean;
  onCheckChange?: (id: string, checked: boolean) => void;
  topicBadge?: TopicBadgeInfo;
  onSelectTopic?: (sessionId: string) => void;
}

export function SessionCard({ 
  session, 
  onToggleFavorite, 
  isSelected, 
  onSelect,
  selectionMode,
  isChecked,
  onCheckChange,
  topicBadge,
  onSelectTopic
}: SessionCardProps) {
  const navigate = useNavigate();
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

  const handleBadgeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (effectiveTopicBadge) {
      // Navigate to topic page if topic is assigned
      const topicId = session.topicId;
      if (topicId) {
        navigate(`/topic/${topicId}`);
      }
    } else {
      // Open topic selection dialog
      onSelectTopic?.(session.id);
    }
  };

  const sessionUrl = `/session/${session.id}`;

  // Use topicBadge prop, fall back to session.topicBadge, then use session.badge
  const effectiveTopicBadge = topicBadge || session.topicBadge;

  // Truncate title for balanced 2-line display
  const displayTitle = session.title.length > MAX_TITLE_LENGTH 
    ? session.title.slice(0, MAX_TITLE_LENGTH).trim()
    : session.title;

  const cardContent = (
    <>
      {/* Checkbox (only in selection mode) */}
      {selectionMode && (
        <div className="mt-0.5 flex shrink-0 items-center justify-center">
          <Checkbox 
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Type Icon */}
      <div className="mt-0.5 shrink-0 text-muted-foreground">
        {session.type === 'audio' ? (
          <AudioLines className="h-5 w-5" />
        ) : (
          <FileText className="h-5 w-5" />
        )}
      </div>

      {/* Content - constrained width for balanced 2-line wrap */}
      <div className="flex-1 space-y-1 max-w-[340px]">
        <h3 className="text-sm font-medium leading-snug text-foreground line-clamp-2">
          {displayTitle}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{session.time}</span>
          <span>{session.duration}</span>
        </div>
      </div>

      {/* Topic Badge - show to the left of star when not in selection mode */}
      {!selectionMode && (
        <div className="shrink-0" onClick={handleBadgeClick}>
          {effectiveTopicBadge ? (
            <div className="cursor-pointer hover:opacity-80 transition-opacity">
              <SessionBadge type={session.badge} topicBadge={effectiveTopicBadge} />
            </div>
          ) : (
            <EmptyTopicBadge />
          )}
        </div>
      )}

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
    </>
  );

  const cardClassName = cn(
    "group flex w-full items-start gap-4 rounded-xl border border-border bg-card p-4 text-left transition-smooth hover:border-primary/20 hover:shadow-sm cursor-pointer",
    isSelected && !selectionMode && "border-primary bg-primary/[0.03]",
    isChecked && selectionMode && "border-primary bg-primary/[0.03]"
  );

  // Use div in selection mode to prevent navigation, Link otherwise
  if (selectionMode || onSelect) {
    return (
      <div onClick={handleClick} className={cardClassName}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link to={sessionUrl} className={cardClassName}>
      {cardContent}
    </Link>
  );
}
