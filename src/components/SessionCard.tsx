import { useState } from 'react';
import { FileText, AudioLines, ChevronRight, Star, FolderOpen, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Session, TopicBadgeInfo } from '@/types/session';
import { SessionBadge } from './SessionBadge';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';
import { topics } from '@/data/topics';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

// Max characters for title display (balanced 2-line wrap)
const MAX_TITLE_LENGTH = 85;

// Wallpaper to badge color mapping for select items
const wallpaperBadgeColors: Record<string, { bg: string; text: string; border: string }> = {
  sand: { bg: 'hsl(45, 40%, 94%)', text: 'hsl(35, 50%, 35%)', border: 'hsl(45, 35%, 85%)' },
  peach: { bg: 'hsl(20, 60%, 94%)', text: 'hsl(15, 55%, 40%)', border: 'hsl(20, 50%, 85%)' },
  mint: { bg: 'hsl(150, 35%, 93%)', text: 'hsl(155, 40%, 32%)', border: 'hsl(150, 30%, 82%)' },
  lavender: { bg: 'hsl(270, 35%, 95%)', text: 'hsl(275, 40%, 45%)', border: 'hsl(270, 30%, 88%)' },
  ocean: { bg: 'hsl(200, 50%, 94%)', text: 'hsl(205, 55%, 38%)', border: 'hsl(200, 45%, 85%)' },
  sunset: { bg: 'hsl(30, 55%, 94%)', text: 'hsl(25, 60%, 40%)', border: 'hsl(30, 50%, 85%)' },
};

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
  onAssignTopic?: (sessionId: string, topicId: string) => void;
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
  onSelectTopic,
  onAssignTopic
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

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
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
        <div className="shrink-0 ml-auto" onClick={(e) => e.stopPropagation()}>
          {effectiveTopicBadge ? (
            <div 
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleBadgeClick}
            >
              <SessionBadge type={session.badge} topicBadge={effectiveTopicBadge} />
            </div>
          ) : (
            <Select
              onValueChange={(value) => {
                onAssignTopic?.(session.id, value);
              }}
            >
              <SelectTrigger className="h-auto border rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap bg-[hsl(0,0%,96%)] hover:bg-[hsl(0,0%,92%)] text-[hsl(0,0%,55%)] border-[hsl(0,0%,88%)] transition-colors focus:ring-0 focus:ring-offset-0 w-auto gap-1.5">
                <FolderOpen className="h-3.5 w-3.5" />
                <span>Select topic</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-popover">
                {topics.map((topic) => {
                  const colors = topic.wallpaper 
                    ? wallpaperBadgeColors[topic.wallpaper] 
                    : wallpaperBadgeColors.mint;
                  return (
                    <SelectItem key={topic.id} value={topic.id}>
                      <div className="flex items-center gap-2">
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded-full text-xs"
                          style={{ backgroundColor: colors.bg }}
                        >
                          {topic.icon}
                        </span>
                        <span>{topic.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
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
