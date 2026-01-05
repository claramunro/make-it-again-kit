import { useState, useCallback, useMemo } from 'react';
import { SidebarV2 } from '@/components/SidebarV2';
import { MobileHeader } from '@/components/Header';
import { SessionsHeader, SessionSortOption } from '@/components/SessionsHeader';
import { SessionList } from '@/components/SessionList';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { SessionSelectionBar } from '@/components/SessionSelectionBar';
import { sessionGroups } from '@/data/sessions';
import { topics } from '@/data/topics';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIsLargeScreen } from '@/hooks/use-large-screen';
import SessionsMasterDetail from './SessionsMasterDetail';
import { sortSessions } from '@/utils/sessionSorting';
import { cn } from '@/lib/utils';
import { SessionCard } from '@/components/SessionCard';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Session
} from '@/types/session';

type GroupBy = 'sessions' | 'topics';

const Index = () => {
  const isMobile = useIsMobile();
  const isLargeScreen = useIsLargeScreen();
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SessionSortOption>('most-recent');
  const [groupBy, setGroupBy] = useState<GroupBy>('sessions');
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set(['1'])); // First topic expanded by default

  const sortedGroups = useMemo(() => sortSessions(sessionGroups, sortBy), [sortBy]);

  // Flatten all sessions for grouping by topics
  const allSessions = useMemo(() => {
    return sessionGroups.flatMap(group => group.sessions);
  }, []);

  // Group sessions by topic
  const sessionsByTopic = useMemo(() => {
    const groups: Record<string, { topic: typeof topics[0]; sessions: Session[] }> = {};
    
    // Initialize with all topics
    topics.forEach(topic => {
      groups[topic.id] = { topic, sessions: [] };
    });
    
    // Add uncategorized group
    groups['uncategorized'] = { 
      topic: { id: 'uncategorized', name: 'Uncategorized', icon: '📁', sessionCount: 0, date: '' } as typeof topics[0],
      sessions: [] 
    };
    
    // Assign sessions to topics
    allSessions.forEach(session => {
      const topicId = session.topicId || 'uncategorized';
      if (groups[topicId]) {
        groups[topicId].sessions.push(session);
      } else {
        groups['uncategorized'].sessions.push(session);
      }
    });
    
    // Filter out topics with no sessions and sort by session count
    return Object.values(groups)
      .filter(group => group.sessions.length > 0)
      .sort((a, b) => b.sessions.length - a.sessions.length);
  }, [allSessions]);

  const totalSessions = sessionGroups.reduce(
    (acc, group) => acc + group.sessions.length,
    0
  );

  const allSessionIds = sessionGroups.flatMap(group => group.sessions.map(s => s.id));

  // Use master-detail layout on large screens
  if (isLargeScreen) {
    return <SessionsMasterDetail />;
  }

  const handleToggleSelectionMode = () => {
    setSelectionMode(prev => !prev);
    setSelectedIds(new Set());
  };

  const handleCheckChange = (id: string, checked: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === allSessionIds.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allSessionIds));
    }
  };

  const handleAssignTopic = (topicId: string | null) => {
    console.log('Assign topic:', topicId, 'to sessions:', Array.from(selectedIds));
    setSelectionMode(false);
    setSelectedIds(new Set());
  };

  const handleRemoveTopic = () => {
    console.log('Remove topic from sessions:', Array.from(selectedIds));
    setSelectionMode(false);
    setSelectedIds(new Set());
  };

  const handleDelete = () => {
    console.log('Delete sessions:', Array.from(selectedIds));
    setSelectionMode(false);
    setSelectedIds(new Set());
  };

  const toggleTopicExpanded = (topicId: string) => {
    setExpandedTopics(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  return (
    <div className="relative flex min-h-screen bg-card">
      {/* Desktop Sidebar */}
      {!isMobile && <SidebarV2 />}
      
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <MobileHeader title="Sessions" count={totalSessions} />
        
        <main className={`flex-1 bg-background p-6 ${selectionMode && selectedIds.size > 0 ? 'pb-24' : ''}`}>
          <div className="mx-auto max-w-5xl">
            {/* Desktop Sessions Header */}
            {!isMobile && (
              <SessionsHeader 
                totalSessions={totalSessions}
                selectionMode={selectionMode}
                selectedCount={selectedIds.size}
                onToggleSelectionMode={handleToggleSelectionMode}
                onSelectAll={handleSelectAll}
                allSelected={selectedIds.size === allSessionIds.length}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
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

            {/* Content based on groupBy */}
            {groupBy === 'sessions' ? (
              <SessionList 
                groups={sortedGroups}
                selectionMode={selectionMode}
                selectedIds={selectedIds}
                onCheckChange={handleCheckChange}
              />
            ) : (
              <div className="space-y-4">
                {sessionsByTopic.map((group, index) => {
                  const isExpanded = expandedTopics.has(group.topic.id);
                  return (
                    <div key={group.topic.id} className="rounded-xl border border-border bg-card overflow-hidden">
                      {/* Topic Header */}
                      <button
                        onClick={() => toggleTopicExpanded(group.topic.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-smooth"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{group.topic.icon}</span>
                          <span className="font-medium text-foreground">{group.topic.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {group.sessions.length} session{group.sessions.length !== 1 ? 's' : ''}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </button>
                      
                      {/* Sessions List */}
                      {isExpanded && (
                        <div className="border-t border-border">
                          {group.sessions.map((session) => (
                            <div key={session.id} className="border-b border-border last:border-b-0">
                              <SessionCard
                                session={session}
                                selectionMode={selectionMode}
                                isChecked={selectedIds.has(session.id)}
                                onCheckChange={handleCheckChange}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      {!selectionMode && <MobileBottomNav />}

      {/* Selection Action Bar */}
      {selectionMode && selectedIds.size > 0 && (
        <SessionSelectionBar
          selectedCount={selectedIds.size}
          onAssignTopic={handleAssignTopic}
          onRemoveTopic={handleRemoveTopic}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Index;
