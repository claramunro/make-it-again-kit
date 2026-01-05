import { useState, useMemo } from 'react';
import { ArrowDownUp, Plus, RefreshCw, Check, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TopicCard, TopicCardSelectable, TopicListItem } from '@/components/TopicCard';
import { useTopics } from '@/contexts/TopicContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { AddTopicDialog } from './AddTopicDialog';
import { Topic } from '@/data/topics';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from '@/lib/utils';

export type TopicSortOption = 'last-activity' | 'name' | 'most-active' | 'recently-created' | 'starred';
export type TopicViewMode = 'card' | 'list';

const SORT_OPTIONS: { value: TopicSortOption; label: string }[] = [
  { value: 'last-activity', label: 'Last Activity' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'most-active', label: 'Most Active' },
  { value: 'recently-created', label: 'Recently Created' },
  { value: 'starred', label: 'Starred' },
];

function parseDate(dateStr: string): Date {
  // Parse dates like "Dec 1", "Nov 4", "Oct 29"
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const [month, day] = dateStr.split(' ');
  return new Date(2025, months[month] || 0, parseInt(day) || 1);
}

export function sortTopics(topics: Topic[], sortBy: TopicSortOption): Topic[] {
  let filtered = [...topics];
  
  // For starred sorting, filter to only show starred items
  if (sortBy === 'starred') {
    filtered = filtered.filter(t => t.isFavorite);
  }
  
  switch (sortBy) {
    case 'name':
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    case 'most-active':
      return filtered.sort((a, b) => b.sessionCount - a.sessionCount);
    case 'recently-created':
      return filtered.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
    case 'starred':
      // Already filtered, just sort by date
      return filtered.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
    case 'last-activity':
    default:
      return filtered.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
  }
}

interface TopicsHeaderProps {
  sortBy: TopicSortOption;
  onSortChange: (sort: TopicSortOption) => void;
  viewMode: TopicViewMode;
  onViewModeChange: (mode: TopicViewMode) => void;
}

export function TopicsHeader({ sortBy, onSortChange, viewMode, onViewModeChange }: TopicsHeaderProps) {
  const isMobile = useIsMobile();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const currentSortLabel = SORT_OPTIONS.find(opt => opt.value === sortBy)?.label || 'Last Activity';

  if (isMobile) {
    return (
      <>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
            PRO
          </span>
          <div className="flex flex-1 justify-end gap-2">
            {/* View Toggle */}
            <div className="flex items-center rounded-lg border border-border bg-muted/50 p-0.5">
              <button
                onClick={() => onViewModeChange('card')}
                className={cn(
                  'rounded-md p-1.5 transition-smooth',
                  viewMode === 'card' ? 'bg-card shadow-sm' : 'hover:bg-muted'
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={cn(
                  'rounded-md p-1.5 transition-smooth',
                  viewMode === 'list' ? 'bg-card shadow-sm' : 'hover:bg-muted'
                )}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <ArrowDownUp className="h-3.5 w-3.5" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onSortChange(option.value)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span>{option.label}</span>
                    {sortBy === option.value && <Check className="h-4 w-4 text-primary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => setAddDialogOpen(true)}>
              <Plus className="h-3.5 w-3.5" />
              New
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </Button>
          </div>
        </div>
        <AddTopicDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} />
      </>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-foreground">Topics</h1>
          <span className="rounded-md bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
            PRO
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center rounded-lg border border-border bg-muted/50 p-0.5">
            <button
              onClick={() => onViewModeChange('card')}
              className={cn(
                'rounded-md p-1.5 transition-smooth',
                viewMode === 'card' ? 'bg-card shadow-sm' : 'hover:bg-muted'
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={cn(
                'rounded-md p-1.5 transition-smooth',
                viewMode === 'list' ? 'bg-card shadow-sm' : 'hover:bg-muted'
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowDownUp className="h-4 w-4" />
                {currentSortLabel}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span>{option.label}</span>
                  {sortBy === option.value && <Check className="h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
      <AddTopicDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} />
    </>
  );
}

interface TopicsListProps {
  sortBy: TopicSortOption;
  viewMode: TopicViewMode;
}

export function TopicsList({ sortBy, viewMode }: TopicsListProps) {
  const { topics } = useTopics();
  
  const sortedTopics = useMemo(() => sortTopics(topics, sortBy), [topics, sortBy]);
  
  if (viewMode === 'list') {
    return (
      <div className="space-y-2">
        {sortedTopics.map((topic) => (
          <TopicListItem key={topic.id} topic={topic} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {sortedTopics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}

interface TopicsListSelectableProps {
  selectedTopicId?: string;
  onSelectTopic?: (id: string) => void;
  sortBy?: TopicSortOption;
}

export function TopicsListSelectable({ selectedTopicId, onSelectTopic, sortBy = 'last-activity' }: TopicsListSelectableProps) {
  const { topics } = useTopics();
  
  const sortedTopics = useMemo(() => sortTopics(topics, sortBy), [topics, sortBy]);
  
  return (
    <div className="space-y-3">
      {sortedTopics.map((topic) => (
        <TopicCardSelectable 
          key={topic.id} 
          topic={topic} 
          isSelected={selectedTopicId === topic.id}
          onSelect={onSelectTopic}
        />
      ))}
    </div>
  );
}
