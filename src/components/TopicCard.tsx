import { Star, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Topic } from '@/data/topics';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  topic: Topic;
}

// Gradient backgrounds with blur effects for each icon/color theme
const topicGradients: Record<string, { gradient: string; overlay: string }> = {
  '🎨': { 
    gradient: 'bg-gradient-to-br from-pink-400 via-rose-300 to-pink-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '📦': { 
    gradient: 'bg-gradient-to-br from-emerald-400 via-teal-300 to-emerald-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '🏋️': { 
    gradient: 'bg-gradient-to-br from-blue-400 via-sky-300 to-blue-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '☕': { 
    gradient: 'bg-gradient-to-br from-amber-400 via-orange-300 to-amber-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '🐶': { 
    gradient: 'bg-gradient-to-br from-amber-300 via-yellow-200 to-amber-400',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '📅': { 
    gradient: 'bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '🚀': { 
    gradient: 'bg-gradient-to-br from-violet-400 via-purple-300 to-violet-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '💻': { 
    gradient: 'bg-gradient-to-br from-slate-400 via-gray-300 to-slate-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '📢': { 
    gradient: 'bg-gradient-to-br from-orange-400 via-amber-300 to-orange-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '🤝': { 
    gradient: 'bg-gradient-to-br from-teal-400 via-cyan-300 to-teal-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '💰': { 
    gradient: 'bg-gradient-to-br from-green-400 via-emerald-300 to-green-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '👥': { 
    gradient: 'bg-gradient-to-br from-indigo-400 via-blue-300 to-indigo-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '🔬': { 
    gradient: 'bg-gradient-to-br from-cyan-400 via-sky-300 to-cyan-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '⚖️': { 
    gradient: 'bg-gradient-to-br from-gray-400 via-slate-300 to-gray-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
  '🎉': { 
    gradient: 'bg-gradient-to-br from-rose-400 via-pink-300 to-rose-500',
    overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
  },
};

const defaultGradient = {
  gradient: 'bg-gradient-to-br from-slate-400 via-gray-300 to-slate-500',
  overlay: 'bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-black/80 dark:via-black/60'
};

export function TopicCard({ topic }: TopicCardProps) {
  const navigate = useNavigate();
  const gradientConfig = topicGradients[topic.icon] || defaultGradient;

  const handleCardClick = () => {
    navigate(`/topic/${topic.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group rounded-xl border border-border bg-card overflow-hidden transition-smooth hover:border-primary/20 hover:shadow-md cursor-pointer"
    >
      {/* Colorful header with gradient and blur effects */}
      <div className="relative h-24 overflow-hidden">
        {/* Base gradient layer */}
        <div className={cn('absolute inset-0', gradientConfig.gradient)} />
        
        {/* Blur overlay for depth */}
        <div className="absolute inset-0 backdrop-blur-[2px]" />
        
        {/* Radial glow effect */}
        <div className="absolute inset-0 bg-radial-gradient opacity-40" 
          style={{
            background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)'
          }}
        />
        
        {/* Additional light streak */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%)'
          }}
        />
        
        {/* Status badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-xs text-white/90 font-medium drop-shadow-sm">{topic.date}</span>
          <span className="text-xs text-white/60">•</span>
          <span className="text-xs text-white/90 font-medium drop-shadow-sm">Active</span>
        </div>
        
        {/* Star button */}
        <button 
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-smooth"
          onClick={(e) => e.stopPropagation()}
        >
          <Star 
            className={cn(
              'h-4 w-4 transition-smooth drop-shadow-sm',
              topic.isFavorite 
                ? 'fill-yellow-300 text-yellow-300' 
                : 'text-white/80 hover:text-yellow-300'
            )} 
          />
        </button>
      </div>

      {/* Content area */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-xl">{topic.icon}</span>
          <h3 className="text-sm font-semibold text-foreground">{topic.name}</h3>
        </div>

        {/* Sessions */}
        <div className="space-y-2">
          {topic.sessions?.slice(0, 2).map((session) => (
            <Link
              key={session.id}
              to={`/topic/${topic.id}?tab=sessions&session=${session.id}`}
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
