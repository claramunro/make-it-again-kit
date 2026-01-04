import { SidebarV2 } from '@/components/SidebarV2';
import { MobileHeader } from '@/components/Header';
import { SessionsHeader } from '@/components/SessionsHeader';
import { SessionList } from '@/components/SessionList';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { sessionGroups } from '@/data/sessions';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIsLargeScreen } from '@/hooks/use-large-screen';
import SessionsMasterDetail from './SessionsMasterDetail';

const Index = () => {
  const isMobile = useIsMobile();
  const isLargeScreen = useIsLargeScreen();
  const totalSessions = sessionGroups.reduce(
    (acc, group) => acc + group.sessions.length,
    0
  );

  // Use master-detail layout on large screens
  if (isLargeScreen) {
    return <SessionsMasterDetail />;
  }

  return (
    <div className="flex min-h-screen bg-card">
      {/* Desktop Sidebar */}
      {!isMobile && <SidebarV2 />}
      
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <MobileHeader title="Sessions" count={totalSessions} />
        
        <main className="flex-1 rounded-tl-2xl bg-background p-4 pb-24 md:p-6 md:pb-6">
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
