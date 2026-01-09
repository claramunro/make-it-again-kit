import { Lightbulb, Quote, BarChart3, ChevronRight } from 'lucide-react';
import { Highlight } from '@/data/highlights';
import { Link } from 'react-router-dom';

interface HighlightDetailPanelProps {
  highlight: Highlight;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export function HighlightDetailPanel({ highlight }: HighlightDetailPanelProps) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden h-full max-h-full">
      {/* Header with session link - inside the card */}
        <div className="flex items-center justify-between px-3 py-2 shrink-0">
          <Link 
            to={`/session/${highlight.sessionId}`}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            Session <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 space-y-3">
          {/* Main Idea */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Lightbulb className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-foreground text-sm">Main Idea</h3>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-sm leading-relaxed text-foreground">
                {highlight.description}
              </p>
            </div>
          </div>

          {/* Original Context */}
          {highlight.originalContext && (
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Quote className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-foreground text-sm">Original Context</h3>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  {highlight.originalContext}
                </p>
              </div>
            </div>
          )}

          {/* Analysis */}
          {highlight.analysis && (
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <BarChart3 className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-foreground text-sm">Analysis</h3>
              </div>
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {highlight.analysis}
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}