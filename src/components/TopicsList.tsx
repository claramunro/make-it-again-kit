import { ArrowDownUp, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TopicCard, TopicCardSelectable } from '@/components/TopicCard';
import { topics } from '@/data/topics';
import { useIsMobile } from '@/hooks/use-mobile';

export function TopicsHeader() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
          PRO
        </span>
        <div className="flex flex-1 justify-end gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <ArrowDownUp className="h-3.5 w-3.5" />
            Sort
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" />
            New
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-foreground">Topics</h1>
        <span className="rounded-md bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
          PRO
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Most Recent</span>
      </div>
    </div>
  );
}

export function TopicsList() {
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
