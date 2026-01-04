import { BadgeType, TopicBadgeInfo, WallpaperType } from '@/types/session';
import { cn } from '@/lib/utils';

interface SessionBadgeProps {
  type?: BadgeType;
  topicBadge?: TopicBadgeInfo;
}

// Wallpaper color presets for topic badges
const wallpaperBadgeColors: Record<WallpaperType, { bg: string; text: string; border: string }> = {
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
};

export function SessionBadge({ type, topicBadge }: SessionBadgeProps) {
  // If topic badge is provided, render it with wallpaper colors
  if (topicBadge) {
    const colors = topicBadge.wallpaper 
      ? wallpaperBadgeColors[topicBadge.wallpaper]
      : wallpaperBadgeColors.mint;
    
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          borderWidth: '1px',
          borderColor: colors.border,
        }}
      >
        <span className="text-sm">{topicBadge.icon}</span>
        {topicBadge.label}
      </span>
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
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        config.className
      )}
    >
      <span className="text-sm">{config.icon}</span>
      {config.label}
    </span>
  );
}
