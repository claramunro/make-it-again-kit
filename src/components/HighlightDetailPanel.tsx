import { Lightbulb, Quote, BarChart3, FileText, Share, Trash2, ChevronRight, X } from 'lucide-react';
import { Highlight } from '@/data/highlights';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HighlightDetailPanelProps {
  highlight: Highlight;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export function HighlightDetailPanel({ highlight, onClose, showCloseButton }: HighlightDetailPanelProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header with session link */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <Link 
          to={`/session/${highlight.sessionId}`}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth"
        >
          Session <ChevronRight className="h-4 w-4" />
        </Link>
        {showCloseButton && (
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-y-auto p-5 pb-8 space-y-6">
        {/* Main Idea */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-foreground">Main Idea</h3>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm leading-relaxed text-foreground">
              {highlight.description}
            </p>
          </div>
        </div>

        {/* Original Context */}
        {highlight.originalContext && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Quote className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-foreground">Original Context</h3>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm leading-relaxed text-muted-foreground italic">
                {highlight.originalContext}
              </p>
            </div>
          </div>
        )}

        {/* Analysis */}
        {highlight.analysis && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-foreground">Analysis</h3>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
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
