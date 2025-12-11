import { Search } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
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
