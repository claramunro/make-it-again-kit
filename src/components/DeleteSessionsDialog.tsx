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

interface DeleteSessionsDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCount: number;
}

export function DeleteSessionsDialog({ open, onClose, onConfirm, selectedCount }: DeleteSessionsDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Sessions</AlertDialogTitle>
          <AlertDialogDescription>
            Permanently delete {selectedCount} session{selectedCount !== 1 ? 's' : ''}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-none bg-transparent text-muted-foreground hover:bg-muted">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="border-none bg-destructive/10 text-destructive hover:bg-destructive/20">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
