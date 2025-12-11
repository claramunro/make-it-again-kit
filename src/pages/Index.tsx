import { Sidebar } from '@/components/Sidebar';
import { Header, MobileHeader } from '@/components/Header';
import { SessionsHeader } from '@/components/SessionsHeader';
import { SessionList } from '@/components/SessionList';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { sessionGroups } from '@/data/sessions';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  const totalSessions = sessionGroups.reduce(
    (acc, group) => acc + group.sessions.length,
    0
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}
      
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <MobileHeader title="Sessions" count={totalSessions} />
        
        {/* Desktop Header */}
        <Header />
        
        <main className="flex-1 overflow-auto p-4 pb-24 md:p-6 md:pb-6">
          <div className="mx-auto max-w-4xl">
            {/* Desktop Sessions Header */}
            {!isMobile && <SessionsHeader totalSessions={totalSessions} />}
            <SessionList groups={sessionGroups} />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
};

export default Index;
