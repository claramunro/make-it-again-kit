import { useState } from 'react';
import { ChevronDown, ChevronUp, FileVideo } from 'lucide-react';
import { Highlight } from '@/data/highlights';
import { HighlightItem } from './HighlightItem';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface SessionSubGroupProps {
  sessionId: string;
  sessionTitle: string;
  sessionMeta?: { time: string; duration: string };
  highlights: Highlight[];
  selectedId: string | null;
  onSelectHighlight: (highlight: Highlight) => void;
  defaultExpanded?: boolean;
}

export function SessionSubGroup({
  sessionId,
  sessionTitle,
  sessionMeta,
  highlights,
  selectedId,
  onSelectHighlight,
  defaultExpanded = true,
}: SessionSubGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="rounded-lg border border-border/50 bg-muted/20 overflow-hidden">
      {/* Session Header */}
      <div className="flex w-full items-center justify-between p-3 hover:bg-muted/30 transition-smooth">
        <Link
          to={`/session/${sessionId}`}
          className="flex items-center gap-2 flex-1"
        >
          <FileVideo className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-foreground">{sessionTitle}</span>
            {sessionMeta && (
              <span className="text-xs text-muted-foreground">
                {sessionMeta.time} · {sessionMeta.duration}
              </span>
            )}
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {highlights.length} highlight{highlights.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-muted rounded transition-smooth"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Highlights */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isExpanded ? 'max-h-[2000px]' : 'max-h-0'
        )}
      >
        <div className="space-y-2 p-3 pt-0">
          {highlights.map((highlight) => (
            <HighlightItem
              key={highlight.id}
              highlight={highlight}
              isSelected={selectedId === highlight.id}
              onSelect={() => onSelectHighlight(highlight)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
