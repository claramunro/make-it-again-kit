import { useState, useMemo, useEffect } from 'react';
import { SidebarV2 } from '@/components/SidebarV2';
import { MobileHeader } from '@/components/Header';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { HighlightGroup } from '@/components/HighlightGroup';
import { HighlightDetailPanel } from '@/components/HighlightDetailPanel';
import { HighlightDetailDrawer } from '@/components/HighlightDetailDrawer';
import { highlights, Highlight } from '@/data/highlights';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type GroupBy = 'sessions' | 'topics';

const HighlightsPage = () => {
  const isMobile = useIsMobile();
  const [groupBy, setGroupBy] = useState<GroupBy>('sessions');
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Select the first highlight on page load (desktop only)
  useEffect(() => {
    if (!isMobile && highlights.length > 0 && !selectedHighlight) {
      setSelectedHighlight(highlights[0]);
    }
  }, [isMobile, selectedHighlight]);

  // Group highlights by topic or session
  const groupedHighlights = useMemo(() => {
    const groups: Record<string, { title: string; icon?: string; highlights: Highlight[] }> = {};

    highlights.forEach((highlight) => {
      const key = groupBy === 'topics' 
        ? highlight.topicId || 'uncategorized'
        : highlight.sessionId;
      
      const title = groupBy === 'topics'
        ? highlight.topicName || 'Uncategorized'
        : highlight.sessionTitle;
      
      const icon = groupBy === 'topics' ? highlight.topicIcon : undefined;

      if (!groups[key]) {
        groups[key] = { title, icon, highlights: [] };
      }
      groups[key].highlights.push(highlight);
    });

    return Object.entries(groups).map(([key, group]) => ({
      id: key,
      ...group,
    }));
  }, [groupBy]);

  const handleSelectHighlight = (highlight: Highlight) => {
    setSelectedHighlight(highlight);
    if (isMobile) {
      setDrawerOpen(true);
    }
  };

  return (
    <div className="flex h-screen bg-card overflow-hidden">
      {!isMobile && <SidebarV2 />}
      
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <MobileHeader title="Highlights" count={highlights.length} />
        
        <main className="flex-1 bg-background overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-5xl w-full">
              {/* Desktop Header */}
              {!isMobile && (
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl font-semibold text-foreground">Highlights</h1>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Sort By</span>
                    <span className="text-sm font-medium text-foreground">Recent</span>
                  </div>
                </div>
              )}

              {/* Group By Toggle */}
              <div className="mb-6">
                <div className="inline-flex rounded-lg bg-muted p-1">
                  <button
                    onClick={() => setGroupBy('sessions')}
                    className={cn(
                      'rounded-md px-4 py-2 text-sm font-medium transition-smooth',
                      groupBy === 'sessions'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Sessions
                  </button>
                  <button
                    onClick={() => setGroupBy('topics')}
                    className={cn(
                      'rounded-md px-4 py-2 text-sm font-medium transition-smooth',
                      groupBy === 'topics'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Topics
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex gap-6">
                {/* Highlights List */}
                <div className={cn(
                  'space-y-4',
                  !isMobile && selectedHighlight ? 'flex-1' : 'w-full'
                )}>
                  {groupedHighlights.map((group, index) => (
                    <HighlightGroup
                      key={group.id}
                      title={group.title}
                      icon={group.icon}
                      highlights={group.highlights}
                      selectedId={selectedHighlight?.id || null}
                      onSelectHighlight={handleSelectHighlight}
                      defaultExpanded={index === 0}
                    />
                  ))}
                </div>

                {/* Desktop Detail Panel */}
                {!isMobile && selectedHighlight && (
                  <div className="w-[400px] shrink-0 rounded-xl border border-border bg-card sticky top-0 max-h-[calc(100vh-200px)] flex flex-col overflow-hidden">
                    <HighlightDetailPanel 
                      highlight={selectedHighlight} 
                      onClose={() => setSelectedHighlight(null)}
                      showCloseButton
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Detail Drawer */}
      <HighlightDetailDrawer
        highlight={selectedHighlight}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />

      <MobileBottomNav />
    </div>
  );
};

export default HighlightsPage;