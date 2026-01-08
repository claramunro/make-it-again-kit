import { useState } from 'react';
import { SidebarV2 } from '@/components/SidebarV2';
import { TopicsHeader, TopicsListSelectable, TopicSortOption } from '@/components/TopicsList';
import { topics } from '@/data/topics';
import { TopicDetailPanel } from '@/components/TopicDetailPanel';

const TopicsMasterDetail = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    topics[0]?.id || ''
  );
  const [sortBy, setSortBy] = useState<TopicSortOption>('last-activity');

  return (
    <div className="flex h-screen bg-card overflow-hidden">
      <SidebarV2 />
      
      <div className="flex flex-1 flex-col">
        
        <main className="flex flex-1 flex-col overflow-hidden rounded-tl-2xl bg-background">
          {/* Topics Header - Full Width */}
          <div className="shrink-0 border-b border-border px-6 pt-6 pb-4">
            <TopicsHeader sortBy={sortBy} onSortChange={setSortBy} />
          </div>
          
          {/* Content: List + Detail side by side */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left: Topics List */}
            <div className="w-80 shrink-0 overflow-auto border-r border-border p-4">
              <TopicsListSelectable 
                selectedTopicId={selectedTopicId}
                onSelectTopic={setSelectedTopicId}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
            
            {/* Right: Topic Detail */}
            <div className="flex-1 overflow-hidden">
              {selectedTopicId ? (
                <TopicDetailPanel topicId={selectedTopicId} />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Select a topic to view details
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TopicsMasterDetail;
