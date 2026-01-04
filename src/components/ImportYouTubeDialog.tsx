import { useState } from 'react';
import { PlayCircle, Link2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImportYouTubeDialogProps {
  open: boolean;
  onClose: () => void;
}

function ImportYouTubeContent({ onClose }: { onClose: () => void }) {
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const handleImport = () => {
    console.log('Importing from YouTube:', youtubeUrl);
    onClose();
    setYoutubeUrl('');
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          placeholder="YouTube URL or Video ID"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="pr-10"
        />
        <Link2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose} className="text-primary">
          Cancel
        </Button>
        <Button 
          variant="outline" 
          onClick={handleImport}
          disabled={!youtubeUrl.trim()}
        >
          Import
        </Button>
      </div>
    </div>
  );
}

export function ImportYouTubeDialog({ open, onClose }: ImportYouTubeDialogProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="border-b border-border pb-4 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 mx-auto mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              PRO
            </span>
            <DrawerTitle className="flex items-center justify-center gap-2 text-xl">
              <PlayCircle className="h-5 w-5" />
              Import from YouTube
            </DrawerTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Enter a YouTube URL or video ID to import the audio
            </p>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <ImportYouTubeContent onClose={onClose} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              PRO
            </span>
          </div>
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            <PlayCircle className="h-5 w-5" />
            Import from YouTube
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Enter a YouTube URL or video ID to import the audio
          </p>
        </DialogHeader>

        <div className="mt-4">
          <ImportYouTubeContent onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
