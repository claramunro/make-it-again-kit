import { cn } from '@/lib/utils';

interface ProBadgeProps {
  className?: string;
}

export function ProBadge({ className }: ProBadgeProps) {
  return (
    <span 
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
      PRO
    </span>
  );
}
