import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Folder, Sparkles, Search, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StartSessionDialog } from './StartSessionDialog';
import { SearchDialog } from './SearchDialog';
import glassesIcon from '@/assets/glasses-icon.svg';

export function MobileBottomNav() {
  const location = useLocation();
  const [startSessionOpen, setStartSessionOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Check if current route is a session or topic detail page
  const isSessionRoute = location.pathname.startsWith('/session');
  const isTopicRoute = location.pathname.startsWith('/topic');

  return (
    <>
      {/* Floating Start Session button */}
      <button 
        onClick={() => setStartSessionOpen(true)}
        className="fixed bottom-24 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-smooth hover:scale-105 active:scale-95 md:hidden"
      >
        <img src={glassesIcon} alt="Start Session" className="h-7 w-7" />
      </button>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t border-border bg-card/95 pb-2 backdrop-blur-sm md:hidden">
        <Link
          to="/"
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl transition-smooth',
            (location.pathname === '/' || isSessionRoute)
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <FileText className="h-5 w-5" />
        </Link>

        <Link
          to="/topics"
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl transition-smooth',
            (location.pathname === '/topics' || isTopicRoute)
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Folder className="h-5 w-5" />
        </Link>

        <Link
          to="/highlights"
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl transition-smooth',
            location.pathname === '/highlights'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Sparkles className="h-5 w-5" />
        </Link>

        <button
          onClick={() => setSearchOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-smooth hover:text-foreground"
        >
          <Search className="h-5 w-5" />
        </button>

        <Link
          to="/settings"
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl transition-smooth',
            location.pathname === '/settings'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Settings className="h-5 w-5" />
        </Link>
      </nav>

      <StartSessionDialog open={startSessionOpen} onClose={() => setStartSessionOpen(false)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
