import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { SessionsHeader } from '@/components/SessionsHeader';
import { SessionList } from '@/components/SessionList';
import { sessionGroups } from '@/data/sessions';

const Index = () => {
  const totalSessions = sessionGroups.reduce(
    (acc, group) => acc + group.sessions.length,
    0
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-4xl">
            <SessionsHeader totalSessions={totalSessions} />
            <SessionList groups={sessionGroups} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
