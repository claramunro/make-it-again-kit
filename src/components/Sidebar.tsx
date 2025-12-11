import { FileText, Folder, Star, Settings, HelpCircle, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const mainNavItems: NavItem[] = [
  { icon: <FileText className="h-4 w-4" />, label: 'Sessions', active: true },
  { icon: <Folder className="h-4 w-4" />, label: 'Topics' },
  { icon: <Star className="h-4 w-4" />, label: 'Highlights' },
];

const bottomNavItems: NavItem[] = [
  { icon: <Settings className="h-4 w-4" />, label: 'Settings' },
  { icon: <HelpCircle className="h-4 w-4" />, label: 'Help' },
  { icon: <Code2 className="h-4 w-4" />, label: 'Dev Tools' },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-56 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-semibold text-foreground">Hedy</span>
          <span className="text-primary">✦</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {mainNavItems.map((item) => (
            <li key={item.label}>
              <button
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-smooth',
                  item.active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-sidebar-border px-3 py-2">
        <ul className="space-y-1">
          {bottomNavItems.map((item) => (
            <li key={item.label}>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-smooth hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* User Profile */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-avatar text-sm font-semibold text-avatar-foreground">
            CL
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">Clara</span>
            <span className="text-xs text-muted-foreground">clarajmunro@gmail....</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
