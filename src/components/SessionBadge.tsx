import { BadgeType, TopicBadgeInfo, WallpaperType } from '@/types/session';
import { cn } from '@/lib/utils';
import { ChevronDown, Users } from 'lucide-react';

interface SessionBadgeProps {
  type?: BadgeType;
  topicBadge?: TopicBadgeInfo;
  showChevron?: boolean;
  isShared?: boolean;
}

// Wallpaper color presets for topic badges
export const wallpaperBadgeColors: Record<WallpaperType, { bg: string; text: string; border: string }> = {
  sand: {
    bg: 'hsl(45, 80%, 92%)',
    text: 'hsl(45, 60%, 30%)',
    border: 'hsl(45, 60%, 70%)',
  },
  peach: {
    bg: 'hsl(20, 80%, 92%)',
    text: 'hsl(20, 60%, 30%)',
    border: 'hsl(20, 60%, 70%)',
  },
  mint: {
    bg: 'hsl(160, 60%, 90%)',
    text: 'hsl(160, 50%, 25%)',
    border: 'hsl(160, 50%, 65%)',
  },
  lavender: {
    bg: 'hsl(280, 60%, 92%)',
    text: 'hsl(280, 50%, 30%)',
    border: 'hsl(280, 50%, 70%)',
  },
  ocean: {
    bg: 'hsl(200, 70%, 92%)',
    text: 'hsl(200, 60%, 25%)',
    border: 'hsl(200, 60%, 65%)',
  },
  sunset: {
    bg: 'hsl(30, 80%, 90%)',
    text: 'hsl(30, 70%, 25%)',
    border: 'hsl(30, 70%, 65%)',
  },
  rose: {
    bg: 'hsl(350, 70%, 92%)',
    text: 'hsl(350, 60%, 30%)',
    border: 'hsl(350, 60%, 70%)',
  },
  slate: {
    bg: 'hsl(215, 20%, 92%)',
    text: 'hsl(215, 20%, 30%)',
    border: 'hsl(215, 20%, 65%)',
  },
  forest: {
    bg: 'hsl(140, 50%, 90%)',
    text: 'hsl(140, 50%, 25%)',
    border: 'hsl(140, 50%, 60%)',
  },
  berry: {
    bg: 'hsl(320, 60%, 92%)',
    text: 'hsl(320, 50%, 30%)',
    border: 'hsl(320, 50%, 70%)',
  },
  coral: {
    bg: 'hsl(16, 80%, 92%)',
    text: 'hsl(16, 70%, 30%)',
    border: 'hsl(16, 70%, 70%)',
  },
  sky: {
    bg: 'hsl(190, 70%, 92%)',
    text: 'hsl(190, 60%, 25%)',
    border: 'hsl(190, 60%, 65%)',
  },
  gold: {
    bg: 'hsl(50, 80%, 90%)',
    text: 'hsl(50, 70%, 25%)',
    border: 'hsl(50, 70%, 65%)',
  },
  sage: {
    bg: 'hsl(100, 30%, 90%)',
    text: 'hsl(100, 30%, 30%)',
    border: 'hsl(100, 30%, 65%)',
  },
  plum: {
    bg: 'hsl(270, 50%, 92%)',
    text: 'hsl(270, 50%, 30%)',
    border: 'hsl(270, 50%, 68%)',
  },
  copper: {
    bg: 'hsl(25, 50%, 90%)',
    text: 'hsl(25, 50%, 28%)',
    border: 'hsl(25, 50%, 60%)',
  },
};

export function SessionBadge({ type, topicBadge, showChevron, isShared }: SessionBadgeProps) {
  // If topic badge is provided, render it with wallpaper colors
  if (topicBadge) {
    const colors = topicBadge.wallpaper 
      ? wallpaperBadgeColors[topicBadge.wallpaper]
      : wallpaperBadgeColors.mint;
    
    return (
      <div
        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap"
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          borderWidth: '1px',
          borderColor: colors.border,
        }}
      >
        <span className="relative text-xs">
          {topicBadge.icon}
          {isShared && (
            <span 
              className="absolute -bottom-1 -right-1.5 flex h-3 w-3 items-center justify-center rounded-full"
              style={{ backgroundColor: colors.border }}
            >
              <Users className="h-1.5 w-1.5 text-white" />
            </span>
          )}
        </span>
        <span>{topicBadge.label}</span>
        {showChevron && <ChevronDown className="h-3 w-3 opacity-70" />}
      </div>
    );
  }

  if (!type) return null;

  const badgeConfig = {
    new: {
      icon: '📦',
      label: 'New',
      className: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    },
    coffee: {
      icon: '☕',
      label: 'Coffee',
      className: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    },
    workout: {
      icon: '🏋️',
      label: 'Working Out',
      className: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    },
  };

  const config = badgeConfig[type];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium',
        config.className
      )}
    >
      <span className="text-xs">{config.icon}</span>
      {config.label}
    </span>
  );
}
