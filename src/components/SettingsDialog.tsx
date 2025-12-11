import { useState } from 'react';
import { X, Settings as SettingsIcon, Mic, FileText, Sparkles, Monitor, SlidersHorizontal, HelpCircle, User, Lock, Mail, Sun, Moon, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
      <div className="animate-fade-in relative flex h-[600px] w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Sidebar */}
        <div className="w-48 border-r border-border bg-muted/30 p-4">
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
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">
                    Personal Information
                  </h3>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500 text-xs font-bold text-primary-foreground">
                    G
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm text-muted-foreground">
                      First Name
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        defaultValue="Clara"
                        className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <Button variant="action" size="default">
                        Save
                      </Button>
                    </div>
                  </div>

                  <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground transition-smooth hover:bg-muted">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    Change Password
                  </button>

                  <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground transition-smooth hover:bg-muted">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Change Email
                  </button>
                </div>
              </div>

              {/* Language Preferences */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  Language Preferences
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Choose the primary language for the conversations that Hedy will be joining. This will be used for speech recognition.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm text-muted-foreground">
                      Meeting/Class Language
                    </label>
                    <div className="relative">
                      <select className="h-10 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                        <option>English (English)</option>
                        <option>Spanish (Español)</option>
                        <option>French (Français)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  <div>
                    <p className="mb-1.5 text-sm text-muted-foreground">
                      Choose the language Hedy will use to chat with you.
                    </p>
                    <label className="mb-1.5 block text-sm text-muted-foreground">
                      Hedy Chat Language
                    </label>
                    <div className="relative">
                      <select className="h-10 w-full appearance-none rounded-lg border border-border bg-background px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                        <option>English (US) (English (US))</option>
                        <option>English (UK)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dark Mode */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 text-base font-semibold text-foreground">
                  Dark Mode
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setThemeMode('system')}
                    className={cn(
                      'flex h-16 flex-1 items-center justify-center rounded-lg border transition-smooth',
                      themeMode === 'system'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted'
                    )}
                  >
                    <SettingsIcon className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => setThemeMode('light')}
                    className={cn(
                      'flex h-16 flex-1 items-center justify-center rounded-lg border transition-smooth',
                      themeMode === 'light'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:bg-muted'
                    )}
                  >
                    <Sun className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setThemeMode('dark')}
                    className={cn(
                      'flex h-16 flex-1 items-center justify-center rounded-lg border transition-smooth',
                      themeMode === 'dark'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted'
                    )}
                  >
                    <Moon className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Appearance */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  Appearance
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Show background image on desktop screens. When disabled, the app will use a solid color background matching your current theme.
                </p>

                <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Show Background Image
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Solid color background
                    </p>
                  </div>
                  <Switch
                    checked={showBackgroundImage}
                    onCheckedChange={setShowBackgroundImage}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'general' && (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <p>{settingsTabs.find((t) => t.id === activeTab)?.label} settings coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
