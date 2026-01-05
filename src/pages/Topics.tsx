import { useState } from 'react';
import { SidebarV2 } from '@/components/SidebarV2';
import { MobileHeader } from '@/components/Header';
import { TopicsHeader, TopicsList, TopicSortOption, TopicViewMode } from '@/components/TopicsList';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { useTopics } from '@/contexts/TopicContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIsLargeScreen } from '@/hooks/use-large-screen';
import { ArrowDownUp, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TopicsMasterDetail from './TopicsMasterDetail';

const Topics = () => {
  const isMobile = useIsMobile();
  const isLargeScreen = useIsLargeScreen();
  const { topics } = useTopics();
  const [sortBy, setSortBy] = useState<TopicSortOption>('last-activity');
  const [viewMode, setViewMode] = useState<TopicViewMode>('card');
  const [showSessions, setShowSessions] = useState(true);

  // Use master-detail layout on large screens
  if (isLargeScreen) {
    return <TopicsMasterDetail />;
  }

  const mobileActions = (
    <>
      <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
        PRO
      </span>
      <Button variant="outline" size="sm" className="h-8 gap-1 px-2 text-xs">
        <ArrowDownUp className="h-3.5 w-3.5" />
        Sort
      </Button>
      <Button variant="outline" size="sm" className="h-8 gap-1 px-2 text-xs">
        <Plus className="h-3.5 w-3.5" />
        New
      </Button>
      <Button variant="outline" size="sm" className="h-8 gap-1 px-2 text-xs">
        <RefreshCw className="h-3.5 w-3.5" />
        Refresh
      </Button>
    </>
  );

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-card">
      {!isMobile && <SidebarV2 />}
      
      <div className="flex flex-1 flex-col">
        <MobileHeader title="Topics" count={topics.length} actions={mobileActions} />
        
        <main className="flex-1 bg-background p-4 pb-24 md:p-6 md:pb-6">
          <div className="mx-auto max-w-5xl">
            {!isMobile && (
              <TopicsHeader 
                sortBy={sortBy} 
                onSortChange={setSortBy} 
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                showSessions={showSessions}
                onShowSessionsChange={setShowSessions}
              />
            )}
            <TopicsList sortBy={sortBy} viewMode={viewMode} showSessions={showSessions} />
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default Topics;
