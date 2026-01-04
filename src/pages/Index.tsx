import { useState, useCallback } from 'react';
import { SidebarV2 } from '@/components/SidebarV2';
import { MobileHeader } from '@/components/Header';
import { SessionsHeader } from '@/components/SessionsHeader';
import { SessionList } from '@/components/SessionList';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { SessionSelectionBar } from '@/components/SessionSelectionBar';
import { sessionGroups } from '@/data/sessions';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIsLargeScreen } from '@/hooks/use-large-screen';
import SessionsMasterDetail from './SessionsMasterDetail';

const Index = () => {
  const isMobile = useIsMobile();
  const isLargeScreen = useIsLargeScreen();
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

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

  return (
    <div className="flex min-h-screen bg-card">
      {/* Desktop Sidebar */}
      {!isMobile && <SidebarV2 />}
      
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <MobileHeader title="Sessions" count={totalSessions} />
        
        <main className={`flex-1 rounded-tl-2xl bg-background p-6 ${selectionMode && selectedIds.size > 0 ? 'pb-24' : ''}`}>
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
              />
            )}
            <SessionList 
              groups={sessionGroups}
              selectionMode={selectionMode}
              selectedIds={selectedIds}
              onCheckChange={handleCheckChange}
            />
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
