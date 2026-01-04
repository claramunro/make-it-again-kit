import { useState } from 'react';
import { Star, ChevronRight, FileText, Users, MoreVertical, Pencil, UserPlus, Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Topic } from '@/data/topics';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { InviteToTopicDialog } from './InviteToTopicDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopicCardProps {
  topic: Topic;
}

interface TopicCardSelectableProps {
  topic: Topic;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

// Colors for emoji container matching SessionBadge style (solid bg, no thick border)
const topicColors: Record<string, string> = {
  '🎨': 'bg-pink-500/10 dark:bg-pink-500/20',
  '📦': 'bg-emerald-500/10 dark:bg-emerald-500/20',
  '🏋️': 'bg-blue-500/10 dark:bg-blue-500/20',
  '☕': 'bg-amber-500/10 dark:bg-amber-500/20',
  '🐶': 'bg-yellow-500/10 dark:bg-yellow-500/20',
  '📅': 'bg-amber-500/10 dark:bg-amber-500/20',
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

const defaultColor = 'bg-slate-500/10 dark:bg-slate-500/20';

export function TopicCard({ topic }: TopicCardProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const bgColor = topicColors[topic.icon] || defaultColor;
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  const handleCardClick = () => {
    navigate(`/topic/${topic.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/topic/${topic.id}?tab=edit`);
  };

  const handleInviteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInviteDialogOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Placeholder for delete logic
    console.log('Delete topic:', topic.id);
  };

  // On mobile, show only 1 session
  const sessionsToShow = isMobile ? 1 : 2;
  const remainingSessions = topic.sessionCount - sessionsToShow;

  return (
    <div 
      onClick={handleCardClick}
      className="group rounded-xl border border-border bg-card overflow-hidden transition-smooth hover:border-primary/20 hover:shadow-md cursor-pointer"
    >
      {/* Content area */}
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-4">
          {/* Emoji container */}
          <div className={cn(
            'flex h-14 w-14 items-center justify-center rounded-2xl shrink-0',
            bgColor
          )}>
            <span className="text-2xl">{topic.icon}</span>
          </div>
          
          {/* Title, description, and metadata */}
          <div className="flex-1 min-w-0">
            {/* Row 1: Title + badges/actions */}
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-foreground truncate">{topic.name}</h3>
              
              <div className="flex items-center gap-2 shrink-0">
                {/* Shared badge */}
                {topic.sharedBy && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
                    <Users className="h-3 w-3" />
                    Shared
                  </span>
                )}
                
                {/* Star button */}
                <button 
                  className="p-1.5 rounded-full hover:bg-muted transition-smooth"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Star 
                    className={cn(
                      'h-5 w-5 transition-smooth',
                      topic.isFavorite 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-muted-foreground hover:text-yellow-400'
                    )} 
                  />
                </button>
                
                {/* Menu button */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="p-1.5 rounded-full hover:bg-muted transition-smooth"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={handleEditClick} className="gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleInviteClick} className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Invite to Topic
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDeleteClick} className="gap-2 text-destructive focus:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Row 2: Description + date/sessions */}
            <div className="flex items-center justify-between gap-2 mt-1">
              <p className="text-sm text-muted-foreground">Topic Description</p>
              <span className="text-sm text-muted-foreground shrink-0">
                {topic.date} • {topic.sessionCount} Sessions
              </span>
            </div>
          </div>
        </div>

        {/* Sessions list */}
        <div className="space-y-2">
          {topic.sessions?.slice(0, sessionsToShow).map((session) => (
            <Link
              key={session.id}
              to={`/topic/${topic.id}?tab=sessions`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-3 rounded-xl bg-muted/50 hover:bg-muted p-4 transition-smooth group/session"
            >
              {/* Session icon */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground/60">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{session.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {session.date} · {session.duration}
                </p>
              </div>
            </Link>
          ))}
          
          {/* Show more link */}
          {remainingSessions > 0 && (
            <div className="w-full text-center text-sm text-muted-foreground py-3">
              +{remainingSessions} more session{remainingSessions !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Invite Dialog */}
      <InviteToTopicDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
        topicName={topic.name}
      />
    </div>
  );
}

// Selectable version for master-detail layout
export function TopicCardSelectable({ topic, isSelected, onSelect }: TopicCardSelectableProps) {
  const bgColor = topicColors[topic.icon] || defaultColor;

  const handleClick = () => {
    onSelect?.(topic.id);
  };

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "group rounded-xl border bg-card p-3 transition-smooth hover:border-primary/20 hover:shadow-sm cursor-pointer",
        isSelected ? "border-primary bg-primary/5" : "border-border"
      )}
    >
      <div className="flex items-center gap-3">
        {/* Emoji container matching SessionBadge style */}
        <div className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg',
          bgColor
        )}>
          <span className="text-base">{topic.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">{topic.name}</h3>
          <p className="text-xs text-muted-foreground">
            {topic.sessionCount} sessions
          </p>
        </div>
        <Star 
          className={cn(
            'h-4 w-4 shrink-0',
            topic.isFavorite 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'text-muted-foreground/30'
          )} 
        />
      </div>
    </div>
  );
}
