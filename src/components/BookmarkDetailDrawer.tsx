import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Bookmark } from '@/data/bookmarks';
import { BookmarkDetailPanel } from './BookmarkDetailPanel';
import { FileText, Share, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookmarkDetailDrawerProps {
  bookmark: Bookmark | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookmarkDetailDrawer({ bookmark, open, onOpenChange }: BookmarkDetailDrawerProps) {
  if (!bookmark) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b border-border pb-4">
          <DrawerTitle className="text-xl font-semibold text-left">
            {bookmark.title}
          </DrawerTitle>
          
          {/* Session link pill */}
          <Link 
            to={`/session/${bookmark.sessionId}`}
            className="inline-flex items-center gap-2 mt-2 rounded-full bg-muted px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted/80 transition-smooth w-fit"
          >
            <FileText className="h-4 w-4" />
            {bookmark.sessionTitle}
            <span className="text-xs">›</span>
          </Link>

          {/* Date, time, actions */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{bookmark.datetime}</span>
              <span className="rounded-full bg-primary/80 px-2 py-0.5 text-xs font-medium text-primary-foreground">
                {bookmark.timestamp}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth">
                <Share className="h-4 w-4" />
                Share
              </button>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-smooth">
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </DrawerHeader>
        
        <div className="overflow-y-auto">
          <BookmarkDetailPanel bookmark={bookmark} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
