import { Clock, FileText } from 'lucide-react';
import { Bookmark } from '@/data/bookmarks';
import { Link } from 'react-router-dom';

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <div className="animate-fade-in rounded-xl border border-border bg-card p-5 transition-smooth hover:border-primary/20 hover:shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {bookmark.datetime}
        </div>
        <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
          {bookmark.timestamp}
        </span>
      </div>

      {/* Session reference */}
      <Link 
        to={`/session/${bookmark.sessionId}`}
        className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
      >
        <FileText className="h-4 w-4" />
        {bookmark.sessionTitle}
      </Link>

      {/* Title */}
      <h3 className="mb-2 text-base font-semibold text-foreground">
        {bookmark.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {bookmark.description}
      </p>
    </div>
  );
}