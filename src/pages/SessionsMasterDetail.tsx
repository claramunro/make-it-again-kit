import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { SessionsHeader } from '@/components/SessionsHeader';
import { SessionList } from '@/components/SessionList';
import { sessionGroups } from '@/data/sessions';
import { SessionDetailPanel } from '@/components/SessionDetailPanel';

const SessionsMasterDetail = () => {
  const [selectedSessionId, setSelectedSessionId] = useState<string>(
    sessionGroups[0]?.sessions[0]?.id || ''
  );

  const totalSessions = sessionGroups.reduce(
    (acc, group) => acc + group.sessions.length,
    0
  );

  return (
    <div className="flex min-h-screen bg-card">
      <Sidebar />
      
      <div className="flex flex-1 flex-col">
        <Header />
        
        <main className="flex flex-1 overflow-hidden rounded-tl-2xl bg-background">
          {/* Left: Sessions List */}
          <div className="w-96 shrink-0 overflow-auto border-r border-border p-4">
            <SessionsHeader totalSessions={totalSessions} />
            <SessionList 
              groups={sessionGroups} 
              selectedSessionId={selectedSessionId}
              onSelectSession={setSelectedSessionId}
            />
          </div>
          
          {/* Right: Session Detail */}
          <div className="flex-1 overflow-hidden">
            {selectedSessionId ? (
              <SessionDetailPanel sessionId={selectedSessionId} />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Select a session to view details
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SessionsMasterDetail;
