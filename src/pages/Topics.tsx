import { useState } from 'react';
import { SidebarV2 } from '@/components/SidebarV2';
import { MobileHeader } from '@/components/Header';
import { TopicsHeader, TopicsList, TopicSortOption } from '@/components/TopicsList';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { useTopics } from '@/contexts/TopicContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIsXlScreen } from '@/hooks/use-xl-screen';
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TopicsMasterDetail from './TopicsMasterDetail';
import { ProBadge } from '@/components/ProBadge';

const Topics = () => {
  const isMobile = useIsMobile();
  const isXlScreen = useIsXlScreen();
  const { topics } = useTopics();
  const [sortBy, setSortBy] = useState<TopicSortOption>('last-activity');

  // Use master-detail layout only when there's enough horizontal space
  // (prevents the right-side chat column from overflowing at mid widths)
  if (isXlScreen) {
    return <TopicsMasterDetail />;
  }

  const mobileActions = (
    <>
      <ProBadge />
      <Button 
        size="sm" 
        className="h-8 gap-1 px-2 text-xs bg-orange-100 text-orange-600 border border-orange-400 hover:bg-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500 dark:hover:bg-orange-500/30"
      >
        <Plus className="h-3.5 w-3.5" />
        New
      </Button>
      <Button variant="outline" size="sm" className="h-8 gap-1 px-2 text-xs">
        <RefreshCw className="h-3.5 w-3.5" />
      </Button>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-card">
      {!isMobile && <SidebarV2 />}
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileHeader title="Topics" count={topics.length} actions={mobileActions} />
        
        <main className="flex-1 overflow-auto bg-background p-4 pb-24 md:p-6 md:pb-6">
          <div className="mx-auto max-w-5xl">
            {!isMobile && (
              <TopicsHeader 
                sortBy={sortBy} 
                onSortChange={setSortBy} 
              />
            )}
            <TopicsList sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default Topics;
