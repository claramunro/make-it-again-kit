import { useState, useMemo, useEffect } from 'react';
import { FileVideo } from 'lucide-react';
import { SidebarV2 } from '@/components/SidebarV2';
import { MobileHeader } from '@/components/Header';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { HighlightGroup, SessionGroup } from '@/components/HighlightGroup';
import { HighlightDetailPanel } from '@/components/HighlightDetailPanel';
import { HighlightDetailDrawer } from '@/components/HighlightDetailDrawer';
import { highlights, Highlight } from '@/data/highlights';
import { topics } from '@/data/topics';
import { sessionGroups as sessionGroupsData } from '@/data/sessions';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTabContext } from '@/contexts/TabContext';
import { cn } from '@/lib/utils';
import { WallpaperType } from '@/types/session';

// Create a map of session metadata by title for quick lookup
const sessionMetaMap = new Map<string, { time: string; duration: string }>();
sessionGroupsData.forEach(group => {
  group.sessions.forEach(session => {
    sessionMetaMap.set(session.title, { time: session.time, duration: session.duration });
  });
});

// Create a map of topics for quick lookup
const topicsMap = new Map(topics.map(t => [t.id, t]));

type GroupBy = 'sessions' | 'topics';

const HIGHLIGHTS_GROUP_BY_KEY = 'highlights-group-by';

interface HighlightGroupData {
  id: string;
  title: string;
  icon?: string;
  description?: string;
  wallpaper?: WallpaperType;
  isShared?: boolean;
  topicId?: string;
  highlights: Highlight[];
  sessionGroups?: SessionGroup[];
}

const HighlightsPage = () => {
  const isMobile = useIsMobile();
  const { 
    highlightsGroupBy: groupBy, 
    setHighlightsGroupBy: setGroupBy,
    selectedHighlightId,
    setSelectedHighlightId,
  } = useTabContext();
  
  // Derive selectedHighlight from persisted ID
  const selectedHighlight = useMemo(() => {
    if (!selectedHighlightId) return null;
    return highlights.find(h => h.id === selectedHighlightId) || null;
  }, [selectedHighlightId]);

  const [drawerOpen, setDrawerOpen] = useState(false);


  // Group highlights by topic or session
  const groupedHighlights = useMemo((): HighlightGroupData[] => {
    if (groupBy === 'sessions') {
      // Group by session (flat structure)
      const groups: Record<string, { title: string; highlights: Highlight[] }> = {};

      highlights.forEach((highlight) => {
        const key = highlight.sessionId;
        const title = highlight.sessionTitle;

        if (!groups[key]) {
          groups[key] = { title, highlights: [] };
        }
        groups[key].highlights.push(highlight);
      });

      return Object.entries(groups).map(([key, group]) => ({
        id: key,
        title: group.title,
        highlights: group.highlights,
      }));
    } else {
      // Group by topic with nested session groups
      const topicGroups: Record<string, {
        title: string;
        icon?: string;
        description?: string;
        wallpaper?: WallpaperType;
        isShared?: boolean;
        topicId?: string;
        sessions: Record<string, { sessionId: string; sessionTitle: string; highlights: Highlight[] }>;
      }> = {};

      highlights.forEach((highlight) => {
        const topicKey = highlight.topicId || 'uncategorized';
        const topicTitle = highlight.topicName || 'Uncategorized';
        const topicIcon = highlight.topicIcon;
        
        // Get full topic data from topics
        const topicData = topicKey !== 'uncategorized' ? topicsMap.get(topicKey) : null;

        if (!topicGroups[topicKey]) {
          topicGroups[topicKey] = { 
            title: topicTitle, 
            icon: topicIcon,
            description: topicData?.description,
            wallpaper: topicData?.wallpaper,
            isShared: !!topicData?.sharedBy,
            topicId: topicKey !== 'uncategorized' ? topicKey : undefined,
            sessions: {} 
          };
        }

        const sessionKey = highlight.sessionId;
        if (!topicGroups[topicKey].sessions[sessionKey]) {
          topicGroups[topicKey].sessions[sessionKey] = {
            sessionId: highlight.sessionId,
            sessionTitle: highlight.sessionTitle,
            highlights: [],
          };
        }
        topicGroups[topicKey].sessions[sessionKey].highlights.push(highlight);
      });

      return Object.entries(topicGroups).map(([key, group]) => ({
        id: key,
        title: group.title,
        icon: group.icon,
        description: group.description,
        wallpaper: group.wallpaper,
        isShared: group.isShared,
        topicId: group.topicId,
        highlights: [], // Empty for topic view, we use sessionGroups instead
        sessionGroups: Object.values(group.sessions).map((session) => ({
          ...session,
          sessionMeta: sessionMetaMap.get(session.sessionTitle),
        })),
      }));
    }
  }, [groupBy]);

  const handleSelectHighlight = (highlight: Highlight) => {
    if (highlight.id === selectedHighlightId) {
      setSelectedHighlightId(null);
    } else {
      setSelectedHighlightId(highlight.id);
      if (isMobile) {
        setDrawerOpen(true);
      }
    }
  };

  return (
    <div className="flex h-screen bg-card overflow-hidden">
      {!isMobile && <SidebarV2 />}
      
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <MobileHeader title="Highlights" count={highlights.length} />
        
        <main className="flex-1 bg-background overflow-y-auto p-6">
          {/* Desktop Header */}
          {!isMobile && (
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-foreground">Highlights</h1>
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

          {/* Content area with list and detail panel */}
          <div className="flex gap-6">
            {/* Highlights List - Fixed width */}
            <div className={cn(
              "space-y-4 min-w-0",
              isMobile ? "flex-1" : "w-[calc(100%-400px)] shrink-0"
            )}>
              {groupedHighlights.map((group, index) => (
                <HighlightGroup
                  key={group.id}
                  title={group.title}
                  icon={group.icon}
                  description={group.description}
                  wallpaper={group.wallpaper}
                  isShared={group.isShared}
                  topicId={group.topicId}
                  SessionIcon={groupBy === 'sessions' ? FileVideo : undefined}
                  sessionMeta={groupBy === 'sessions' ? sessionMetaMap.get(group.title) : undefined}
                  sessionId={groupBy === 'sessions' ? group.id : undefined}
                  highlights={group.highlights}
                  sessionGroups={group.sessionGroups}
                  selectedId={selectedHighlight?.id || null}
                  onSelectHighlight={handleSelectHighlight}
                  defaultExpanded={index === 0}
                />
              ))}
            </div>

            {/* Desktop Detail Panel - Fixed width on right */}
            {!isMobile && (
              <div className="w-[376px] shrink-0">
                {selectedHighlight ? (
                  <div className="sticky top-0">
                    <HighlightDetailPanel 
                      highlight={selectedHighlight} 
                      onClose={() => setSelectedHighlightId(null)}
                      showCloseButton
                    />
                  </div>
                ) : (
                  <div className="sticky top-0 h-[calc(100vh-220px)] rounded-lg border border-border bg-card flex items-center justify-center">
                    <span className="text-muted-foreground">Select a highlight to view details</span>
                  </div>
                )}
              </div>
            )}
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