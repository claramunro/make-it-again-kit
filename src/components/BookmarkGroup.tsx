import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Bookmark } from '@/data/bookmarks';
import { BookmarkItem } from './BookmarkItem';
import { cn } from '@/lib/utils';

interface BookmarkGroupProps {
  title: string;
  icon?: string;
  bookmarks: Bookmark[];
  selectedId: string | null;
  onSelectBookmark: (bookmark: Bookmark) => void;
  defaultExpanded?: boolean;
}

export function BookmarkGroup({ 
  title, 
  icon, 
  bookmarks, 
  selectedId, 
  onSelectBookmark,
  defaultExpanded = false 
}: BookmarkGroupProps) {
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
            {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''}
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
          {bookmarks.map((bookmark) => (
            <BookmarkItem
              key={bookmark.id}
              bookmark={bookmark}
              isSelected={selectedId === bookmark.id}
              onSelect={() => onSelectBookmark(bookmark)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
