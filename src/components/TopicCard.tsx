import { Star, ChevronRight, FileText } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Topic } from '@/data/topics';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  topic: Topic;
}

// Colors for emoji container (border stronger, fill transparent)
const topicColors: Record<string, { border: string; bg: string }> = {
  '🎨': { border: 'border-pink-400', bg: 'bg-pink-400/15' },
  '📦': { border: 'border-emerald-400', bg: 'bg-emerald-400/15' },
  '🏋️': { border: 'border-blue-400', bg: 'bg-blue-400/15' },
  '☕': { border: 'border-amber-400', bg: 'bg-amber-400/15' },
  '🐶': { border: 'border-yellow-400', bg: 'bg-yellow-400/15' },
  '📅': { border: 'border-amber-400', bg: 'bg-amber-400/15' },
  '🚀': { border: 'border-violet-400', bg: 'bg-violet-400/15' },
  '💻': { border: 'border-slate-400', bg: 'bg-slate-400/15' },
  '📢': { border: 'border-orange-400', bg: 'bg-orange-400/15' },
  '🤝': { border: 'border-teal-400', bg: 'bg-teal-400/15' },
  '💰': { border: 'border-green-400', bg: 'bg-green-400/15' },
  '👥': { border: 'border-indigo-400', bg: 'bg-indigo-400/15' },
  '🔬': { border: 'border-cyan-400', bg: 'bg-cyan-400/15' },
  '⚖️': { border: 'border-gray-400', bg: 'bg-gray-400/15' },
  '🎉': { border: 'border-rose-400', bg: 'bg-rose-400/15' },
};

const defaultColors = { border: 'border-slate-400', bg: 'bg-slate-400/15' };

export function TopicCard({ topic }: TopicCardProps) {
  const navigate = useNavigate();
  const colors = topicColors[topic.icon] || defaultColors;

  const handleCardClick = () => {
    navigate(`/topic/${topic.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group rounded-xl border border-border bg-card overflow-hidden transition-smooth hover:border-primary/20 hover:shadow-md cursor-pointer"
    >
      {/* Content area */}
      <div className="p-4">
        {/* Header with star */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Emoji container with colored border and transparent fill */}
            <div className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg border-2',
              colors.border,
              colors.bg
            )}>
              <span className="text-lg">{topic.icon}</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{topic.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">{topic.date}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
            </div>
          </div>
          <button 
            className="p-1.5 rounded-full hover:bg-muted transition-smooth"
            onClick={(e) => e.stopPropagation()}
          >
            <Star 
              className={cn(
                'h-4 w-4 transition-smooth',
                topic.isFavorite 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-muted-foreground hover:text-yellow-400'
              )} 
            />
          </button>
        </div>

        {/* Sessions */}
        <div className="space-y-2">
          {topic.sessions?.slice(0, 2).map((session) => (
            <Link
              key={session.id}
              to={`/topic/${topic.id}?tab=sessions`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-3 rounded-lg bg-muted/50 hover:bg-muted p-3 transition-smooth group/session"
            >
              {/* Session icon */}
              <div className="flex h-6 w-6 shrink-0 items-center justify-center text-muted-foreground">
                <FileText className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{session.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {session.date} · {session.duration}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover/session:opacity-100 transition-opacity shrink-0" />
            </Link>
          ))}
          
          {/* Show more link if there are more sessions */}
          {topic.sessionCount > 2 && (
            <div className="w-full text-center text-xs text-muted-foreground py-2">
              +{topic.sessionCount - 2} more session{topic.sessionCount - 2 !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
