import { useState, useRef, useEffect } from 'react';
import { Search, X, Mic, Folder, Star, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { StartSessionDialog } from './StartSessionDialog';
import { useSidebarCollapsed } from './SidebarV2';
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
  const { collapsed, setCollapsed } = useSidebarCollapsed();
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
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-card px-6 border border-red-500">
        {/* Expand button when sidebar collapsed */}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="rounded-lg p-1.5 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground border border-red-500"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
        
        {/* Spacer to push content */}
        <div className="flex-1" />
      </header>
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
