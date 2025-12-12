import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Settings as SettingsIcon, Mic, FileText, Sparkles, 
  Monitor, SlidersHorizontal, HelpCircle, User, Lock, Mail, Sun, Moon,
  ChevronDown, Zap, Ban, Users, LayoutGrid, Check, Lightbulb,
  Phone, ExternalLink, Shield, Info, Copyright, Link2, LogOut, Trash2, 
  UserPlus, RefreshCw
} from 'lucide-react';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

type SettingsCategory = 'general' | 'meeting' | 'transcription' | 'automation' | 'system' | 'advanced' | 'support' | 'account';

const settingsCategories = [
  { id: 'general' as const, label: 'General', icon: SettingsIcon },
  { id: 'meeting' as const, label: 'Meeting', icon: Mic },
  { id: 'transcription' as const, label: 'Transcription', icon: FileText },
  { id: 'automation' as const, label: 'Automation', icon: Sparkles },
  { id: 'system' as const, label: 'System', icon: Monitor },
  { id: 'advanced' as const, label: 'Advanced', icon: SlidersHorizontal },
  { id: 'support' as const, label: 'Support & Legal', icon: HelpCircle },
  { id: 'account' as const, label: 'Account', icon: User },
];

interface SettingsDetailProps {
  category: SettingsCategory;
  onBack: () => void;
}

function SettingsDetail({ category, onBack }: SettingsDetailProps) {
  const [themeMode, setThemeMode] = useState<'system' | 'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') return 'dark';
      if (saved === 'light') return 'light';
    }
    return 'light';
  });
  const [enableAudioRecording, setEnableAudioRecording] = useState(true);
  const [suggestionFrequency, setSuggestionFrequency] = useState<'off' | 'selective' | 'balanced' | 'frequent'>('frequent');
  const [enableCustomVocabulary, setEnableCustomVocabulary] = useState(false);
  const [speechRecognitionModel, setSpeechRecognitionModel] = useState<'small' | 'regular' | 'large'>('large');
  const [enableVoiceActivityDetection, setEnableVoiceActivityDetection] = useState(true);
  const [sensitivity, setSensitivity] = useState([75]);
  const [transcriptFrequency, setTranscriptFrequency] = useState<'slower' | 'normal' | 'faster'>('faster');
  const [enableAutoRecapEmail, setEnableAutoRecapEmail] = useState(false);
  const [enableAutoDetailedNotes, setEnableAutoDetailedNotes] = useState(true);
  const [enableCloudSync, setEnableCloudSync] = useState(true);
  const [showSystemTrayIcon, setShowSystemTrayIcon] = useState(true);
  const [startOnBoot, setStartOnBoot] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (themeMode === 'light') {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', 'system');
    }
  }, [themeMode]);

  const categoryConfig = settingsCategories.find(c => c.id === category);

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-4">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{categoryConfig?.label}</h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto p-4">
        {/* General Tab */}
        {category === 'general' && (
          <div className="space-y-4">
            {/* Personal Information */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Personal Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 block text-xs text-muted-foreground">First Name</label>
                  <input type="text" defaultValue="Clara" className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none" />
                </div>
                <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
                  <Lock className="h-4 w-4 text-muted-foreground" />Change Password
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
                  <Mail className="h-4 w-4 text-muted-foreground" />Change Email
                </button>
              </div>
            </div>

            {/* Dark Mode */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Dark Mode</h3>
              <div className="flex gap-2">
                {(['system', 'light', 'dark'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setThemeMode(mode)}
                    className={cn(
                      'flex h-14 flex-1 items-center justify-center rounded-lg border transition-smooth',
                      themeMode === mode ? (mode === 'light' ? 'border-primary bg-primary text-primary-foreground' : 'border-primary bg-primary/5') : 'border-border hover:bg-muted'
                    )}
                  >
                    {mode === 'system' && <SettingsIcon className="h-5 w-5" />}
                    {mode === 'light' && <Sun className="h-5 w-5" />}
                    {mode === 'dark' && <Moon className="h-5 w-5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Meeting Tab */}
        {category === 'meeting' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Session Type</h3>
              <p className="mb-3 text-xs text-muted-foreground">Choose a session type for tailored support.</p>
              <div className="relative">
                <select className="h-10 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm">
                  <option>Business Meetings</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Save Session Audio</h3>
              <p className="mb-3 text-xs text-muted-foreground">Save audio to revisit key moments.</p>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                <span className="text-sm text-foreground">Enable Audio Recording</span>
                <Switch checked={enableAudioRecording} onCheckedChange={setEnableAudioRecording} />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Custom Vocabulary</h3>
              <p className="mb-3 text-xs text-muted-foreground">Teach Hedy your specific terms.</p>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                <span className="text-sm text-foreground">Enable Custom Vocabulary</span>
                <Switch checked={enableCustomVocabulary} onCheckedChange={setEnableCustomVocabulary} />
              </div>
            </div>
          </div>
        )}

        {/* Transcription Tab */}
        {category === 'transcription' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Speech Recognition Model</h3>
              <div className="space-y-2">
                {(['small', 'regular', 'large'] as const).map((model) => (
                  <button
                    key={model}
                    onClick={() => setSpeechRecognitionModel(model)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-smooth',
                      speechRecognitionModel === model ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'
                    )}
                  >
                    <span className="text-sm text-foreground capitalize">{model}</span>
                    {speechRecognitionModel === model && <Check className="h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Voice Activity Detection</h3>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 mb-3">
                <span className="text-sm text-foreground">Enable VAD</span>
                <Switch checked={enableVoiceActivityDetection} onCheckedChange={setEnableVoiceActivityDetection} />
              </div>
              <div>
                <label className="mb-2 block text-xs text-muted-foreground">Sensitivity: {sensitivity}%</label>
                <Slider value={sensitivity} onValueChange={setSensitivity} max={100} step={1} />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Transcript Frequency</h3>
              <div className="space-y-2">
                {(['slower', 'normal', 'faster'] as const).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setTranscriptFrequency(freq)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-smooth',
                      transcriptFrequency === freq ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'
                    )}
                  >
                    <span className="text-sm text-foreground capitalize">{freq}</span>
                    {transcriptFrequency === freq && <Check className="h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Automation Tab */}
        {category === 'automation' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Session Recap Email</h3>
              <p className="mb-3 text-xs text-muted-foreground">Automatically send a recap email after each session.</p>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                <span className="text-sm text-foreground">Enable Auto Recap Email</span>
                <Switch checked={enableAutoRecapEmail} onCheckedChange={setEnableAutoRecapEmail} />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Detailed Notes</h3>
              <p className="mb-3 text-xs text-muted-foreground">Automatically generate detailed notes.</p>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                <span className="text-sm text-foreground">Enable Auto Detailed Notes</span>
                <Switch checked={enableAutoDetailedNotes} onCheckedChange={setEnableAutoDetailedNotes} />
              </div>
            </div>
          </div>
        )}

        {/* System Tab */}
        {category === 'system' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Cloud Sync</h3>
              <p className="mb-3 text-xs text-muted-foreground">Sync your data across devices.</p>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                <span className="text-sm text-foreground">Enable Cloud Sync</span>
                <Switch checked={enableCloudSync} onCheckedChange={setEnableCloudSync} />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">System Tray</h3>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                <span className="text-sm text-foreground">Show System Tray Icon</span>
                <Switch checked={showSystemTrayIcon} onCheckedChange={setShowSystemTrayIcon} />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Startup</h3>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                <span className="text-sm text-foreground">Start on Boot</span>
                <Switch checked={startOnBoot} onCheckedChange={setStartOnBoot} />
              </div>
            </div>
          </div>
        )}

        {/* Advanced Tab */}
        {category === 'advanced' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Developer Options</h3>
              <p className="mb-3 text-xs text-muted-foreground">Advanced settings for developers.</p>
              <button className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
                <span>View Logs</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Data Management</h3>
              <div className="space-y-2">
                <button className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
                  <span>Export Data</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm text-destructive">
                  <span>Clear Cache</span>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Support & Legal Tab */}
        {category === 'support' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Get Help</h3>
              <div className="space-y-2">
                <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <span>Help Center</span>
                  <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>Contact Support</span>
                  <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                  <span>Send Feedback</span>
                  <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Legal</h3>
              <div className="space-y-2">
                <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>Privacy Policy</span>
                  <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Terms of Service</span>
                  <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">About</h3>
              <p className="text-xs text-muted-foreground">Hedy v1.0.0</p>
            </div>
          </div>
        )}

        {/* Account Tab */}
        {category === 'account' && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Subscription</h3>
              <div className="mb-3 flex items-center justify-between rounded-lg bg-primary/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Pro Plan</span>
                </div>
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
              <button className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
                Manage Subscription
              </button>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Connected Accounts</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 text-xs font-bold text-white">G</div>
                    <span className="text-sm text-foreground">Google</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Connected</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Danger Zone</h3>
              <div className="space-y-2">
                <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
                  <LogOut className="h-4 w-4 text-muted-foreground" />
                  <span>Sign Out</span>
                </button>
                <button className="flex w-full items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <MobileBottomNav />
    </div>
  );
}

const Settings = () => {
  const [selectedCategory, setSelectedCategory] = useState<SettingsCategory | null>(null);

  if (selectedCategory) {
    return <SettingsDetail category={selectedCategory} onBack={() => setSelectedCategory(null)} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="flex h-14 items-center justify-center border-b border-border bg-card px-4">
        <h1 className="text-lg font-semibold text-foreground">Settings</h1>
      </header>

      {/* Content */}
      <main className="flex-1 p-4">
        <div className="space-y-3">
          {settingsCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 transition-smooth hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <category.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {category.label}
                </span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
};

export default Settings;