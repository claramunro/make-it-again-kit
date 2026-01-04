import { useState } from 'react';
import { ArrowDownUp, Plus, RefreshCw, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TopicCard, TopicCardSelectable } from '@/components/TopicCard';
import { useTopics } from '@/contexts/TopicContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { AddTopicDialog } from './AddTopicDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type SortOption = 'last-activity' | 'name' | 'most-active' | 'recently-created';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'last-activity', label: 'Last Activity' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'most-active', label: 'Most Active' },
  { value: 'recently-created', label: 'Recently Created' },
];

export function TopicsHeader() {
  const isMobile = useIsMobile();
  const [sortBy, setSortBy] = useState<SortOption>('last-activity');
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
                    onClick={() => setSortBy(option.value)}
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
                  onClick={() => setSortBy(option.value)}
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

export function TopicsList() {
  const { topics } = useTopics();
  
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}

interface TopicsListSelectableProps {
  selectedTopicId?: string;
  onSelectTopic?: (id: string) => void;
}

export function TopicsListSelectable({ selectedTopicId, onSelectTopic }: TopicsListSelectableProps) {
  const { topics } = useTopics();
  
  return (
    <div className="space-y-3">
      {topics.map((topic) => (
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
