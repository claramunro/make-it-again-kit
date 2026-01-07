import { useState, useMemo } from 'react';
import { ArrowLeft, Plus, FileText, Info, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useSessions } from '@/contexts/SessionContext';
import { topics } from '@/data/topics';
import { cn } from '@/lib/utils';

interface MergeSessionsDialogProps {
  open: boolean;
  onClose: () => void;
  onMergeComplete: () => void;
}

type MergeStep = 'select' | 'configure';

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

export function MergeSessionsDialog({ open, onClose, onMergeComplete }: MergeSessionsDialogProps) {
  const { sessionGroups } = useSessions();
  const [step, setStep] = useState<MergeStep>('select');
  const [firstSessionId, setFirstSessionId] = useState<string | null>(null);
  const [secondSessionId, setSecondSessionId] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState('business');
  const [sessionContext, setSessionContext] = useState('none');
  const [selectedTopic, setSelectedTopic] = useState('none');
  const [isMerging, setIsMerging] = useState(false);

  const allSessions = useMemo(() => 
    sessionGroups.flatMap(group => group.sessions), 
    [sessionGroups]
  );

  const firstSession = allSessions.find(s => s.id === firstSessionId);
  const secondSession = allSessions.find(s => s.id === secondSessionId);

  const canContinue = firstSessionId && secondSessionId;
  const canMerge = firstSessionId && secondSessionId;

  const handleBack = () => {
    if (step === 'configure') {
      setStep('select');
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setStep('select');
    setFirstSessionId(null);
    setSecondSessionId(null);
    setSessionType('business');
    setSessionContext('none');
    setSelectedTopic('none');
    setIsMerging(false);
    onClose();
  };

  const handleContinue = () => {
    if (canContinue) {
      setStep('configure');
    }
  };

  const handleMerge = async () => {
    setIsMerging(true);
    // Simulate merge process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsMerging(false);
    handleClose();
    onMergeComplete();
  };

  const handleSelectSession = (slot: 'first' | 'second', sessionId: string) => {
    if (slot === 'first') {
      setFirstSessionId(sessionId);
    } else {
      setSecondSessionId(sessionId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <button 
            onClick={handleBack}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="flex-1 text-center text-base font-semibold text-foreground pr-8">
            {step === 'select' ? 'Merge Sessions' : 'Merge Configuration'}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px] flex flex-col">
          {step === 'select' ? (
            <>
              {/* Info banner */}
              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/50 p-4 mb-6">
                <Info className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <p className="text-sm text-foreground">
                  Select two sessions to merge. The merged session will combine audio, transcripts, and chats from both sessions.
                </p>
              </div>

              {/* First Session */}
              <div className="mb-4">
                <Label className="text-sm font-semibold text-foreground mb-2 block">First Session</Label>
                <Select value={firstSessionId || ''} onValueChange={(v) => handleSelectSession('first', v)}>
                  <SelectTrigger className="w-full h-auto min-h-[80px] p-4 justify-start">
                    {firstSession ? (
                      <div className="flex items-center gap-3 text-left">
                        <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{firstSession.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {firstSession.date} • {firstSession.time} • {firstSession.duration}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full py-2 text-muted-foreground">
                        <Plus className="h-5 w-5 mb-1" />
                        <span className="text-sm">Tap to select first session</span>
                      </div>
                    )}
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {allSessions.filter(s => s.id !== secondSessionId).map(session => (
                      <SelectItem key={session.id} value={session.id} className="py-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{session.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {session.date} • {session.time} • {session.duration}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Second Session */}
              <div className="mb-6">
                <Label className="text-sm font-semibold text-foreground mb-2 block">Second Session</Label>
                <Select value={secondSessionId || ''} onValueChange={(v) => handleSelectSession('second', v)}>
                  <SelectTrigger className="w-full h-auto min-h-[80px] p-4 justify-start">
                    {secondSession ? (
                      <div className="flex items-center gap-3 text-left">
                        <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{secondSession.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {secondSession.date} • {secondSession.time} • {secondSession.duration}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full py-2 text-muted-foreground">
                        <Plus className="h-5 w-5 mb-1" />
                        <span className="text-sm">Tap to select second session</span>
                      </div>
                    )}
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {allSessions.filter(s => s.id !== firstSessionId).map(session => (
                      <SelectItem key={session.id} value={session.id} className="py-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{session.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {session.date} • {session.time} • {session.duration}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1" />

              {/* Continue Button */}
              <Button
                className="w-full"
                disabled={!canContinue}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              {/* Sessions to Merge */}
              <div className="mb-6">
                <Label className="text-sm font-semibold text-foreground mb-3 block">Sessions to Merge</Label>
                <div className="space-y-3">
                  {firstSession && (
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                      <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{firstSession.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {firstSession.date} • {firstSession.time} • {firstSession.duration}
                        </p>
                      </div>
                    </div>
                  )}
                  {secondSession && (
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                      <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{secondSession.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {secondSession.date} • {secondSession.time} • {secondSession.duration}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Merge Settings */}
              <div className="mb-6">
                <Label className="text-sm font-semibold text-foreground mb-3 block">Merge Settings</Label>
                <div className="space-y-4">
                  {/* Session Type */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Session Type</Label>
                    <Select value={sessionType} onValueChange={setSessionType}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sessionTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              <span>{type.icon}</span>
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Session Context */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Session Context</Label>
                    <Select value={sessionContext} onValueChange={setSessionContext}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="context-1">Context Titleeee</SelectItem>
                        <SelectItem value="context-2">Meeting Follow-up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Topics */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Topics</Label>
                    <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {topics.map(topic => (
                          <SelectItem key={topic.id} value={topic.id}>
                            <div className="flex items-center gap-2">
                              <span>{topic.icon}</span>
                              <span>{topic.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex-1" />

              {/* Merge Button */}
              <Button
                variant="action"
                className="w-full"
                disabled={!canMerge || isMerging}
                onClick={handleMerge}
              >
                {isMerging ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Merging sessions...
                  </>
                ) : (
                  'Merge Sessions'
                )}
              </Button>
            </>
          )}
        </div>

        {/* Merging overlay */}
        {isMerging && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 rounded-xl bg-card p-8 shadow-lg">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium text-foreground">Merging sessions...</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
