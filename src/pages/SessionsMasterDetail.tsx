import { useState, useCallback, useMemo } from 'react';
import { SidebarV2 } from '@/components/SidebarV2';
import { SessionsHeader } from '@/components/SessionsHeader';
import { SessionList } from '@/components/SessionList';
import { sessionGroups } from '@/data/sessions';
import { SessionDetailPanel } from '@/components/SessionDetailPanel';
import { SessionSelectionBar } from '@/components/SessionSelectionBar';

const SessionsMasterDetail = () => {
  const [selectedSessionId, setSelectedSessionId] = useState<string>(
    sessionGroups[0]?.sessions[0]?.id || ''
  );
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const totalSessions = sessionGroups.reduce(
    (acc, group) => acc + group.sessions.length,
    0
  );

  const allSessionIds = useMemo(() => 
    sessionGroups.flatMap(group => group.sessions.map(s => s.id)),
    []
  );

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
      
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-tl-2xl bg-background">
        
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Sessions Header - Full Width */}
          <div className="shrink-0 border-b border-border px-6 pt-6 pb-4">
            <SessionsHeader 
              totalSessions={totalSessions}
              selectionMode={selectionMode}
              selectedCount={selectedIds.size}
              onToggleSelectionMode={handleToggleSelectionMode}
              onSelectAll={handleSelectAll}
              allSelected={selectedIds.size === allSessionIds.length}
            />
          </div>
          
          {/* Content: List + Detail side by side */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left: Sessions List */}
            <div className={`w-96 shrink-0 overflow-auto border-r border-border p-4 ${selectionMode && selectedIds.size > 0 ? 'pb-24' : ''}`}>
              <SessionList 
                groups={sessionGroups} 
                selectedSessionId={selectionMode ? null : selectedSessionId}
                onSelectSession={selectionMode ? undefined : setSelectedSessionId}
                selectionMode={selectionMode}
                selectedIds={selectedIds}
                onCheckChange={handleCheckChange}
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
