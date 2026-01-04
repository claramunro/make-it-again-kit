import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FolderOpen, Briefcase, ClipboardPlus, GraduationCap, Users, Calendar, Lightbulb, 
  MessageSquare, MessageSquareText, MessagesSquare, Home, LayoutGrid, Languages, 
  Wrench, GitFork, Search, Music, Palette, ShoppingCart, Heart, Star, Settings, 
  Camera, Bookmark, Smile
} from 'lucide-react';

interface AddTopicDialogProps {
  open: boolean;
  onClose: () => void;
}

const COLORS = [
  '#3D2314', '#3B82F6', '#4F46E5', '#22C55E', '#84CC16', '#CAEF45', 
  '#F97316', '#FB923C', '#EF4444', '#DC2626', '#A855F7',
  '#8B5CF6', '#78716C', '#9CA3AF', '#64748B', '#14B8A6', 
  '#06B6D4', '#FACC15'
];

const ICONS = [
  { name: 'FolderOpen', icon: FolderOpen },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'ClipboardPlus', icon: ClipboardPlus },
  { name: 'GraduationCap', icon: GraduationCap },
  { name: 'Users', icon: Users },
  { name: 'Calendar', icon: Calendar },
  { name: 'Lightbulb', icon: Lightbulb },
  { name: 'MessageSquare', icon: MessageSquare },
  { name: 'MessageSquareText', icon: MessageSquareText },
  { name: 'MessagesSquare', icon: MessagesSquare },
  { name: 'Home', icon: Home },
  { name: 'LayoutGrid', icon: LayoutGrid },
  { name: 'Languages', icon: Languages },
  { name: 'Wrench', icon: Wrench },
  { name: 'GitFork', icon: GitFork },
  { name: 'Search', icon: Search },
  { name: 'Music', icon: Music },
  { name: 'Palette', icon: Palette },
  { name: 'ShoppingCart', icon: ShoppingCart },
  { name: 'Heart', icon: Heart },
  { name: 'Star', icon: Star },
  { name: 'Settings', icon: Settings },
  { name: 'Camera', icon: Camera },
  { name: 'Bookmark', icon: Bookmark },
];

const EMOJIS = ['😀', '😎', '🎉', '🚀', '💡', '📚', '🎯', '💼', '🏠', '❤️', '⭐', '🔥'];

export function AddTopicDialog({ open, onClose }: AddTopicDialogProps) {
  const isMobile = useIsMobile();
  const [topicName, setTopicName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState('FolderOpen');
  const [iconType, setIconType] = useState<'icons' | 'emoji'>('icons');
  const [selectedEmoji, setSelectedEmoji] = useState('😀');

  const handleCreate = () => {
    // TODO: Implement topic creation
    console.log('Creating topic:', { topicName, selectedColor, selectedIcon, iconType, selectedEmoji });
    onClose();
    setTopicName('');
  };

  const content = (
    <div className="space-y-6">
      {/* Topic Name Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <FolderOpen className="h-5 w-5" />
        </div>
        <Input
          placeholder="Topic Name"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
          className="pl-10 h-12 bg-muted/50 border-0"
        />
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="text-sm font-medium mb-3">Color</h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            >
              {selectedColor === color && (
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Icon Selection */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-sm font-medium">Icon</h3>
          <div className="flex rounded-lg overflow-hidden border border-border">
            <button
              onClick={() => setIconType('icons')}
              className={`px-3 py-1.5 text-sm flex items-center gap-1.5 transition-colors ${
                iconType === 'icons' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-background hover:bg-muted'
              }`}
            >
              {iconType === 'icons' && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              Icons
            </button>
            <button
              onClick={() => setIconType('emoji')}
              className={`px-3 py-1.5 text-sm flex items-center gap-1.5 transition-colors ${
                iconType === 'emoji' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-background hover:bg-muted'
              }`}
            >
              <span>😀</span>
              Emoji
            </button>
          </div>
        </div>
        
        {iconType === 'icons' ? (
          <div className="grid grid-cols-10 gap-2">
            {ICONS.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setSelectedIcon(name)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  selectedIcon === name 
                    ? 'border-2 border-primary bg-primary/10' 
                    : 'border border-border hover:bg-muted'
                }`}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-10 gap-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedEmoji(emoji)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-colors ${
                  selectedEmoji === emoji 
                    ? 'border-2 border-primary bg-primary/10' 
                    : 'border border-border hover:bg-muted'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleCreate} disabled={!topicName.trim()}>
          Create
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add Topic</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-lg" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Add Topic</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
