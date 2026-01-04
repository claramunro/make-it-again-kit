import { useState } from 'react';
import { X, AlertTriangle, Folder, ChevronDown, ChevronUp, Plus, Lightbulb, FileText, Users, BookOpen, Stethoscope, Heart, Radio, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { topics } from '@/data/topics';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

interface StartSessionDialogProps {
  open: boolean;
  onClose: () => void;
}

const sessionTypes = [
  { id: 'business', label: 'Business Meetings', icon: Briefcase },
  { id: 'brainstorm', label: 'Solo Brainstorm', icon: Lightbulb },
  { id: 'journalism', label: 'Journalism', icon: FileText },
  { id: 'recruitment', label: 'Recruitment', icon: Users },
  { id: 'lectures', label: 'Lectures or Classes', icon: BookOpen },
  { id: 'medical', label: 'Medical Consultation', icon: Stethoscope },
  { id: 'personal', label: 'Personal Conversation', icon: Heart },
  { id: 'coaching', label: 'Coaching and Mentoring', icon: Radio },
];

const languages = [
  { id: 'en', label: 'English (English)' },
  { id: 'es', label: 'Spanish (Español)' },
  { id: 'fr', label: 'French (Français)' },
];

const contexts = [
  { id: 'context1', label: 'Context Titleeee' },
];

function StartSessionContent({ onClose }: { onClose: () => void }) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSessionType, setSelectedSessionType] = useState('business');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedContext, setSelectedContext] = useState('context1');
  
  const [topicOpen, setTopicOpen] = useState(false);
  const [sessionTypeOpen, setSessionTypeOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);

  const selectedTopicData = topics.find(t => t.id === selectedTopic);
  const selectedSessionTypeData = sessionTypes.find(t => t.id === selectedSessionType);

  return (
    <>
      {/* Content */}
      <div className="space-y-4">
        {/* Warning Alert */}
        <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-foreground">
            Audio recording is ON. Please ensure you have consent from all participants before proceeding.
          </p>
        </div>

        {/* Topic Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setTopicOpen(!topicOpen);
              setSessionTypeOpen(false);
              setLanguageOpen(false);
              setContextOpen(false);
            }}
            className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm transition-smooth hover:border-primary/50"
          >
            <span className="text-foreground">
              {selectedTopicData ? (
                <span className="flex items-center gap-2">
                  <span>{selectedTopicData.icon}</span>
                  {selectedTopicData.name}
                </span>
              ) : (
                'No topic'
              )}
            </span>
            {topicOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {topicOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-border bg-card shadow-lg">
              <div className="max-h-64 overflow-auto py-1">
                <button
                  onClick={() => {
                    setSelectedTopic(null);
                    setTopicOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-smooth hover:bg-muted',
                    !selectedTopic && 'bg-primary/5'
                  )}
                >
                  No topic
                </button>
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic.id);
                      setTopicOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-smooth hover:bg-muted',
                      selectedTopic === topic.id && 'bg-primary/5'
                    )}
                  >
                    <span>{topic.icon}</span>
                    {topic.name}
                  </button>
                ))}
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-smooth hover:bg-muted">
                  <Plus className="h-4 w-4 text-muted-foreground" />
                  Create new topic
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Session Type Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setSessionTypeOpen(!sessionTypeOpen);
              setTopicOpen(false);
              setLanguageOpen(false);
              setContextOpen(false);
            }}
            className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm transition-smooth hover:border-primary/50"
          >
            <span className="flex items-center gap-3 text-foreground">
              {selectedSessionTypeData && (
                <>
                  <Folder className="h-4 w-4 text-primary" />
                  {selectedSessionTypeData.label}
                </>
              )}
            </span>
            {sessionTypeOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {sessionTypeOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-border bg-card shadow-lg">
              <div className="max-h-64 overflow-auto py-1">
                {sessionTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSelectedSessionType(type.id);
                      setSessionTypeOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-smooth hover:bg-muted',
                      selectedSessionType === type.id && 'bg-primary/5'
                    )}
                  >
                    <type.icon className="h-4 w-4 text-primary" />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setLanguageOpen(!languageOpen);
              setTopicOpen(false);
              setSessionTypeOpen(false);
              setContextOpen(false);
            }}
            className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm transition-smooth hover:border-primary/50"
          >
            <span className="text-foreground">
              {languages.find(l => l.id === selectedLanguage)?.label}
            </span>
            {languageOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {languageOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-border bg-card shadow-lg">
              <div className="py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setSelectedLanguage(lang.id);
                      setLanguageOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center px-4 py-2.5 text-sm transition-smooth hover:bg-muted',
                      selectedLanguage === lang.id && 'bg-primary/5'
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Context Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setContextOpen(!contextOpen);
              setTopicOpen(false);
              setSessionTypeOpen(false);
              setLanguageOpen(false);
            }}
            className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm transition-smooth hover:border-primary/50"
          >
            <span className="text-foreground">
              {contexts.find(c => c.id === selectedContext)?.label}
            </span>
            {contextOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {contextOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-border bg-card shadow-lg">
              <div className="py-1">
                {contexts.map((ctx) => (
                  <button
                    key={ctx.id}
                    onClick={() => {
                      setSelectedContext(ctx.id);
                      setContextOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center px-4 py-2.5 text-sm transition-smooth hover:bg-muted',
                      selectedContext === ctx.id && 'bg-primary/5'
                    )}
                  >
                    {ctx.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="action" onClick={onClose}>
          Start Session
        </Button>
      </div>
    </>
  );
}

export function StartSessionDialog({ open, onClose }: StartSessionDialogProps) {
  const isMobile = useIsMobile();

  if (!open) return null;

  // Mobile: use drawer that slides up from bottom
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="flex flex-row items-center gap-3 border-b border-border pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <DrawerTitle>Start Hedy Session</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto px-4 pb-6">
            <StartSessionContent onClose={onClose} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: use centered modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
      <div className="animate-fade-in relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Start Hedy Session</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <StartSessionContent onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
