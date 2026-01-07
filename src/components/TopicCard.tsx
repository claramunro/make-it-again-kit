import { useState, useEffect } from 'react';
import { Star, ChevronRight, ChevronDown, FileText, AudioLines, Users, MoreVertical, Pencil, UserPlus, Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Topic } from '@/data/topics';
import { useTopics } from '@/contexts/TopicContext';
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

// Wallpaper presets matching TopicDetail - with dark mode support for badges
const wallpaperPresets: Record<string, { 
  bg: string; 
  badgeBg: string; 
  badgeBorder: string; 
  badgeText: string; 
  sharedBg: string; 
  sharedText: string; 
  sharedBorder: string;
  darkSharedBg: string;
  darkSharedText: string;
  darkSharedBorder: string;
}> = {
  sand: { 
    bg: 'bg-gradient-to-br from-amber-200/60 via-yellow-100/60 to-amber-300/60', 
    badgeBg: 'bg-amber-100', 
    badgeBorder: 'border-amber-300',
    badgeText: 'text-amber-700',
    sharedBg: 'hsl(45, 40%, 92%)',
    sharedText: 'hsl(35, 60%, 30%)',
    sharedBorder: 'hsl(45, 35%, 80%)',
    darkSharedBg: 'hsl(45, 35%, 18%)',
    darkSharedText: 'hsl(45, 60%, 70%)',
    darkSharedBorder: 'hsl(45, 30%, 28%)'
  },
  peach: { 
    bg: 'bg-gradient-to-br from-orange-200/60 via-rose-100/60 to-orange-300/60', 
    badgeBg: 'bg-orange-100', 
    badgeBorder: 'border-orange-300',
    badgeText: 'text-orange-700',
    sharedBg: 'hsl(20, 55%, 92%)',
    sharedText: 'hsl(15, 65%, 32%)',
    sharedBorder: 'hsl(20, 45%, 80%)',
    darkSharedBg: 'hsl(20, 45%, 18%)',
    darkSharedText: 'hsl(20, 65%, 70%)',
    darkSharedBorder: 'hsl(20, 40%, 28%)'
  },
  mint: { 
    bg: 'bg-gradient-to-br from-emerald-200/60 via-teal-100/60 to-emerald-300/60', 
    badgeBg: 'bg-emerald-100', 
    badgeBorder: 'border-emerald-300',
    badgeText: 'text-emerald-700',
    sharedBg: 'hsl(150, 30%, 90%)',
    sharedText: 'hsl(155, 45%, 28%)',
    sharedBorder: 'hsl(150, 25%, 78%)',
    darkSharedBg: 'hsl(150, 30%, 16%)',
    darkSharedText: 'hsl(150, 50%, 65%)',
    darkSharedBorder: 'hsl(150, 25%, 26%)'
  },
  lavender: { 
    bg: 'bg-gradient-to-br from-purple-200/60 via-pink-100/60 to-purple-300/60', 
    badgeBg: 'bg-purple-100', 
    badgeBorder: 'border-purple-300',
    badgeText: 'text-purple-700',
    sharedBg: 'hsl(270, 30%, 92%)',
    sharedText: 'hsl(275, 45%, 35%)',
    sharedBorder: 'hsl(270, 25%, 82%)',
    darkSharedBg: 'hsl(270, 30%, 18%)',
    darkSharedText: 'hsl(270, 55%, 70%)',
    darkSharedBorder: 'hsl(270, 25%, 28%)'
  },
  ocean: { 
    bg: 'bg-gradient-to-br from-blue-200/60 via-sky-100/60 to-blue-300/60', 
    badgeBg: 'bg-blue-100', 
    badgeBorder: 'border-blue-300',
    badgeText: 'text-blue-700',
    sharedBg: 'hsl(200, 45%, 92%)',
    sharedText: 'hsl(205, 60%, 30%)',
    sharedBorder: 'hsl(200, 40%, 80%)',
    darkSharedBg: 'hsl(200, 40%, 16%)',
    darkSharedText: 'hsl(200, 60%, 68%)',
    darkSharedBorder: 'hsl(200, 35%, 26%)'
  },
  sunset: { 
    bg: 'bg-gradient-to-br from-orange-300/60 via-rose-200/60 to-yellow-300/60', 
    badgeBg: 'bg-orange-100', 
    badgeBorder: 'border-orange-300',
    badgeText: 'text-orange-700',
    sharedBg: 'hsl(30, 50%, 92%)',
    sharedText: 'hsl(25, 65%, 32%)',
    sharedBorder: 'hsl(30, 45%, 80%)',
    darkSharedBg: 'hsl(30, 45%, 18%)',
    darkSharedText: 'hsl(30, 65%, 70%)',
    darkSharedBorder: 'hsl(30, 40%, 28%)'
  },
  rose: { 
    bg: 'bg-gradient-to-br from-rose-200/60 via-pink-100/60 to-rose-300/60', 
    badgeBg: 'bg-rose-100', 
    badgeBorder: 'border-rose-300',
    badgeText: 'text-rose-700',
    sharedBg: 'hsl(350, 40%, 92%)',
    sharedText: 'hsl(345, 55%, 35%)',
    sharedBorder: 'hsl(350, 35%, 82%)',
    darkSharedBg: 'hsl(350, 35%, 18%)',
    darkSharedText: 'hsl(350, 55%, 70%)',
    darkSharedBorder: 'hsl(350, 30%, 28%)'
  },
  slate: { 
    bg: 'bg-gradient-to-br from-slate-200/60 via-gray-100/60 to-slate-300/60', 
    badgeBg: 'bg-slate-100', 
    badgeBorder: 'border-slate-300',
    badgeText: 'text-slate-700',
    sharedBg: 'hsl(210, 15%, 92%)',
    sharedText: 'hsl(215, 20%, 35%)',
    sharedBorder: 'hsl(210, 12%, 80%)',
    darkSharedBg: 'hsl(210, 15%, 18%)',
    darkSharedText: 'hsl(210, 20%, 68%)',
    darkSharedBorder: 'hsl(210, 12%, 28%)'
  },
  forest: { 
    bg: 'bg-gradient-to-br from-green-200/60 via-emerald-100/60 to-green-300/60', 
    badgeBg: 'bg-green-100', 
    badgeBorder: 'border-green-300',
    badgeText: 'text-green-700',
    sharedBg: 'hsl(140, 30%, 90%)',
    sharedText: 'hsl(145, 45%, 28%)',
    sharedBorder: 'hsl(140, 25%, 78%)',
    darkSharedBg: 'hsl(140, 30%, 16%)',
    darkSharedText: 'hsl(140, 50%, 65%)',
    darkSharedBorder: 'hsl(140, 25%, 26%)'
  },
  berry: { 
    bg: 'bg-gradient-to-br from-fuchsia-200/60 via-purple-100/60 to-fuchsia-300/60', 
    badgeBg: 'bg-fuchsia-100', 
    badgeBorder: 'border-fuchsia-300',
    badgeText: 'text-fuchsia-700',
    sharedBg: 'hsl(290, 35%, 92%)',
    sharedText: 'hsl(295, 50%, 35%)',
    sharedBorder: 'hsl(290, 30%, 82%)',
    darkSharedBg: 'hsl(290, 35%, 18%)',
    darkSharedText: 'hsl(290, 55%, 70%)',
    darkSharedBorder: 'hsl(290, 30%, 28%)'
  },
  coral: { 
    bg: 'bg-gradient-to-br from-red-200/60 via-orange-100/60 to-red-300/60', 
    badgeBg: 'bg-red-100', 
    badgeBorder: 'border-red-300',
    badgeText: 'text-red-700',
    sharedBg: 'hsl(10, 50%, 92%)',
    sharedText: 'hsl(5, 60%, 35%)',
    sharedBorder: 'hsl(10, 45%, 82%)',
    darkSharedBg: 'hsl(10, 45%, 18%)',
    darkSharedText: 'hsl(10, 60%, 68%)',
    darkSharedBorder: 'hsl(10, 40%, 28%)'
  },
  sky: { 
    bg: 'bg-gradient-to-br from-sky-200/60 via-cyan-100/60 to-sky-300/60', 
    badgeBg: 'bg-sky-100', 
    badgeBorder: 'border-sky-300',
    badgeText: 'text-sky-700',
    sharedBg: 'hsl(195, 45%, 92%)',
    sharedText: 'hsl(200, 55%, 30%)',
    sharedBorder: 'hsl(195, 40%, 80%)',
    darkSharedBg: 'hsl(195, 40%, 16%)',
    darkSharedText: 'hsl(195, 55%, 68%)',
    darkSharedBorder: 'hsl(195, 35%, 26%)'
  },
  gold: { 
    bg: 'bg-gradient-to-br from-yellow-200/60 via-amber-100/60 to-yellow-300/60', 
    badgeBg: 'bg-yellow-100', 
    badgeBorder: 'border-yellow-300',
    badgeText: 'text-yellow-700',
    sharedBg: 'hsl(50, 45%, 90%)',
    sharedText: 'hsl(45, 60%, 28%)',
    sharedBorder: 'hsl(50, 40%, 78%)',
    darkSharedBg: 'hsl(50, 40%, 16%)',
    darkSharedText: 'hsl(50, 60%, 68%)',
    darkSharedBorder: 'hsl(50, 35%, 26%)'
  },
  sage: { 
    bg: 'bg-gradient-to-br from-lime-200/60 via-green-100/60 to-lime-300/60', 
    badgeBg: 'bg-lime-100', 
    badgeBorder: 'border-lime-300',
    badgeText: 'text-lime-700',
    sharedBg: 'hsl(90, 30%, 90%)',
    sharedText: 'hsl(95, 40%, 30%)',
    sharedBorder: 'hsl(90, 25%, 78%)',
    darkSharedBg: 'hsl(90, 30%, 16%)',
    darkSharedText: 'hsl(90, 45%, 65%)',
    darkSharedBorder: 'hsl(90, 25%, 26%)'
  },
  plum: { 
    bg: 'bg-gradient-to-br from-violet-200/60 via-purple-100/60 to-violet-300/60', 
    badgeBg: 'bg-violet-100', 
    badgeBorder: 'border-violet-300',
    badgeText: 'text-violet-700',
    sharedBg: 'hsl(260, 35%, 92%)',
    sharedText: 'hsl(265, 45%, 35%)',
    sharedBorder: 'hsl(260, 30%, 82%)',
    darkSharedBg: 'hsl(260, 35%, 18%)',
    darkSharedText: 'hsl(260, 50%, 70%)',
    darkSharedBorder: 'hsl(260, 30%, 28%)'
  },
  copper: { 
    bg: 'bg-gradient-to-br from-orange-300/60 via-amber-200/60 to-orange-400/60', 
    badgeBg: 'bg-orange-100', 
    badgeBorder: 'border-orange-300',
    badgeText: 'text-orange-700',
    sharedBg: 'hsl(25, 50%, 90%)',
    sharedText: 'hsl(20, 60%, 30%)',
    sharedBorder: 'hsl(25, 45%, 78%)',
    darkSharedBg: 'hsl(25, 45%, 18%)',
    darkSharedText: 'hsl(25, 60%, 68%)',
    darkSharedBorder: 'hsl(25, 40%, 28%)'
  },
};

const defaultWallpaper = wallpaperPresets.mint;

export function TopicCard({ topic }: TopicCardProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const wallpaper = wallpaperPresets[topic.wallpaper || 'mint'] || defaultWallpaper;
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  
  useEffect(() => {
    const checkDarkMode = () => setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
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
    console.log('Delete topic:', topic.id);
  };

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
          <div className="relative">
            <div className={cn(
              'flex h-14 w-14 items-center justify-center rounded-2xl shrink-0',
              wallpaper.bg
            )}>
              <span className="text-2xl">{topic.icon}</span>
            </div>
            {topic.sharedBy && (
              <span 
                className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full border"
                style={{ backgroundColor: wallpaper.badgeBorder, borderColor: wallpaper.badgeBorder }}
              >
                <Users className="h-3 w-3 text-white" />
              </span>
            )}
          </div>
          
          {/* Title, description, and metadata */}
          <div className="flex-1 min-w-0">
            {/* Row 1: Title + badges/actions */}
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-foreground truncate leading-none">{topic.name}</h3>
              
              <div className="flex items-center gap-1 shrink-0">
                {/* Shared badge */}
                {topic.sharedBy && (
                  <span 
                    className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium"
                    style={{ 
                      backgroundColor: isDark ? wallpaper.darkSharedBg : wallpaper.sharedBg, 
                      color: isDark ? wallpaper.darkSharedText : wallpaper.sharedText, 
                      borderColor: isDark ? wallpaper.darkSharedBorder : wallpaper.sharedBorder 
                    }}
                  >
                    <Users className="h-3 w-3" />
                    Shared
                  </span>
                )}
                
                {/* Star button */}
                <button 
                  className="p-1 rounded-full hover:bg-muted transition-smooth"
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
                
                {/* Menu button */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="p-1 rounded-full hover:bg-muted transition-smooth"
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
            
            {/* Row 2: Description + session count */}
            <div className="flex items-center justify-between gap-2 mt-1">
              <p className="text-sm text-muted-foreground truncate">{topic.description || 'No description'}</p>
              <span className="text-sm text-muted-foreground shrink-0">
                {topic.sessionCount} Sessions
              </span>
            </div>
          </div>
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
  const wallpaper = wallpaperPresets[topic.wallpaper || 'mint'] || defaultWallpaper;

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
        {/* Emoji container matching wallpaper style */}
        <div className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg',
          wallpaper.bg
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

// List view item - includes all card elements in horizontal layout with accordion
export function TopicListItem({ topic }: TopicCardProps) {
  const navigate = useNavigate();
  const wallpaper = wallpaperPresets[topic.wallpaper || 'mint'] || defaultWallpaper;
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem('topic-accordion-state');
    if (saved) {
      const state = JSON.parse(saved);
      return state[topic.id] ?? false;
    }
    return false;
  });

  useEffect(() => {
    const checkDarkMode = () => setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('topic-accordion-state');
    const state = saved ? JSON.parse(saved) : {};
    state[topic.id] = isExpanded;
    localStorage.setItem('topic-accordion-state', JSON.stringify(state));
  }, [isExpanded, topic.id]);

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
    console.log('Delete topic:', topic.id);
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="group rounded-xl border border-border bg-card overflow-hidden transition-smooth hover:border-primary/20 hover:shadow-md cursor-pointer"
      >
        {/* Main content row */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Emoji container */}
            <div className="relative">
              <div className={cn(
                'flex h-14 w-14 items-center justify-center rounded-2xl shrink-0',
                wallpaper.bg
              )}>
                <span className="text-2xl">{topic.icon}</span>
              </div>
              {topic.sharedBy && (
                <span 
                  className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full border"
                  style={{ backgroundColor: wallpaper.badgeBorder, borderColor: wallpaper.badgeBorder }}
                >
                  <Users className="h-3 w-3 text-white" />
                </span>
              )}
            </div>
            
            {/* Title and metadata */}
            <div className="flex-1 min-w-0">
              {/* Row 1: Title + badges/actions */}
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-foreground truncate leading-none">{topic.name}</h3>
                
                <div className="flex items-center gap-1 shrink-0">
                  {/* Shared badge */}
                  {topic.sharedBy && (
                    <span 
                      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium"
                      style={{ 
                        backgroundColor: isDark ? wallpaper.darkSharedBg : wallpaper.sharedBg, 
                        color: isDark ? wallpaper.darkSharedText : wallpaper.sharedText, 
                        borderColor: isDark ? wallpaper.darkSharedBorder : wallpaper.sharedBorder 
                      }}
                    >
                      <Users className="h-3 w-3" />
                      Shared
                    </span>
                  )}
                  
                  {/* Star button */}
                  <button 
                    className="p-1 rounded-full hover:bg-muted transition-smooth"
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
                  
                  {/* Menu button */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button 
                        className="p-1 rounded-full hover:bg-muted transition-smooth"
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
              
              {/* Row 2: Description + session count with expand toggle */}
              <div className="flex items-center justify-between gap-2 mt-1">
                <p className="text-sm text-muted-foreground truncate">{topic.description || 'No description'}</p>
                <button 
                  onClick={handleToggleExpand}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground/80 shrink-0 transition-smooth hover:opacity-80"
                >
                  {topic.sessionCount} Sessions
                  {topic.sessions && topic.sessions.length > 0 && (
                    isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5" />
                    )
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sessions list - accordion style, collapsed by default */}
          {isExpanded && topic.sessions && topic.sessions.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              {topic.sessions.map((session) => (
                <Link
                  key={session.id}
                  to={`/topic/${topic.id}?tab=sessions`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-3 rounded-xl bg-muted/50 hover:bg-muted p-3 transition-smooth group/session"
                >
                  {/* Session icon */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground/60">
                    {session.type === 'audio' ? (
                      <AudioLines className="h-5 w-5" />
                    ) : (
                      <FileText className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{session.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {session.date}{session.time ? ` · ${session.time}` : ''} · {session.duration}
                    </p>
                  </div>
                  {/* Star for sessions */}
                  <Star 
                    className={cn(
                      'h-4 w-4 shrink-0',
                      session.isFavorite 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-muted-foreground/30'
                    )} 
                  />
                </Link>
              ))}
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
    </>
  );
}
