import { useState, useRef, useEffect } from 'react';
import { Search, X, Mic, Folder, Star } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { StartSessionDialog } from './StartSessionDialog';
import { useSidebarCollapsed } from './Sidebar';
import glassesIcon from '@/assets/glasses-icon.svg';
import { cn } from '@/lib/utils';

// Mock search results data
const mockSessions = [
  { id: '1', title: 'Team Meeting - Q4 Planning', time: '2 hours ago' },
  { id: '2', title: 'Client Call with Marketing Team', time: 'Yesterday' },
  { id: '3', title: 'Product Roadmap Discussion', time: '3 days ago' },
];

const mockTopics = [
  { id: '1', name: 'Product Development', sessions: 12 },
  { id: '2', name: 'Marketing Strategy', sessions: 8 },
  { id: '3', name: 'Team Planning', sessions: 5 },
];

const mockHighlights = [
  { id: '1', title: 'Increase marketing budget by 20%', source: 'From Team Meeting' },
];

export function Header() {
  const isMobile = useIsMobile();
  const { collapsed } = useSidebarCollapsed();
  const [startSessionOpen, setStartSessionOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showDropdown = isSearchFocused && searchValue.length > 0;

  if (isMobile) {
    return null; // Mobile uses page-specific headers
  }

  return (
    <>
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-card px-6">
        {/* Search */}
        <div className={cn("flex flex-1", collapsed && "justify-center")} ref={searchRef}>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className={cn(
                "h-9 w-full rounded-full border border-border bg-muted/50 pl-9 pr-9 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                showDropdown && "rounded-b-none border-b-0"
              )}
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Search Dropdown */}
            {showDropdown && (
              <div className="absolute left-0 right-0 top-full z-50 rounded-b-2xl border border-t-0 border-border bg-card shadow-lg">
                <div className="max-h-96 overflow-auto p-2">
                  {/* Sessions Section */}
                  <div className="mb-2">
                    <h3 className="px-3 py-2 text-xs font-medium text-muted-foreground">Sessions</h3>
                    {mockSessions.map((session) => (
                      <button
                        key={session.id}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-muted"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Mic className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {session.title.split(new RegExp(`(${searchValue})`, 'gi')).map((part, i) => 
                              part.toLowerCase() === searchValue.toLowerCase() ? 
                                <mark key={i} className="bg-primary/20 text-foreground">{part}</mark> : part
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">{session.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Topics Section */}
                  <div className="mb-2">
                    <h3 className="px-3 py-2 text-xs font-medium text-muted-foreground">Topics</h3>
                    {mockTopics.map((topic) => (
                      <button
                        key={topic.id}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-muted"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Folder className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {topic.name.split(new RegExp(`(${searchValue})`, 'gi')).map((part, i) => 
                              part.toLowerCase() === searchValue.toLowerCase() ? 
                                <mark key={i} className="bg-primary/20 text-foreground">{part}</mark> : part
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">{topic.sessions} sessions</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Highlights Section */}
                  <div>
                    <h3 className="px-3 py-2 text-xs font-medium text-muted-foreground">Highlights</h3>
                    {mockHighlights.map((highlight) => (
                      <button
                        key={highlight.id}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-muted"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Star className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {highlight.title.split(new RegExp(`(${searchValue})`, 'gi')).map((part, i) => 
                              part.toLowerCase() === searchValue.toLowerCase() ? 
                                <mark key={i} className="bg-primary/20 text-foreground">{part}</mark> : part
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">{highlight.source}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Start Session Button */}
        <Button variant="action" className="ml-4 gap-2" onClick={() => setStartSessionOpen(true)}>
          <img src={glassesIcon} alt="" className="h-7 w-7" />
          Start Session
        </Button>
      </header>

      <StartSessionDialog open={startSessionOpen} onClose={() => setStartSessionOpen(false)} />
    </>
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
          </>
        )}
      </div>
    </header>
  );
}
