import { Star, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Topic } from '@/data/topics';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  topic: Topic;
}

// Bottom gradient colors for each icon theme
const topicBottomColors: Record<string, string> = {
  '🎨': 'rgba(244, 114, 182, 0.3)', // pink
  '📦': 'rgba(52, 211, 153, 0.3)', // emerald
  '🏋️': 'rgba(96, 165, 250, 0.3)', // blue
  '☕': 'rgba(251, 191, 36, 0.3)', // amber
  '🐶': 'rgba(253, 224, 71, 0.3)', // yellow
  '📅': 'rgba(251, 191, 36, 0.3)', // yellow/amber
  '🚀': 'rgba(167, 139, 250, 0.3)', // violet
  '💻': 'rgba(148, 163, 184, 0.3)', // slate
  '📢': 'rgba(251, 146, 60, 0.3)', // orange
  '🤝': 'rgba(45, 212, 191, 0.3)', // teal
  '💰': 'rgba(74, 222, 128, 0.3)', // green
  '👥': 'rgba(129, 140, 248, 0.3)', // indigo
  '🔬': 'rgba(34, 211, 238, 0.3)', // cyan
  '⚖️': 'rgba(148, 163, 184, 0.3)', // gray
  '🎉': 'rgba(251, 113, 133, 0.3)', // rose
};

const defaultBottomColor = 'rgba(148, 163, 184, 0.3)';

export function TopicCard({ topic }: TopicCardProps) {
  const navigate = useNavigate();
  const bottomColor = topicBottomColors[topic.icon] || defaultBottomColor;

  const handleCardClick = () => {
    navigate(`/topic/${topic.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative rounded-xl border border-border bg-card overflow-hidden transition-smooth hover:border-primary/20 hover:shadow-md cursor-pointer"
    >
      {/* Bottom gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${bottomColor} 0%, transparent 40%)`
        }}
      />
      
      {/* Content area */}
      <div className="relative p-4">
        {/* Header with star */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{topic.icon}</span>
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
              className="flex items-center justify-between rounded-lg bg-muted/50 hover:bg-muted p-3 transition-smooth group/session"
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
            <div className="w-full text-center text-xs text-muted-foreground py-2">
              +{topic.sessionCount - 2} more session{topic.sessionCount - 2 !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
