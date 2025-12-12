import { BadgeType } from '@/types/session';
import { cn } from '@/lib/utils';

interface SessionBadgeProps {
  type: BadgeType;
}

export function SessionBadge({ type }: SessionBadgeProps) {
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
