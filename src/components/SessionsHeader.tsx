import { Search, SlidersHorizontal, RefreshCw, Plus, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface SessionsHeaderProps {
  totalSessions: number;
}

export function SessionsHeader({ totalSessions }: SessionsHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-foreground">Sessions</h1>
        <span className="rounded-md bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
          {totalSessions}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Select
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New
          <ChevronDown className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
