import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { FolderX } from 'lucide-react';
import { topics } from '@/data/topics';
import { cn } from '@/lib/utils';

interface SelectTopicDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (topicId: string | null) => void;
  selectedCount: number;
}

// Colors for emoji container matching TopicCard style
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

export function SelectTopicDialog({ open, onClose, onSelect, selectedCount }: SelectTopicDialogProps) {
  const handleSelect = (topicId: string | null) => {
    onSelect(topicId);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Select Topic</DialogTitle>
        </DialogHeader>
        
        <div className="max-h-80 space-y-1 overflow-y-auto py-2">
          {/* No topic option */}
          <button
            onClick={() => handleSelect(null)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-muted transition-colors"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              <FolderX className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-sm font-medium">No topic</div>
              <div className="text-xs text-muted-foreground">Clear topic assignment</div>
            </div>
          </button>
          
          {/* Topic list */}
          {topics.map((topic) => {
            const bgColor = topicColors[topic.icon] || defaultColor;
            return (
              <button
                key={topic.id}
                onClick={() => handleSelect(topic.id)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-muted transition-colors"
              >
                <div className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg',
                  bgColor
                )}>
                  <span className="text-base">{topic.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{topic.name}</div>
                  {topic.description && (
                    <div className="text-xs text-muted-foreground truncate">{topic.description}</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="flex justify-end pt-2">
          <Button variant="ghost" onClick={onClose} className="text-primary">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
