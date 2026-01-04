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

interface RemoveTopicDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedCount: number;
}

export function RemoveTopicDialog({ open, onClose, onConfirm, selectedCount }: RemoveTopicDialogProps) {
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
            <DrawerTitle>Remove Topic Assignment</DrawerTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Remove topic assignment from {selectedCount} session{selectedCount !== 1 ? 's' : ''}?
            </p>
          </DrawerHeader>
          <DrawerFooter className="flex-row gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="flex-1">
              Remove
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
          <AlertDialogTitle>Remove Topic Assignment</AlertDialogTitle>
          <AlertDialogDescription>
            Remove topic assignment from {selectedCount} session{selectedCount !== 1 ? 's' : ''}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-none bg-transparent text-muted-foreground hover:bg-muted">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="border-none bg-primary/10 text-primary hover:bg-primary/20">
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
