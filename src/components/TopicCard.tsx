import { MoreVertical, Users, Pencil, UserPlus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Topic } from '@/data/topics';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopicCardProps {
  topic: Topic;
}

const iconBgColors: Record<string, string> = {
  '🎨': 'bg-pink-100',
  '📦': 'bg-emerald-100',
  '🏋️': 'bg-blue-100',
  '☕': 'bg-amber-100',
  '🐶': 'bg-amber-100',
  '📅': 'bg-yellow-100',
};

export function TopicCard({ topic }: TopicCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/topic/${topic.id}`);
  };

  return (
    <button 
      onClick={handleCardClick}
      className="group flex w-full items-start gap-4 rounded-xl border border-border bg-card p-4 text-left transition-smooth hover:border-primary/20 hover:shadow-sm"
    >
      {/* Icon */}
      <div
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl',
          iconBgColors[topic.icon] || 'bg-muted'
        )}
      >
        {topic.icon}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <h3 className="text-sm font-semibold text-foreground">{topic.name}</h3>
        <p className="text-xs text-muted-foreground">
          {topic.sessionCount} sessions
        </p>
        <p className="text-xs text-muted-foreground">{topic.date}</p>
        {topic.description && (
          <p className="pt-1 text-xs text-muted-foreground">
            {topic.description}
          </p>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-start gap-2">
        {topic.sharedBy && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
            <Users className="h-3 w-3" />
            Shared by {topic.sharedBy}
          </span>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <button className="rounded-lg p-1 opacity-0 transition-smooth hover:bg-muted group-hover:opacity-100">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-background">
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite to Topic
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => e.stopPropagation()}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </button>
  );
}
