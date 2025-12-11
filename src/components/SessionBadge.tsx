import { Wifi, Coffee, Dumbbell } from 'lucide-react';
import { BadgeType } from '@/types/session';
import { cn } from '@/lib/utils';

interface SessionBadgeProps {
  type: BadgeType;
}

export function SessionBadge({ type }: SessionBadgeProps) {
  if (!type) return null;

  const badgeConfig = {
    new: {
      icon: <Wifi className="h-3 w-3" />,
      label: 'New',
      className: 'bg-primary/10 text-primary',
    },
    coffee: {
      icon: <Coffee className="h-3 w-3" />,
      label: 'Coffee',
      className: 'bg-badge-coffee-bg text-badge-coffee',
    },
    workout: {
      icon: <Dumbbell className="h-3 w-3" />,
      label: 'Working Out',
      className: 'bg-badge-workout-bg text-badge-workout',
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
      {config.icon}
      {config.label}
    </span>
  );
}
