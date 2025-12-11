import { Clock, FileText } from 'lucide-react';
import { Highlight } from '@/data/highlights';

interface HighlightCardProps {
  highlight: Highlight;
}

export function HighlightCard({ highlight }: HighlightCardProps) {
  return (
    <div className="animate-fade-in rounded-xl border border-border bg-card p-5 transition-smooth hover:border-primary/20 hover:shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {highlight.datetime}
        </div>
        <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
          {highlight.timestamp}
        </span>
      </div>

      {/* Session reference */}
      <div className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <FileText className="h-4 w-4" />
        {highlight.sessionTitle}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-base font-semibold text-foreground">
        {highlight.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {highlight.description}
      </p>
    </div>
  );
}
