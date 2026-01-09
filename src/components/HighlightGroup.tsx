import { useState } from 'react';
import { ChevronDown, ChevronUp, LucideIcon, Users } from 'lucide-react';
import { Highlight } from '@/data/highlights';
import { HighlightItem } from './HighlightItem';
import { SessionSubGroup } from './SessionSubGroup';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { wallpaperBadgeColors } from './SessionBadge';
import { WallpaperType } from '@/types/session';

export interface SessionGroup {
  sessionId: string;
  sessionTitle: string;
  sessionMeta?: { time: string; duration: string };
  highlights: Highlight[];
}

interface HighlightGroupProps {
  title: string;
  icon?: string;
  description?: string;
  wallpaper?: WallpaperType;
  isShared?: boolean;
  topicId?: string;
  SessionIcon?: LucideIcon;
  sessionMeta?: { time: string; duration: string };
  sessionId?: string;
  highlights: Highlight[];
  sessionGroups?: SessionGroup[];
  selectedId: string | null;
  onSelectHighlight: (highlight: Highlight) => void;
  defaultExpanded?: boolean;
}

export function HighlightGroup({ 
  title, 
  icon,
  description,
  wallpaper,
  isShared,
  topicId,
  SessionIcon,
  sessionMeta,
  sessionId,
  highlights, 
  sessionGroups,
  selectedId, 
  onSelectHighlight,
  defaultExpanded = false 
}: HighlightGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const totalHighlights = sessionGroups 
    ? sessionGroups.reduce((sum, g) => sum + g.highlights.length, 0)
    : highlights.length;

  // Get colors for topic icon background
  const colors = wallpaper ? wallpaperBadgeColors[wallpaper] : wallpaperBadgeColors.mint;

  // Determine if this is a topic card (has topicId or sessionGroups)
  const isTopicCard = !!topicId || !!sessionGroups;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Group Header */}
      <div className="flex w-full items-center justify-between p-4 hover:bg-muted/30 transition-smooth">
        {sessionId ? (
          <Link 
            to={`/session/${sessionId}`}
            className="flex items-center gap-3 flex-1"
          >
            {icon && <span className="text-xl">{icon}</span>}
            {SessionIcon && <SessionIcon className="h-5 w-5 text-muted-foreground" />}
            <div className="flex flex-col items-start">
              <span className="font-medium text-foreground">{title}</span>
              {sessionMeta && (
                <span className="text-xs text-muted-foreground">
                  {sessionMeta.time}  ·  {sessionMeta.duration}
                </span>
              )}
            </div>
          </Link>
        ) : isTopicCard ? (
          <Link 
            to={topicId ? `/topic/${topicId}` : '#'}
            className="flex items-center gap-3 flex-1"
          >
            {/* Topic icon in square container */}
            {icon && (
              <div 
                className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl"
                style={{ backgroundColor: colors.bg }}
              >
                {icon}
                {isShared && (
                  <span 
                    className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-muted border-2 border-card"
                  >
                    <Users className="h-3 w-3 text-muted-foreground" />
                  </span>
                )}
              </div>
            )}
            <div className="flex flex-col items-start min-w-0">
              <span className="font-medium text-foreground">{title}</span>
              {description && (
                <span className="text-sm text-muted-foreground truncate max-w-[300px]">
                  {description}
                </span>
              )}
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-3 flex-1">
            {icon && <span className="text-xl">{icon}</span>}
            {SessionIcon && <SessionIcon className="h-5 w-5 text-muted-foreground" />}
            <div className="flex flex-col items-start">
              <span className="font-medium text-foreground">{title}</span>
              {sessionMeta && (
                <span className="text-xs text-muted-foreground">
                  {sessionMeta.time}  ·  {sessionMeta.duration}
                </span>
              )}
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {totalHighlights} highlight{totalHighlights !== 1 ? 's' : ''}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-muted rounded transition-smooth"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Group Content */}
      <div className={cn(
        'overflow-hidden transition-all duration-300',
        isExpanded ? 'max-h-[5000px]' : 'max-h-0'
      )}>
        <div className="space-y-3 p-4 pt-0">
          {sessionGroups ? (
            // Render nested session groups (for topic view)
            sessionGroups.map((group) => (
              <SessionSubGroup
                key={group.sessionId}
                sessionId={group.sessionId}
                sessionTitle={group.sessionTitle}
                sessionMeta={group.sessionMeta}
                highlights={group.highlights}
                selectedId={selectedId}
                onSelectHighlight={onSelectHighlight}
              />
            ))
          ) : (
            // Render highlights directly (for session view)
            highlights.map((highlight) => (
              <HighlightItem
                key={highlight.id}
                highlight={highlight}
                isSelected={selectedId === highlight.id}
                onSelect={() => onSelectHighlight(highlight)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
