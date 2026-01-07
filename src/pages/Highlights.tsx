import { useState, useMemo, useEffect } from 'react';
import { AudioLines } from 'lucide-react';
import { SidebarV2 } from '@/components/SidebarV2';
import { MobileHeader } from '@/components/Header';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { HighlightGroup, SessionGroup } from '@/components/HighlightGroup';
import { HighlightDetailPanel } from '@/components/HighlightDetailPanel';
import { HighlightDetailDrawer } from '@/components/HighlightDetailDrawer';
import { highlights, Highlight } from '@/data/highlights';
import { sessionGroups as sessionGroupsData } from '@/data/sessions';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Create a map of session metadata by title for quick lookup
const sessionMetaMap = new Map<string, { time: string; duration: string }>();
sessionGroupsData.forEach(group => {
  group.sessions.forEach(session => {
    sessionMetaMap.set(session.title, { time: session.time, duration: session.duration });
  });
});

type GroupBy = 'sessions' | 'topics';

const HIGHLIGHTS_GROUP_BY_KEY = 'highlights-group-by';

interface HighlightGroupData {
  id: string;
  title: string;
  icon?: string;
  highlights: Highlight[];
  sessionGroups?: SessionGroup[];
}

const HighlightsPage = () => {
  const isMobile = useIsMobile();
  const [groupBy, setGroupBy] = useState<GroupBy>(() => {
    const saved = localStorage.getItem(HIGHLIGHTS_GROUP_BY_KEY);
    return (saved === 'sessions' || saved === 'topics') ? saved : 'sessions';
  });
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Select the first highlight on page load (desktop only)
  useEffect(() => {
    if (!isMobile && highlights.length > 0 && !selectedHighlight) {
      setSelectedHighlight(highlights[0]);
    }
  }, [isMobile, selectedHighlight]);

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
        sessions: Record<string, { sessionId: string; sessionTitle: string; highlights: Highlight[] }>;
      }> = {};

      highlights.forEach((highlight) => {
        const topicKey = highlight.topicId || 'uncategorized';
        const topicTitle = highlight.topicName || 'Uncategorized';
        const topicIcon = highlight.topicIcon;

        if (!topicGroups[topicKey]) {
          topicGroups[topicKey] = { title: topicTitle, icon: topicIcon, sessions: {} };
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
        highlights: [], // Empty for topic view, we use sessionGroups instead
        sessionGroups: Object.values(group.sessions).map((session) => ({
          ...session,
          sessionMeta: sessionMetaMap.get(session.sessionTitle),
        })),
      }));
    }
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
        
        <main className="flex-1 bg-background overflow-y-auto p-6">
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
                onClick={() => {
                  setGroupBy('sessions');
                  localStorage.setItem(HIGHLIGHTS_GROUP_BY_KEY, 'sessions');
                }}
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
                onClick={() => {
                  setGroupBy('topics');
                  localStorage.setItem(HIGHLIGHTS_GROUP_BY_KEY, 'topics');
                }}
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
            {/* Highlights List */}
            <div className={cn("space-y-4 flex-1 min-w-0", !isMobile && selectedHighlight && "max-w-[calc(100%-400px)]")}>
              {groupedHighlights.map((group, index) => (
                <HighlightGroup
                  key={group.id}
                  title={group.title}
                  icon={group.icon}
                  SessionIcon={groupBy === 'sessions' ? AudioLines : undefined}
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

            {/* Desktop Detail Panel */}
            {!isMobile && selectedHighlight && (
              <div className="w-[376px] shrink-0 sticky top-0 self-start">
                <HighlightDetailPanel 
                  highlight={selectedHighlight} 
                  onClose={() => setSelectedHighlight(null)}
                  showCloseButton
                />
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