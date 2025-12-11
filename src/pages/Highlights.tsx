import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { HighlightCard } from '@/components/HighlightCard';
import { highlights } from '@/data/highlights';

const Highlights = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <h1 className="text-xl font-semibold text-foreground">Highlights</h1>
              <span className="rounded-md bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
                {highlights.length}
              </span>
            </div>

            {/* Highlights list */}
            <div className="space-y-4">
              {highlights.map((highlight) => (
                <HighlightCard key={highlight.id} highlight={highlight} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Highlights;
