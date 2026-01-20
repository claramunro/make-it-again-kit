import { useState, useCallback, useMemo, useEffect } from 'react';
import { SidebarV2 } from '@/components/SidebarV2';
import { SessionsHeader, SessionSortOption } from '@/components/SessionsHeader';
import { SessionList } from '@/components/SessionList';
import { useSessions } from '@/contexts/SessionContext';
import { SessionDetailPanel } from '@/components/SessionDetailPanel';
import { SessionSelectionBar } from '@/components/SessionSelectionBar';
import { sortSessions } from '@/utils/sessionSorting';

const SELECTED_SESSION_KEY = 'sessions-master-selected-id';

const SessionsMasterDetail = () => {
  const { sessionGroups } = useSessions();
  const [selectedSessionId, setSelectedSessionIdState] = useState<string>('');
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SessionSortOption>('most-recent');

  const sortedGroups = useMemo(() => sortSessions(sessionGroups, sortBy), [sessionGroups, sortBy]);

  const totalSessions = sessionGroups.reduce(
    (acc, group) => acc + group.sessions.length,
    0
  );

  const allSessionIds = useMemo(() => 
    sessionGroups.flatMap(group => group.sessions.map(s => s.id)),
    [sessionGroups]
  );

  const setSelectedSessionId = (id: string) => {
    setSelectedSessionIdState(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SELECTED_SESSION_KEY, id);
    }
  };

  // If sessions load/change and the previously selected session no longer exists, clear selection.
  useEffect(() => {
    if (selectionMode || !selectedSessionId) return;

    const isValid = allSessionIds.includes(selectedSessionId);
    if (!isValid) {
      setSelectedSessionId('');
    }
  }, [allSessionIds, selectedSessionId, selectionMode]);

  // Handle session selection - toggle off if clicking the same card
  const handleSelectSession = (id: string) => {
    if (id === selectedSessionId) {
      setSelectedSessionId('');
    } else {
      setSelectedSessionId(id);
    }
  };

  const handleToggleSelectionMode = useCallback(() => {
    setSelectionMode(prev => !prev);
    setSelectedIds(new Set());
  }, []);

  const handleCheckChange = useCallback((id: string, checked: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedIds.size === allSessionIds.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(allSessionIds));
    }
  }, [selectedIds.size, allSessionIds]);

  const handleAssignTopic = useCallback((topicId: string | null) => {
    console.log('Assign topic:', topicId, 'to sessions:', Array.from(selectedIds));
    setSelectionMode(false);
    setSelectedIds(new Set());
  }, [selectedIds]);

  const handleRemoveTopic = useCallback(() => {
    console.log('Remove topic from sessions:', Array.from(selectedIds));
    setSelectionMode(false);
    setSelectedIds(new Set());
  }, [selectedIds]);

  const handleDelete = useCallback(() => {
    console.log('Delete sessions:', Array.from(selectedIds));
    setSelectionMode(false);
    setSelectedIds(new Set());
  }, [selectedIds]);

  return (
    <div className="flex h-screen bg-card">
      <SidebarV2 />
      
      <div className="relative flex flex-1 flex-col overflow-hidden">
        
        <main className="flex flex-1 flex-col overflow-hidden bg-background">
          {/* Sessions Header - Full Width */}
          <div className="shrink-0 border-b border-border px-6 pt-3 pb-2">
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
          </div>
          
          {/* Content: List + Detail side by side */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left: Sessions List */}
            <div className={`w-80 xl:w-96 shrink-0 overflow-y-auto border-r border-border p-4 h-full ${selectionMode && selectedIds.size > 0 ? 'pb-24' : ''}`}>
              <SessionList 
                groups={sortedGroups} 
                selectedSessionId={selectionMode ? null : selectedSessionId}
                onSelectSession={selectionMode ? undefined : handleSelectSession}
                selectionMode={selectionMode}
                selectedIds={selectedIds}
                onCheckChange={handleCheckChange}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
            
            {/* Right: Session Detail */}
            <div className="flex-1 overflow-hidden">
              {selectedSessionId && !selectionMode ? (
                <SessionDetailPanel sessionId={selectedSessionId} />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  {selectionMode ? 'Select sessions to perform actions' : 'Select a session to view details'}
                </div>
              )}
            </div>
          </div>
        </main>

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
    </div>
  );
};

export default SessionsMasterDetail;
