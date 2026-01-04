import { useState } from 'react';
import { FileText, FolderX, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { SelectTopicDialog } from './SelectTopicDialog';
import { RemoveTopicDialog } from './RemoveTopicDialog';
import { DeleteSessionsDialog } from './DeleteSessionsDialog';

interface SessionSelectionBarProps {
  selectedCount: number;
  onAssignTopic: (topicId: string | null) => void;
  onRemoveTopic: () => void;
  onDelete: () => void;
}

export function SessionSelectionBar({ 
  selectedCount, 
  onAssignTopic, 
  onRemoveTopic, 
  onDelete 
}: SessionSelectionBarProps) {
  const [selectTopicOpen, setSelectTopicOpen] = useState(false);
  const [removeTopicOpen, setRemoveTopicOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
        <div className="flex items-center justify-center gap-16 px-6 py-4">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => setSelectTopicOpen(true)}
          >
            <FileText className="h-5 w-5" />
            <span className="text-xs">Assign to Topic</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2"
            onClick={() => setRemoveTopicOpen(true)}
          >
            <FolderX className="h-5 w-5" />
            <span className="text-xs">Remove Topic</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2 text-destructive hover:text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="h-5 w-5" />
            <span className="text-xs">Delete</span>
          </Button>
        </div>
      </div>

      <SelectTopicDialog
        open={selectTopicOpen}
        onClose={() => setSelectTopicOpen(false)}
        onSelect={onAssignTopic}
        selectedCount={selectedCount}
      />
      
      <RemoveTopicDialog
        open={removeTopicOpen}
        onClose={() => setRemoveTopicOpen(false)}
        onConfirm={onRemoveTopic}
        selectedCount={selectedCount}
      />
      
      <DeleteSessionsDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={onDelete}
        selectedCount={selectedCount}
      />
    </>
  );
}
