import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { FolderX } from 'lucide-react';
import { topics } from '@/data/topics';

interface SelectTopicDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (topicId: string | null) => void;
  selectedCount: number;
}

const TOPIC_COLORS: Record<string, string> = {
  'Coffee': 'bg-amber-700',
  'Hedy Redesign': 'bg-red-500',
  'Joey': 'bg-stone-500',
  'New': 'bg-green-500',
  'Schedule': 'bg-yellow-400',
  'Working Out': 'bg-blue-500',
};

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
        
        <div className="space-y-1 py-2">
          {/* No topic option */}
          <button
            onClick={() => handleSelect(null)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-muted transition-colors"
          >
            <FolderX className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">No topic</div>
              <div className="text-sm text-muted-foreground">Clear topic assignment</div>
            </div>
          </button>
          
          {/* Topic list */}
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleSelect(topic.id)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-muted transition-colors"
            >
              <div className={`h-5 w-5 rounded ${TOPIC_COLORS[topic.name] || 'bg-muted-foreground'}`} />
              <div>
                <div className="font-medium">{topic.name}</div>
                {topic.description && (
                  <div className="text-sm text-muted-foreground">{topic.description}</div>
                )}
              </div>
            </button>
          ))}
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
