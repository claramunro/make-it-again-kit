import { Sidebar } from '@/components/Sidebar';
import { Header, MobileHeader } from '@/components/Header';
import { HighlightCard } from '@/components/HighlightCard';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { highlights } from '@/data/highlights';
import { useIsMobile } from '@/hooks/use-mobile';

const Highlights = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-card">
      {!isMobile && <Sidebar />}
      
      <div className="flex flex-1 flex-col">
        <MobileHeader title="Highlights" count={highlights.length} />
        <Header />
        
        <main className="flex-1 rounded-tl-2xl bg-background p-4 pb-24 md:p-6 md:pb-6">
          <div className="mx-auto max-w-4xl">
            {/* Desktop Header */}
            {!isMobile && (
              <div className="mb-6 flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">Highlights</h1>
                <span className="rounded-md bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
                  {highlights.length}
                </span>
              </div>
            )}

            {/* Highlights list */}
            <div className="space-y-4">
              {highlights.map((highlight) => (
                <HighlightCard key={highlight.id} highlight={highlight} />
              ))}
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default Highlights;
