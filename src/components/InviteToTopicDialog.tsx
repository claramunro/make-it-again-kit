import { useState } from 'react';
import { Mail, Link, Send, X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface InviteToTopicDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topicName: string;
}

type InviteMethod = 'email' | 'link';

export function InviteToTopicDialog({ open, onOpenChange, topicName }: InviteToTopicDialogProps) {
  const [inviteMethod, setInviteMethod] = useState<InviteMethod>('email');
  const [email, setEmail] = useState('');
  const isMobile = useIsMobile();

  const handleSendInvite = () => {
    // Placeholder for send invite logic
    console.log('Sending invite to:', email);
    onOpenChange(false);
    setEmail('');
  };

  const handleCopyLink = () => {
    // Placeholder for copy link logic
    navigator.clipboard.writeText(`https://app.hedy.ai/invite/topic/${topicName.toLowerCase().replace(/\s+/g, '-')}`);
    console.log('Link copied!');
  };

  const content = (
    <div className="space-y-6">
      {/* Method Toggle */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setInviteMethod('email')}
          className={cn(
            'flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all',
            inviteMethod === 'email'
              ? 'border-primary/50 bg-primary/5 text-primary'
              : 'border-border bg-muted/50 text-muted-foreground hover:border-border hover:bg-muted'
          )}
        >
          <Mail className="h-4 w-4" />
          Invite via Email
        </button>
        <button
          onClick={() => setInviteMethod('link')}
          className={cn(
            'flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all',
            inviteMethod === 'link'
              ? 'border-primary/50 bg-primary/5 text-primary'
              : 'border-border bg-muted/50 text-muted-foreground hover:border-border hover:bg-muted'
          )}
        >
          <Link className="h-4 w-4" />
          Invite via Link
        </button>
      </div>

      {/* Email Input */}
      {inviteMethod === 'email' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-0 bg-transparent p-0 focus-visible:ring-0"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Perfect for inviting colleagues or clients. They'll receive an email invitation.
          </p>
          <Button 
            onClick={handleSendInvite}
            disabled={!email}
            className="w-full gap-2 bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
            Send Invitation
          </Button>
        </div>
      )}

      {/* Link Option */}
      {inviteMethod === 'link' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
            <Link className="h-5 w-5 text-muted-foreground" />
            <span className="flex-1 text-sm text-muted-foreground truncate">
              https://app.hedy.ai/invite/topic/...
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Share this link with anyone you'd like to invite. Anyone with the link can view this topic.
          </p>
          <Button 
            onClick={handleCopyLink}
            className="w-full gap-2"
            variant="outline"
          >
            <Link className="h-4 w-4" />
            Copy Invite Link
          </Button>
        </div>
      )}
    </div>
  );

  // Mobile: Use Drawer (slides up)
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="border-b border-border pb-4">
            <DrawerTitle className="text-xl font-semibold">Invite to View Topic</DrawerTitle>
            <p className="text-sm font-medium text-foreground mt-1">{topicName}</p>
            <p className="text-sm text-emerald-600 mt-1">All current and future sessions will be accessible</p>
          </DrawerHeader>
          <div className="p-6">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Use Dialog (centered modal)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="text-xl font-semibold">Invite to View Topic</DialogTitle>
          <p className="text-sm font-medium text-foreground mt-1">{topicName}</p>
          <p className="text-sm text-emerald-600 mt-1">All current and future sessions will be accessible</p>
        </DialogHeader>
        <div className="pt-4">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}
