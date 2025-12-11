import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FileText, Folder, Star, Settings, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SettingsDialog } from './SettingsDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import hedyLogo from '@/assets/hedy-logo.svg';
import glassesIcon from '@/assets/glasses-icon.svg';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const mainNavItems: NavItem[] = [
  { icon: <FileText className="h-5 w-5" />, label: 'Sessions', path: '/' },
  { icon: <Folder className="h-5 w-5" />, label: 'Topics', path: '/topics' },
  { icon: <Star className="h-5 w-5" />, label: 'Highlights', path: '/highlights' },
];

const bottomNavItems = [
  { icon: <HelpCircle className="h-5 w-5" />, label: 'Help' },
];

export function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('sidebar-collapsed');
      setCollapsed(saved ? JSON.parse(saved) : false);
    };
    
    window.addEventListener('sidebar-collapsed-change', handleStorageChange);
    return () => window.removeEventListener('sidebar-collapsed-change', handleStorageChange);
  }, []);

  const updateCollapsed = (value: boolean) => {
    setCollapsed(value);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(value));
    window.dispatchEvent(new Event('sidebar-collapsed-change'));
  };

  return { collapsed, setCollapsed: updateCollapsed };
}

export function Sidebar() {
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { collapsed, setCollapsed } = useSidebarCollapsed();
  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname.startsWith('/session');
    }
    if (path === '/topics') {
      return location.pathname === '/topics' || location.pathname.startsWith('/topic');
    }
    return location.pathname.startsWith(path);
  };

  // Don't render sidebar on mobile
  if (isMobile) return null;

  return (
    <>
      <aside 
        className={cn(
          "sticky top-0 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
          collapsed ? "w-20" : "w-56"
        )}
      >
        {/* Logo & Collapse Toggle */}
        <div className="flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center">
            {collapsed ? (
              <img src={glassesIcon} alt="Hedy" className="h-6 w-8" />
            ) : (
              <img src={hedyLogo} alt="Hedy" className="h-6" />
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-1.5 text-muted-foreground transition-smooth hover:bg-sidebar-accent hover:text-foreground"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-2 py-2">
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex w-full rounded-lg transition-smooth',
                    collapsed 
                      ? 'flex-col items-center justify-center px-2 py-3 gap-1'
                      : 'flex-row items-center gap-3 px-3 py-2',
                    isActive(item.path)
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  {item.icon}
                  <span className={cn(
                    "font-medium",
                    collapsed ? "text-[10px]" : "text-sm"
                  )}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="px-2 py-2">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setSettingsOpen(true)}
                className={cn(
                  'flex w-full rounded-lg text-sidebar-foreground transition-smooth hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  collapsed 
                    ? 'flex-col items-center justify-center px-2 py-3 gap-1'
                    : 'flex-row items-center gap-3 px-3 py-2'
                )}
              >
                <Settings className="h-5 w-5" />
                <span className={cn(
                  "font-medium",
                  collapsed ? "text-[10px]" : "text-sm"
                )}>
                  Settings
                </span>
              </button>
            </li>
            {bottomNavItems.map((item) => (
              <li key={item.label}>
                <button 
                  className={cn(
                    'flex w-full rounded-lg text-sidebar-foreground transition-smooth hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    collapsed 
                      ? 'flex-col items-center justify-center px-2 py-3 gap-1'
                      : 'flex-row items-center gap-3 px-3 py-2'
                  )}
                >
                  {item.icon}
                  <span className={cn(
                    "font-medium",
                    collapsed ? "text-[10px]" : "text-sm"
                  )}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile */}
        <div className="p-2">
          <button
            onClick={() => setSettingsOpen(true)}
            className={cn(
              'flex w-full rounded-lg transition-smooth hover:bg-sidebar-accent',
              collapsed 
                ? 'flex-col items-center justify-center px-2 py-3 gap-1'
                : 'flex-row items-center gap-3 px-2 py-2'
            )}
          >
            <div className={cn(
              "flex items-center justify-center rounded-full bg-avatar font-semibold text-avatar-foreground",
              collapsed ? "h-8 w-8 text-xs" : "h-9 w-9 text-sm"
            )}>
              CL
            </div>
            {collapsed ? (
              <span className="text-[10px] font-medium text-foreground">Clara</span>
            ) : (
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium text-foreground">Clara</span>
                <span className="text-xs text-muted-foreground">clarajmunro@gmail....</span>
              </div>
            )}
          </button>
        </div>
      </aside>

      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
