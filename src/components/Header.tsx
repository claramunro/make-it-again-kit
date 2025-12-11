import { Search, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

export function Header() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null; // Mobile uses page-specific headers
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
      {/* Search */}
      <div className="flex flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Start Session Button */}
      <Button variant="action" className="ml-4 gap-2">
        <span className="text-lg">◯◯</span>
        Start Session
      </Button>
    </header>
  );
}

interface MobileHeaderProps {
  title: string;
  count?: number;
  actions?: React.ReactNode;
}

export function MobileHeader({ title, count, actions }: MobileHeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 md:hidden">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {count !== undefined && (
          <span className="rounded-md bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
            {count}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {actions || (
          <>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground">
              <Search className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground">
              <MoreVertical className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
