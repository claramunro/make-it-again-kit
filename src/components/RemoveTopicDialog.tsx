import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface RemoveTopicDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCount: number;
}

export function RemoveTopicDialog({ open, onClose, onConfirm, selectedCount }: RemoveTopicDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Topic Assignment</AlertDialogTitle>
          <AlertDialogDescription>
            Remove topic assignment from {selectedCount} session{selectedCount !== 1 ? 's' : ''}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-muted-foreground">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="bg-transparent text-primary hover:bg-primary/10">
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
