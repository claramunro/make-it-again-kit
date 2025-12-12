import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Folder, Bookmark, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StartSessionDialog } from './StartSessionDialog';

export function MobileBottomNav() {
  const location = useLocation();
  const [startSessionOpen, setStartSessionOpen] = useState(false);

  // Check if current route is a session or topic detail page
  const isSessionRoute = location.pathname.startsWith('/session');
  const isTopicRoute = location.pathname.startsWith('/topic');

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t border-border bg-card/95 pb-2 backdrop-blur-sm md:hidden">
        {/* Left icons */}
        <Link
          to="/"
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl transition-smooth',
            (location.pathname === '/' || isSessionRoute)
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <FileText className="h-6 w-6" />
        </Link>

        <Link
          to="/topics"
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl transition-smooth',
            (location.pathname === '/topics' || isTopicRoute)
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Folder className="h-6 w-6" />
        </Link>

        {/* Center Start Session button */}
        <button 
          onClick={() => setStartSessionOpen(true)}
          className="flex h-14 w-14 -translate-y-2 items-center justify-center rounded-2xl bg-primary text-2xl text-primary-foreground shadow-lg transition-smooth hover:scale-105 active:scale-95"
        >
          ◯◯
        </button>

        <Link
          to="/bookmarks"
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl transition-smooth',
            location.pathname === '/bookmarks'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Bookmark className="h-6 w-6" />
        </Link>

        <Link
          to="/settings"
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl transition-smooth',
            location.pathname === '/settings'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Settings className="h-6 w-6" />
        </Link>
      </nav>

      <StartSessionDialog open={startSessionOpen} onClose={() => setStartSessionOpen(false)} />
    </>
  );
}
