import { useState } from 'react';
import { 
  X, Settings as SettingsIcon, Mic, FileText, Sparkles, Monitor, 
  SlidersHorizontal, HelpCircle, User, Lock, Mail, Sun, Moon, 
  ChevronDown, ChevronRight, HelpCircle as Question, Zap, Ban,
  Users, LayoutGrid, Check, Lightbulb, MessageSquare, Plus,
  MoreVertical, Phone, ExternalLink, Shield, FileText as FileDoc,
  Info, Copyright, Link2, LogOut, Trash2, UserPlus, RefreshCw
} from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { cn } from '@/lib/utils';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

type SettingsTab = 'general' | 'meeting' | 'transcription' | 'automation' | 'system' | 'advanced' | 'support' | 'account';

const settingsTabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
  { id: 'general', label: 'General', icon: <SettingsIcon className="h-4 w-4" /> },
  { id: 'meeting', label: 'Meeting', icon: <Mic className="h-4 w-4" /> },
  { id: 'transcription', label: 'Transcription', icon: <FileText className="h-4 w-4" /> },
  { id: 'automation', label: 'Automation', icon: <Sparkles className="h-4 w-4" /> },
  { id: 'system', label: 'System', icon: <Monitor className="h-4 w-4" /> },
  { id: 'advanced', label: 'Advanced', icon: <SlidersHorizontal className="h-4 w-4" /> },
  { id: 'support', label: 'Support & Legal', icon: <HelpCircle className="h-4 w-4" /> },
  { id: 'account', label: 'Account', icon: <User className="h-4 w-4" /> },
];

export function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [themeMode, setThemeMode] = useState<'system' | 'light' | 'dark'>('light');
  const [showBackgroundImage, setShowBackgroundImage] = useState(false);
  const [enableAudioRecording, setEnableAudioRecording] = useState(true);
  const [suggestionFrequency, setSuggestionFrequency] = useState<'off' | 'selective' | 'balanced' | 'frequent'>('frequent');
  const [sendSuggestionsAsNotifications, setSendSuggestionsAsNotifications] = useState(false);
  const [enableCustomVocabulary, setEnableCustomVocabulary] = useState(false);
  const [speechRecognitionModel, setSpeechRecognitionModel] = useState<'small' | 'regular' | 'large'>('large');
  const [enableVoiceActivityDetection, setEnableVoiceActivityDetection] = useState(true);
  const [sensitivity, setSensitivity] = useState([75]);
  const [transcriptFrequency, setTranscriptFrequency] = useState<'slower' | 'normal' | 'faster'>('faster');
  const [enableAutoRecapEmail, setEnableAutoRecapEmail] = useState(false);
  const [enableAutoDetailedNotes, setEnableAutoDetailedNotes] = useState(true);
  const [includeDetailedNotesInEmail, setIncludeDetailedNotesInEmail] = useState(false);
  const [autoExportTodos, setAutoExportTodos] = useState(false);
  const [enableCloudSync, setEnableCloudSync] = useState(true);
  const [showSystemTrayIcon, setShowSystemTrayIcon] = useState(true);
  const [startOnBoot, setStartOnBoot] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="animate-fade-in relative flex h-[700px] w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-lg p-2 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Sidebar */}
        <div className="w-48 shrink-0 border-r border-border bg-muted/30 p-4">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Settings</h2>
          <nav className="space-y-1">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-smooth',
                  activeTab === tab.id
                    ? 'bg-card text-primary shadow-sm'
                    : 'text-muted-foreground hover:bg-card hover:text-foreground'
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">Personal Information</h3>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 text-xs font-bold text-primary-foreground">G</div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm text-muted-foreground">First Name</label>
                    <div className="flex gap-3">
                      <input type="text" defaultValue="Clara" className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                      <Button variant="action" size="default">Save</Button>
                    </div>
                  </div>
                  <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground transition-smooth hover:bg-muted">
                    <Lock className="h-4 w-4 text-muted-foreground" />Change Password
                  </button>
                  <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground transition-smooth hover:bg-muted">
                    <Mail className="h-4 w-4 text-muted-foreground" />Change Email
                  </button>
                </div>
              </div>

              {/* Language Preferences */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-2 text-base font-semibold text-foreground">Language Preferences</h3>
                <p className="mb-4 text-sm text-muted-foreground">Choose the primary language for the conversations that Hedy will be joining. This will be used for speech recognition.</p>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm text-muted-foreground">Meeting/Class Language</label>
                    <div className="relative">
                      <select className="h-10 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                        <option>English (English)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="mb-1.5 text-sm text-muted-foreground">Choose the language Hedy will use to chat with you.</p>
                    <label className="mb-1.5 block text-sm text-muted-foreground">Hedy Chat Language</label>
                    <div className="relative">
                      <select className="h-10 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                        <option>English (US) (English (US))</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dark Mode */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 text-base font-semibold text-foreground">Dark Mode</h3>
                <div className="flex gap-3">
                  {(['system', 'light', 'dark'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setThemeMode(mode)}
                      className={cn(
                        'flex h-16 flex-1 items-center justify-center rounded-lg border transition-smooth',
                        themeMode === mode ? (mode === 'light' ? 'border-primary bg-primary text-primary-foreground' : 'border-primary bg-primary/5') : 'border-border hover:bg-muted'
                      )}
                    >
                      {mode === 'system' && <SettingsIcon className="h-5 w-5 text-muted-foreground" />}
                      {mode === 'light' && <Sun className="h-5 w-5" />}
                      {mode === 'dark' && <Moon className="h-5 w-5 text-muted-foreground" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Appearance */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-2 text-base font-semibold text-foreground">Appearance</h3>
                <p className="mb-4 text-sm text-muted-foreground">Show background image on desktop screens. When disabled, the app will use a solid color background matching your current theme.</p>
                <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Show Background Image</p>
                    <p className="text-xs text-muted-foreground">Solid color background</p>
                  </div>
                  <Switch checked={showBackgroundImage} onCheckedChange={setShowBackgroundImage} />
                </div>
              </div>
            </div>
          )}

          {/* Meeting Tab */}
          {activeTab === 'meeting' && (
            <div className="space-y-6">
              {/* Session Type */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">Session Type</h3>
                  <Question className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Get the most relevant support for every conversation. Choose a session type and Hedy will provide insights and suggestions perfectly tailored to that scenario, helping you achieve your specific goals.</p>
                <div className="relative mb-3">
                  <select className="h-10 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Business Meetings</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Use Hedy for team meetings, project discussions, client presentations, and other professional meetings.</p>
              </div>

              {/* Save Session Audio */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">Save Session Audio</h3>
                  <Question className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Never miss a detail. Save session audio to revisit key moments and ensure accurate records. (Remember to always get consent from participants before recording.)</p>
                <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                  <span className="text-sm text-foreground">Enable Audio Recording</span>
                  <Switch checked={enableAudioRecording} onCheckedChange={setEnableAudioRecording} />
                </div>
              </div>

              {/* Automatic Suggestions */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">Automatic Suggestions</h3>
                  <Question className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Get real-time suggestions during your conversations without having to ask Hedy first.</p>
                <div className="mb-4 rounded-lg bg-primary/10 px-4 py-2.5 text-sm text-primary">
                  <Zap className="mr-2 inline h-4 w-4" />
                  Pro plan benefit: Automatic suggestions stay active for up to 60 minutes per session.
                </div>
                
                <h4 className="mb-2 text-sm font-medium text-foreground">Suggestion Frequency</h4>
                <p className="mb-3 text-xs text-muted-foreground">Choose how often you want to receive suggestions.</p>
                <div className="space-y-2">
                  {([
                    { id: 'off', label: 'Off', icon: Ban },
                    { id: 'selective', label: 'Selective', icon: Users },
                    { id: 'balanced', label: 'Balanced', icon: LayoutGrid },
                    { id: 'frequent', label: 'Frequent', icon: Zap },
                  ] as const).map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSuggestionFrequency(option.id)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-smooth',
                        suggestionFrequency === option.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <option.icon className={cn('h-4 w-4', suggestionFrequency === option.id ? 'text-primary' : 'text-muted-foreground')} />
                        <span className="text-sm text-foreground">{option.label}</span>
                      </div>
                      {suggestionFrequency === option.id && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">More suggestions with a lower threshold for when Hedy will provide feedback.</p>

                <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                  <span className="text-sm text-foreground">Send Suggestions as System Notifications</span>
                  <Switch checked={sendSuggestionsAsNotifications} onCheckedChange={setSendSuggestionsAsNotifications} />
                </div>

                <div className="mt-4 flex justify-center gap-6">
                  <button className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                    <Lightbulb className="h-4 w-4" />Leave Feedback
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                    <Question className="h-4 w-4" />Learn More
                  </button>
                </div>
              </div>

              {/* Custom Vocabulary */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">Custom Vocabulary</h3>
                  <Question className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Teach Hedy your specific terms, company names, and technical jargon. These terms improve real-time transcription accuracy and are automatically corrected during transcript cleanup.</p>
                <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                  <span className="text-sm text-foreground">Enable Custom Vocabulary</span>
                  <Switch checked={enableCustomVocabulary} onCheckedChange={setEnableCustomVocabulary} />
                </div>
              </div>

              {/* Custom Quick Prompts */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">Custom Quick Prompts</h3>
                  <Question className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Instantly access your go-to questions and commands. Create custom prompts (e.g., 'Summarize action items for me') to get the information you need, faster, in any session.</p>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-primary py-3 text-sm font-medium text-primary transition-smooth hover:bg-primary/5">
                  <Plus className="h-4 w-4" />Add Prompt
                </button>
              </div>

              {/* Session AI Context */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">Session AI Context & Instructions</h3>
                  <span className="rounded bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">PRO</span>
                  <Question className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Get smarter, more personalized insights from Hedy. By providing context – like your role, company details, or project goals – Hedy can tailor its analysis and suggestions to be far more relevant and impactful for you. You can also include specific instructions, such as advice you want Hedy to give you during the session, or a preferred format for the summary. Pro users can save and switch between multiple context profiles.</p>
                
                <div className="mb-3 flex items-center justify-between rounded-lg border border-border bg-background p-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">Context Titleeee</span>
                      <span className="rounded bg-primary/20 px-1.5 py-0.5 text-xs text-primary">Default</span>
                      <span className="rounded bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">Selected</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Contetn contennntttt</p>
                    <p className="text-xs text-muted-foreground">Oct 11, 2025</p>
                  </div>
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-primary py-3 text-sm font-medium text-primary transition-smooth hover:bg-primary/5">
                  <Plus className="h-4 w-4" />Add Context
                </button>
              </div>
            </div>
          )}

          {/* Transcription Tab */}
          {activeTab === 'transcription' && (
            <div className="space-y-6">
              {/* Speech Recognition Options */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-2 text-base font-semibold text-foreground">Speech Recognition Options</h3>
                <p className="mb-4 text-sm text-muted-foreground">Optimize transcription for your needs</p>
                <div className="relative">
                  <select className="h-10 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Local Speech Recognition</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Speech Recognition Model */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-2 text-base font-semibold text-foreground">Speech Recognition Model</h3>
                <p className="mb-2 text-sm text-muted-foreground">On macOS, you can select from different model sizes. The small model is faster but may be less accurate. The 'Large' model offers the highest accuracy for non-English languages and requires a one-time download if selected.</p>
                <p className="mb-4 text-sm text-muted-foreground">For Intel Macs, the 'Small' model is recommended. For newer Apple Silicon Macs, the 'Large' model is recommended.</p>
                
                <div className="flex gap-2">
                  {(['small', 'regular', 'large'] as const).map((model) => (
                    <button
                      key={model}
                      onClick={() => setSpeechRecognitionModel(model)}
                      className={cn(
                        'flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-smooth',
                        speechRecognitionModel === model ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-muted'
                      )}
                    >
                      {speechRecognitionModel === model && <Check className="h-4 w-4" />}
                      {model === 'small' && <SlidersHorizontal className="h-4 w-4" />}
                      {model === 'regular' && <LayoutGrid className="h-4 w-4" />}
                      {model.charAt(0).toUpperCase() + model.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Activity Detection */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-foreground" />
                  <h3 className="text-base font-semibold text-foreground">Voice Activity Detection</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Automatically pause transcription when no speech is detected. Adjust sensitivity to control how aggressively silence is filtered.</p>
                
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Enable voice activity detection</p>
                    <p className="text-xs text-muted-foreground">Reduces silent segments in the transcript</p>
                  </div>
                  <Switch checked={enableVoiceActivityDetection} onCheckedChange={setEnableVoiceActivityDetection} />
                </div>

                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-foreground">Sensitivity</span>
                  <span className="text-sm text-muted-foreground">High sensitivity</span>
                </div>
                <Slider value={sensitivity} onValueChange={setSensitivity} max={100} step={1} className="mb-2" />
                <p className="text-xs text-muted-foreground">Captures quiet speakers but may include more ambient sound.</p>
              </div>

              {/* Transcript Frequency */}
              <div className="rounded-xl border border-border bg-card p-5">
                <span className="mb-3 inline-block rounded bg-destructive/20 px-2 py-0.5 text-xs font-semibold text-destructive">⚠ EXPERIMENTAL</span>
                <h3 className="mb-2 text-base font-semibold text-foreground">Transcript Frequency</h3>
                <p className="mb-4 text-sm text-muted-foreground">Balance real-time updates with battery life. Choose how frequently your transcript updates: 'Faster' for near-instant updates (uses more power), or 'Normal'/'Slower' for optimized battery and processing.</p>
                
                <div className="mb-2 flex gap-2">
                  {(['slower', 'normal', 'faster'] as const).map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setTranscriptFrequency(freq)}
                      className={cn(
                        'flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-smooth',
                        transcriptFrequency === freq ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-muted'
                      )}
                    >
                      {transcriptFrequency === freq && <Check className="h-4 w-4" />}
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Transcripts will update every 1 second. This uses more power.</p>
              </div>
            </div>
          )}

          {/* Automation Tab */}
          {activeTab === 'automation' && (
            <div className="space-y-6">
              {/* Auto Recap Email */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">Auto Recap Email</h3>
                  <Question className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Keep everyone informed effortlessly. Automatically send key takeaways and a session summary via email after each meeting. (Note: Emails are sent unencrypted; please consider conversation confidentiality.)</p>
                <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                  <span className="text-sm text-foreground">Enable Auto Recap Email</span>
                  <Switch checked={enableAutoRecapEmail} onCheckedChange={setEnableAutoRecapEmail} />
                </div>
              </div>

              {/* Auto Detailed Notes */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">Auto Detailed Notes</h3>
                  <span className="rounded bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">PRO</span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Save time and ensure nothing is missed. Hedy can automatically create comprehensive detailed notes at the end of each session, ready for review or sharing.</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                    <span className="text-sm text-foreground">Enable Auto Detailed Notes</span>
                    <Switch checked={enableAutoDetailedNotes} onCheckedChange={setEnableAutoDetailedNotes} />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                    <span className="text-sm text-foreground">Include Detailed Notes in Auto Recap Email</span>
                    <Switch checked={includeDetailedNotesInEmail} onCheckedChange={setIncludeDetailedNotesInEmail} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              {/* Privacy Preferences */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">Privacy Preferences</h3>
                  <Question className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Control how your meetings sync and choose the data protection region that best matches your privacy requirements.</p>
                
                <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                  <span className="text-sm text-foreground">Enable Cloud Sync</span>
                  <Switch checked={enableCloudSync} onCheckedChange={setEnableCloudSync} />
                </div>

                <div className="relative">
                  <select className="h-10 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>United States</option>
                    <option>European Union</option>
                    <option>United Kingdom</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Microphone Settings */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">Microphone Settings</h3>
                  <button className="text-muted-foreground hover:text-foreground">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Hedy can capture both system audio (from video calls, etc.) and microphone input. Select which microphone to use below.</p>
                
                <div className="relative">
                  <select className="h-10 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Default System Input</option>
                    <option>MacBook Pro Microphone</option>
                    <option>External Microphone</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Desktop Settings */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 text-base font-semibold text-foreground">Desktop Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start justify-between rounded-lg border border-border bg-background p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">Show System Tray Icon</p>
                      <p className="text-xs text-muted-foreground">Access Hedy instantly. Keep the Hedy icon in your menu bar for one-click access to start, pause, or manage your sessions.</p>
                    </div>
                    <Switch checked={showSystemTrayIcon} onCheckedChange={setShowSystemTrayIcon} />
                  </div>

                  <div className="flex items-start justify-between rounded-lg border border-border bg-background p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">Start Hedy on System Boot</p>
                      <p className="text-xs text-muted-foreground">Ensure Hedy is always ready. Automatically start Hedy when you log in, so it's prepared to capture insights from your very first meeting of the day.</p>
                    </div>
                    <Switch checked={startOnBoot} onCheckedChange={setStartOnBoot} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Tab */}
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">API Access</h3>
                  <span className="rounded bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">PRO</span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Automate your workflows and integrate Hedy with your favorite tools. Generate an API key to connect Hedy data to Zapier, CRMs, and more, streamlining how you use your meeting insights. (Cloud Sync must be active).{' '}
                  <a href="#" className="text-primary hover:underline">Learn More</a>
                </p>
                <Button variant="action" className="mb-4 w-full">Generate New API Key</Button>

                <div className="flex items-center justify-between rounded-lg border border-border bg-background p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Auto-Export To-Dos</p>
                    <p className="text-xs text-muted-foreground">Streamline your task management. Automatically send all your Hedy-generated To-Dos to your connected tools (via webhook) after each session, ensuring action items flow directly into your workflow.</p>
                  </div>
                  <Switch checked={autoExportTodos} onCheckedChange={setAutoExportTodos} />
                </div>

                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-primary py-3 text-sm font-medium text-primary transition-smooth hover:bg-primary/5">
                  <Link2 className="h-4 w-4" />Manage Webhooks
                </button>
              </div>
            </div>
          )}

          {/* Support & Legal Tab */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              {/* Help & Support */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 text-base font-semibold text-foreground">Help & Support</h3>
                <div className="space-y-1">
                  <button className="flex w-full items-center justify-between py-3 text-sm text-foreground transition-smooth hover:bg-muted rounded-lg px-2">
                    <span>Watch Tutorial</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="flex w-full items-center justify-between py-3 text-sm text-foreground transition-smooth hover:bg-muted rounded-lg px-2">
                    <div className="flex items-center gap-3">
                      <Question className="h-4 w-4 text-muted-foreground" />
                      <span>Questions? Check out our Help Center</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="flex w-full items-center justify-between py-3 text-sm text-foreground transition-smooth hover:bg-muted rounded-lg px-2">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div className="text-left">
                        <p>Email Support</p>
                        <p className="text-xs text-muted-foreground">support@hedy.bot</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Legal */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 text-base font-semibold text-foreground">Legal</h3>
                <div className="space-y-1">
                  <button className="flex w-full items-center justify-between py-3 text-sm text-foreground transition-smooth hover:bg-muted rounded-lg px-2">
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span>Trust Center</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="flex w-full items-center justify-between py-3 text-sm text-foreground transition-smooth hover:bg-muted rounded-lg px-2">
                    <div className="flex items-center gap-3">
                      <FileDoc className="h-4 w-4 text-muted-foreground" />
                      <span>Terms of Use</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="flex w-full items-center justify-between py-3 text-sm text-foreground transition-smooth hover:bg-muted rounded-lg px-2">
                    <div className="flex items-center gap-3">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <span>Privacy Policy</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="flex w-full items-center justify-between py-3 text-sm text-foreground transition-smooth hover:bg-muted rounded-lg px-2">
                    <div className="flex items-center gap-3">
                      <Copyright className="h-4 w-4 text-muted-foreground" />
                      <span>Open Source Licenses</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              {/* Invites */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">Invites</h3>
                  <span className="rounded bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">PRO</span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">View and manage all your shared content. See what you've shared with others and what others have shared with you.</p>
                <Button variant="action" className="w-full gap-2">
                  <UserPlus className="h-4 w-4" />Invites
                </Button>
              </div>

              {/* Hedy Pro License */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-2 text-base font-semibold text-foreground">Hedy Pro License</h3>
                <p className="text-sm text-muted-foreground">You have an active Pro subscription (no expiration date).</p>
              </div>

              {/* Account */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 text-base font-semibold text-foreground">Account</h3>
                <Button variant="action" className="mb-4 w-full gap-2">
                  <LogOut className="h-4 w-4" />Sign Out
                </Button>

                <div className="rounded-lg bg-destructive/10 p-4">
                  <h4 className="mb-1 text-sm font-semibold text-destructive">Danger zone</h4>
                  <p className="mb-3 text-xs text-destructive">Are you sure you want to delete your account? This action cannot be undone.</p>
                  <Button variant="outline" className="gap-2 border-destructive text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />Delete Account
                  </Button>
                </div>
              </div>

              {/* Footer info */}
              <div className="text-center text-xs text-muted-foreground">
                <p>User Email: clarajmunro@gmail.com</p>
                <p>User ID: jaRPllouieY5sAlu3Vv4Dl0Ugu13</p>
                <p>Device ID: 1742583674523_10445</p>
                <p>App Version 2.12.0 (175)</p>
                <p className="mt-2">© 2025 Hedy AI LLC</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
