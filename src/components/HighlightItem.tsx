import { Sparkles, ChevronRight, Share, Trash2 } from 'lucide-react';
import { Highlight } from '@/data/highlights';
import { cn } from '@/lib/utils';

interface HighlightItemProps {
  highlight: Highlight;
  isSelected: boolean;
  onSelect: () => void;
}

export function HighlightItem({ highlight, isSelected, onSelect }: HighlightItemProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'group flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-smooth',
        isSelected 
          ? 'bg-primary/10 border border-primary/20' 
          : 'bg-muted/30 hover:bg-muted/50 border border-transparent'
      )}
    >
      {/* Highlight icon */}
      <div className={cn(
        'flex h-8 w-8 items-center justify-center rounded',
        isSelected ? 'text-primary' : 'text-foreground/40'
      )}>
        <Sparkles className={cn('h-5 w-5', isSelected && 'text-primary')} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground truncate">
          {highlight.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-foreground">
            {highlight.timestamp}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="p-1.5 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <Share className="h-3.5 w-3.5" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="p-1.5 text-muted-foreground hover:text-destructive transition-smooth"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Arrow */}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}