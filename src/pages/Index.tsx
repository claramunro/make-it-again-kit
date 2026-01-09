import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarV2 } from '@/components/SidebarV2';
import { MobileHeader } from '@/components/Header';
import { SessionsHeader, SessionSortOption } from '@/components/SessionsHeader';
import { SessionList } from '@/components/SessionList';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { SessionSelectionBar } from '@/components/SessionSelectionBar';
import { useSessions } from '@/contexts/SessionContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIsXlScreen } from '@/hooks/use-xl-screen';
import SessionsMasterDetail from './SessionsMasterDetail';
import { sortSessions } from '@/utils/sessionSorting';

const SELECTED_SESSION_KEY = 'sessions-master-selected-id';

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isXlScreen = useIsXlScreen();
  const { sessionGroups } = useSessions();
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SessionSortOption>('most-recent');

  const sortedGroups = useMemo(() => sortSessions(sessionGroups, sortBy), [sessionGroups, sortBy]);

  const totalSessions = sessionGroups.reduce(
    (acc, group) => acc + group.sessions.length,
    0
  );

  const allSessionIds = sessionGroups.flatMap(group => group.sessions.map(s => s.id));

  // On smaller screens, redirect to the last selected session's detail view.
  // Must be called before early return to respect Rules of Hooks.
  useEffect(() => {
    if (isXlScreen || selectionMode) return;

    const saved = typeof window !== 'undefined' ? localStorage.getItem(SELECTED_SESSION_KEY) : null;
    if (saved) {
      navigate(`/session/${saved}`, { replace: true });
    }
  }, [isXlScreen, navigate, selectionMode]);

  // Use master-detail layout on XL screens
  if (isXlScreen) {
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

            <SessionList 
              groups={sortedGroups}
              selectionMode={selectionMode}
              selectedIds={selectedIds}
              onCheckChange={handleCheckChange}
              sortBy={sortBy}
              onSortChange={setSortBy}
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
