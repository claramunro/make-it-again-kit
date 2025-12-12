import { Star, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Topic } from '@/data/topics';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  topic: Topic;
}

const iconBorderColors: Record<string, string> = {
  '🎨': 'border-l-pink-500',
  '📦': 'border-l-emerald-500',
  '🏋️': 'border-l-blue-500',
  '☕': 'border-l-amber-500',
  '🐶': 'border-l-amber-500',
  '📅': 'border-l-yellow-500',
  '🚀': 'border-l-violet-500',
  '💻': 'border-l-slate-500',
  '📢': 'border-l-orange-500',
  '🤝': 'border-l-teal-500',
  '💰': 'border-l-green-500',
  '👥': 'border-l-indigo-500',
  '🔬': 'border-l-cyan-500',
  '⚖️': 'border-l-gray-500',
  '🎉': 'border-l-rose-500',
};

export function TopicCard({ topic }: TopicCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/topic/${topic.id}`);
  };

  return (
    <div 
      className={cn(
        'group rounded-xl border border-border border-l-4 bg-card p-4 transition-smooth hover:border-primary/20 hover:shadow-sm',
        iconBorderColors[topic.icon] || 'border-l-muted-foreground'
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
