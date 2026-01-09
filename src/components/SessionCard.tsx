import { useState } from 'react';
import { FileText, FileVideo, Star, FolderOpen, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Session, TopicBadgeInfo } from '@/types/session';
import { wallpaperBadgeColors } from './SessionBadge';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';
import { topics } from '@/data/topics';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

// Max characters for title display (balanced 2-line wrap)
const MAX_TITLE_LENGTH = 85;

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
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleBadgeLabelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (effectiveTopicBadge) {
      // Navigate to topic page if topic is assigned
      const topicId = session.topicId;
      if (topicId) {
        navigate(`/topic/${topicId}`);
      }
    }
  };

  const handleTopicSelect = (topicId: string) => {
    onAssignTopic?.(session.id, topicId);
    setDropdownOpen(false);
  };

  const sessionUrl = `/session/${session.id}`;

  // Use topicBadge prop, fall back to session.topicBadge, then use session.badge
  const effectiveTopicBadge = topicBadge || session.topicBadge;

  // Truncate title for balanced 2-line display
  const displayTitle = session.title.length > MAX_TITLE_LENGTH 
    ? session.title.slice(0, MAX_TITLE_LENGTH).trim()
    : session.title;

  // Get colors for the current topic badge
  const getTopicColors = (wallpaper?: string) => {
    if (!wallpaper) return wallpaperBadgeColors.mint;
    return wallpaperBadgeColors[wallpaper as keyof typeof wallpaperBadgeColors] || wallpaperBadgeColors.mint;
  };

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
          <FileVideo className="h-5 w-5" />
        ) : (
          <FileText className="h-5 w-5" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        {/* Topic Badge - show above title when not in selection mode */}
        {!selectionMode && (
          <div onClick={(e) => e.stopPropagation()} className="mb-1">
            {effectiveTopicBadge ? (
              // Split button: label navigates, chevron opens dropdown
              <div className="inline-flex items-center">
                {/* Label part - navigates to topic */}
                <button
                  onClick={handleBadgeLabelClick}
                  className="inline-flex items-center gap-1 rounded-l-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: getTopicColors(effectiveTopicBadge.wallpaper).bg,
                    color: getTopicColors(effectiveTopicBadge.wallpaper).text,
                    borderWidth: '1px',
                    borderColor: getTopicColors(effectiveTopicBadge.wallpaper).border,
                    borderRight: 'none',
                  }}
                >
                  <span className="text-xs">{effectiveTopicBadge.icon}</span>
                  <span>{effectiveTopicBadge.label}</span>
                </button>
                
                {/* Chevron part - opens dropdown */}
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="inline-flex items-center justify-center rounded-r-full px-1.5 py-0.5 hover:opacity-80 transition-opacity"
                      style={{
                        backgroundColor: getTopicColors(effectiveTopicBadge.wallpaper).bg,
                        color: getTopicColors(effectiveTopicBadge.wallpaper).text,
                        borderWidth: '1px',
                        borderColor: getTopicColors(effectiveTopicBadge.wallpaper).border,
                        borderLeft: `1px solid ${getTopicColors(effectiveTopicBadge.wallpaper).border}`,
                      }}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="z-50 bg-popover min-w-[180px]">
                    {topics.map((topic) => {
                      const colors = getTopicColors(topic.wallpaper);
                      return (
                        <DropdownMenuItem 
                          key={topic.id} 
                          onClick={() => handleTopicSelect(topic.id)}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="flex h-5 w-5 items-center justify-center rounded-full text-xs"
                              style={{ backgroundColor: colors.bg }}
                            >
                              {topic.icon}
                            </span>
                            <span>{topic.name}</span>
                          </div>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              // No topic assigned - show "Select topic" dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap bg-[hsl(0,0%,96%)] hover:bg-[hsl(0,0%,92%)] text-[hsl(0,0%,55%)] border border-[hsl(0,0%,88%)] transition-colors">
                    <FolderOpen className="h-3.5 w-3.5" />
                    <span>Select topic</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="z-50 bg-popover min-w-[180px]">
                  {topics.map((topic) => {
                    const colors = getTopicColors(topic.wallpaper);
                    return (
                      <DropdownMenuItem 
                        key={topic.id} 
                        onClick={() => handleTopicSelect(topic.id)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="flex h-5 w-5 items-center justify-center rounded-full text-xs"
                            style={{ backgroundColor: colors.bg }}
                          >
                            {topic.icon}
                          </span>
                          <span>{topic.name}</span>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
        <h3 className="text-sm font-medium leading-snug text-foreground line-clamp-2">
          {displayTitle}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{session.time}</span>
          <span>{session.duration}</span>
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

    </>
  );

  const cardClassName = cn(
    "group flex w-full items-start gap-4 rounded-xl p-4 text-left transition-smooth cursor-pointer",
    "bg-muted/50 hover:bg-muted/70 border border-transparent",
    isSelected && !selectionMode && "border-primary/20 bg-primary/10",
    isChecked && selectionMode && "border-primary/20 bg-primary/10"
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
