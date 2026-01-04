import { useState } from 'react';
import { Briefcase } from 'lucide-react';
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
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImportTranscriptDialogProps {
  open: boolean;
  onClose: () => void;
}

const sessionTypes = [
  { id: 'business', label: 'Business Meetings', icon: '📁' },
  { id: 'brainstorm', label: 'Solo Brainstorm', icon: '💡' },
  { id: 'journalism', label: 'Journalism', icon: '📝' },
  { id: 'recruitment', label: 'Recruitment', icon: '👥' },
  { id: 'lectures', label: 'Lectures or Classes', icon: '📖' },
  { id: 'medical', label: 'Medical Consultation', icon: '🏥' },
  { id: 'personal', label: 'Personal Conversation', icon: '❤️' },
  { id: 'coaching', label: 'Coaching and Mentoring', icon: '🎯' },
  { id: 'interview', label: 'Job Interview (Candidate)', icon: '⭐' },
];

const languages = [
  { id: 'en', label: 'English (English)' },
  { id: 'es', label: 'Español (Spanish)' },
  { id: 'fr', label: 'Français (French)' },
  { id: 'de', label: 'Deutsch (German)' },
  { id: 'pt', label: 'Português (Portuguese)' },
];

const contextProfiles = [
  { id: 'default', label: 'Context Titleeee', isDefault: true },
  { id: 'work', label: 'Work Context', isDefault: false },
  { id: 'personal', label: 'Personal Context', isDefault: false },
];

function ImportTranscriptContent({ onClose }: { onClose: () => void }) {
  const [topic, setTopic] = useState('none');
  const [sessionType, setSessionType] = useState('business');
  const [language, setLanguage] = useState('en');
  const [contextProfile, setContextProfile] = useState('default');
  const [transcript, setTranscript] = useState('');

  const handleImport = () => {
    console.log('Importing transcript:', { topic, sessionType, language, contextProfile, transcript });
    onClose();
    setTranscript('');
  };

  const selectedSessionType = sessionTypes.find(t => t.id === sessionType);

  return (
    <div className="space-y-4">
      {/* Topic */}
      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Topic</label>
        <Select value={topic} onValueChange={setTopic}>
          <SelectTrigger>
            <SelectValue placeholder="No topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No topic</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Session Type */}
      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Session Type</label>
        <Select value={sessionType} onValueChange={setSessionType}>
          <SelectTrigger>
            <SelectValue>
              <span className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {selectedSessionType?.label}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {sessionTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                <span className="flex items-center gap-2">
                  <span>{type.icon}</span>
                  {type.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Language */}
      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Meeting/Class Language</label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.id} value={lang.id}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Context Profile */}
      <div className="space-y-1.5">
        <label className="text-xs text-muted-foreground">Select Context Profile</label>
        <Select value={contextProfile} onValueChange={setContextProfile}>
          <SelectTrigger>
            <SelectValue>
              <span className="flex items-center gap-2">
                {contextProfiles.find(p => p.id === contextProfile)?.label}
                {contextProfiles.find(p => p.id === contextProfile)?.isDefault && (
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                    Default
                  </span>
                )}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {contextProfiles.map((profile) => (
              <SelectItem key={profile.id} value={profile.id}>
                <span className="flex items-center gap-2">
                  {profile.label}
                  {profile.isDefault && (
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                      Default
                    </span>
                  )}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transcript Input */}
      <Textarea
        placeholder="Paste transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        className="min-h-[150px] resize-none"
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="ghost" onClick={onClose} className="text-primary">
          Cancel
        </Button>
        <Button 
          variant="outline" 
          onClick={handleImport}
          disabled={!transcript.trim()}
        >
          Import Transcript
        </Button>
      </div>
    </div>
  );
}

export function ImportTranscriptDialog({ open, onClose }: ImportTranscriptDialogProps) {
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
            <DrawerTitle className="text-xl">Import Transcript</DrawerTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Choose the type of conversation or meeting this audio recording is from.
            </p>
          </DrawerHeader>
          <div className="overflow-auto px-4 pb-6">
            <ImportTranscriptContent onClose={onClose} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              PRO
            </span>
          </div>
          <DialogTitle className="text-xl">Import Transcript</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Choose the type of conversation or meeting this audio recording is from.
          </p>
        </DialogHeader>

        <div className="mt-4">
          <ImportTranscriptContent onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
