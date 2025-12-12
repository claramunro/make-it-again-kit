import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Highlight } from '@/data/highlights';
import { HighlightItem } from './HighlightItem';
import { cn } from '@/lib/utils';

interface HighlightGroupProps {
  title: string;
  icon?: string;
  highlights: Highlight[];
  selectedId: string | null;
  onSelectHighlight: (highlight: Highlight) => void;
  defaultExpanded?: boolean;
}

export function HighlightGroup({ 
  title, 
  icon, 
  highlights, 
  selectedId, 
  onSelectHighlight,
  defaultExpanded = false 
}: HighlightGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Group Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 hover:bg-muted/30 transition-smooth"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-xl">{icon}</span>}
          <span className="font-medium text-foreground">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {highlights.length} highlight{highlights.length !== 1 ? 's' : ''}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Group Content */}
      <div className={cn(
        'overflow-hidden transition-all duration-300',
        isExpanded ? 'max-h-[2000px]' : 'max-h-0'
      )}>
        <div className="space-y-2 p-4 pt-0">
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
