import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Settings as SettingsIcon, Mic, FileText, Sparkles, Monitor, SlidersHorizontal, HelpCircle, User } from 'lucide-react';
import { MobileBottomNav } from '@/components/MobileBottomNav';

const settingsCategories = [
  { id: 'general', label: 'General', icon: SettingsIcon, path: '/settings/general' },
  { id: 'meeting', label: 'Meeting', icon: Mic, path: '/settings/meeting' },
  { id: 'transcription', label: 'Transcription', icon: FileText, path: '/settings/transcription' },
  { id: 'automation', label: 'Automation', icon: Sparkles, path: '/settings/automation' },
  { id: 'system', label: 'System', icon: Monitor, path: '/settings/system' },
  { id: 'advanced', label: 'Advanced', icon: SlidersHorizontal, path: '/settings/advanced' },
  { id: 'support', label: 'Support & Legal', icon: HelpCircle, path: '/settings/support' },
  { id: 'account', label: 'Account', icon: User, path: '/settings/account' },
];

const Settings = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
        <Link
          to="/"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
        >
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Settings</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      {/* Content */}
      <main className="flex-1 p-4">
        <div className="space-y-3">
          {settingsCategories.map((category) => (
            <button
              key={category.id}
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
