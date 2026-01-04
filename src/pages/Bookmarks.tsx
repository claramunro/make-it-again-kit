import { useState, useMemo } from 'react';
import { SidebarV2 } from '@/components/SidebarV2';
import { Header, MobileHeader } from '@/components/Header';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { BookmarkGroup } from '@/components/BookmarkGroup';
import { BookmarkDetailPanel } from '@/components/BookmarkDetailPanel';
import { BookmarkDetailDrawer } from '@/components/BookmarkDetailDrawer';
import { bookmarks, Bookmark } from '@/data/bookmarks';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type GroupBy = 'sessions' | 'topics';

const Highlights = () => {
  const isMobile = useIsMobile();
  const [groupBy, setGroupBy] = useState<GroupBy>('sessions');
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Group bookmarks by topic or session
  const groupedBookmarks = useMemo(() => {
    const groups: Record<string, { title: string; icon?: string; bookmarks: Bookmark[] }> = {};

    bookmarks.forEach((bookmark) => {
      const key = groupBy === 'topics' 
        ? bookmark.topicId || 'uncategorized'
        : bookmark.sessionId;
      
      const title = groupBy === 'topics'
        ? bookmark.topicName || 'Uncategorized'
        : bookmark.sessionTitle;
      
      const icon = groupBy === 'topics' ? bookmark.topicIcon : undefined;

      if (!groups[key]) {
        groups[key] = { title, icon, bookmarks: [] };
      }
      groups[key].bookmarks.push(bookmark);
    });

    return Object.entries(groups).map(([key, group]) => ({
      id: key,
      ...group,
    }));
  }, [groupBy]);

  const handleSelectBookmark = (bookmark: Bookmark) => {
    setSelectedBookmark(bookmark);
    if (isMobile) {
      setDrawerOpen(true);
    }
  };

  return (
    <div className="flex h-screen bg-card overflow-hidden">
      {!isMobile && <SidebarV2 />}
      
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <MobileHeader title="Highlights" count={bookmarks.length} />
        <Header />
        
        <main className="flex-1 rounded-tl-2xl bg-background overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 pb-24 md:p-6 md:pb-6">
            <div className="mx-auto max-w-6xl w-full">
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
                {/* Bookmarks List */}
                <div className={cn(
                  'space-y-4',
                  !isMobile && selectedBookmark ? 'flex-1' : 'w-full'
                )}>
                  {groupedBookmarks.map((group, index) => (
                    <BookmarkGroup
                      key={group.id}
                      title={group.title}
                      icon={group.icon}
                      bookmarks={group.bookmarks}
                      selectedId={selectedBookmark?.id || null}
                      onSelectBookmark={handleSelectBookmark}
                      defaultExpanded={index === 0}
                    />
                  ))}
                </div>

                {/* Desktop Detail Panel */}
                {!isMobile && selectedBookmark && (
                  <div className="w-[400px] shrink-0 rounded-xl border border-border bg-card sticky top-0 max-h-[calc(100vh-200px)] flex flex-col overflow-hidden">
                    <BookmarkDetailPanel 
                      bookmark={selectedBookmark} 
                      onClose={() => setSelectedBookmark(null)}
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
      <BookmarkDetailDrawer
        bookmark={selectedBookmark}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />

      <MobileBottomNav />
    </div>
  );
};

export default Highlights;
