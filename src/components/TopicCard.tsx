import { Star, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Topic } from '@/data/topics';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  topic: Topic;
}

const iconBgColors: Record<string, string> = {
  '🎨': 'bg-pink-500/10 dark:bg-pink-500/20',
  '📦': 'bg-emerald-500/10 dark:bg-emerald-500/20',
  '🏋️': 'bg-blue-500/10 dark:bg-blue-500/20',
  '☕': 'bg-amber-500/10 dark:bg-amber-500/20',
  '🐶': 'bg-amber-500/10 dark:bg-amber-500/20',
  '📅': 'bg-yellow-500/10 dark:bg-yellow-500/20',
  '🚀': 'bg-violet-500/10 dark:bg-violet-500/20',
  '💻': 'bg-slate-500/10 dark:bg-slate-500/20',
  '📢': 'bg-orange-500/10 dark:bg-orange-500/20',
  '🤝': 'bg-teal-500/10 dark:bg-teal-500/20',
  '💰': 'bg-green-500/10 dark:bg-green-500/20',
  '👥': 'bg-indigo-500/10 dark:bg-indigo-500/20',
  '🔬': 'bg-cyan-500/10 dark:bg-cyan-500/20',
  '⚖️': 'bg-gray-500/10 dark:bg-gray-500/20',
  '🎉': 'bg-rose-500/10 dark:bg-rose-500/20',
};

export function TopicCard({ topic }: TopicCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/topic/${topic.id}`);
  };

  return (
    <div 
      className={cn(
        'group rounded-xl border border-border bg-card p-4 transition-smooth hover:border-primary/20 hover:shadow-sm',
        iconBgColors[topic.icon] || 'bg-muted/30'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={handleCardClick}
          className="flex items-center gap-3 text-left hover:opacity-80 transition-smooth"
        >
          <span className="text-xl">{topic.icon}</span>
          <h3 className="text-sm font-semibold text-foreground">{topic.name}</h3>
        </button>
        <button className="p-1 hover:bg-background/50 rounded transition-smooth">
          <Star 
            className={cn(
              'h-5 w-5 transition-smooth',
              topic.isFavorite 
                ? 'fill-primary text-primary' 
                : 'text-muted-foreground hover:text-primary'
            )} 
          />
        </button>
      </div>

      {/* Sessions */}
      <div className="space-y-2">
        {topic.sessions?.slice(0, 2).map((session) => (
          <Link
            key={session.id}
            to={`/session/${session.id}`}
            className="flex items-center justify-between rounded-lg bg-background/60 hover:bg-background/80 p-3 transition-smooth group/session"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{session.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {session.date} · {session.duration}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover/session:opacity-100 transition-opacity shrink-0 ml-2" />
          </Link>
        ))}
        
        {/* Show more link if there are more sessions */}
        {topic.sessionCount > 2 && (
          <button
            onClick={handleCardClick}
            className="w-full text-center text-xs text-muted-foreground hover:text-foreground py-2 transition-smooth"
          >
            +{topic.sessionCount - 2} more session{topic.sessionCount - 2 !== 1 ? 's' : ''}
          </button>
        )}
      </div>
    </div>
  );
}
