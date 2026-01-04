import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { TopicsHeader, TopicsListSelectable } from '@/components/TopicsList';
import { topics } from '@/data/topics';
import { TopicDetailPanel } from '@/components/TopicDetailPanel';

const TopicsMasterDetail = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    topics[0]?.id || ''
  );

  return (
    <div className="flex min-h-screen bg-card">
      <Sidebar />
      
      <div className="flex flex-1 flex-col">
        <Header />
        
        <main className="flex flex-1 flex-col overflow-hidden rounded-tl-2xl bg-background">
          {/* Topics Header - Full Width */}
          <div className="shrink-0 border-b border-border px-4 pt-4 pb-2">
            <TopicsHeader />
          </div>
          
          {/* Content: List + Detail side by side */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left: Topics List */}
            <div className="w-80 shrink-0 overflow-auto border-r border-border p-4">
              <TopicsListSelectable 
                selectedTopicId={selectedTopicId}
                onSelectTopic={setSelectedTopicId}
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
