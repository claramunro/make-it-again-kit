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
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from './ui/drawer';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface DeleteSessionsDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCount: number;
}

export function DeleteSessionsDialog({ open, onClose, onConfirm, selectedCount }: DeleteSessionsDialogProps) {
  const isMobile = useIsMobile();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DrawerContent>
          <DrawerHeader className="text-center">
            <DrawerTitle>Delete Sessions</DrawerTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Permanently delete {selectedCount} session{selectedCount !== 1 ? 's' : ''}? This action cannot be undone.
            </p>
          </DrawerHeader>
          <DrawerFooter className="flex-row gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm} className="flex-1">
              Delete
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

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
