import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FileText, Folder, Bookmark, Settings, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SettingsDialog } from './SettingsDialog';
import { StartSessionDialog } from './StartSessionDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from './ui/button';
import hedyLogo from '@/assets/hedy-logo.svg';
import hedyLogoDark from '@/assets/hedy-logo-dark-new.svg';
import hedyGlassesLogo from '@/assets/hedy-glasses-logo.svg';
import hedyGlassesLogoDark from '@/assets/hedy-glasses-logo-dark.svg';
import glassesIcon from '@/assets/glasses-icon.svg';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const mainNavItems: NavItem[] = [
  { icon: <FileText className="h-5 w-5" />, label: 'Sessions', path: '/' },
  { icon: <Folder className="h-5 w-5" />, label: 'Topics', path: '/topics' },
  { icon: <Bookmark className="h-5 w-5" />, label: 'Bookmarks', path: '/bookmarks' },
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

export function SidebarV2() {
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [startSessionOpen, setStartSessionOpen] = useState(false);
  const { collapsed, setCollapsed } = useSidebarCollapsed();
  const [isDark, setIsDark] = useState(false);
  const isMobile = useIsMobile();

  // Listen for theme changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const openSettings = () => {
    setSettingsOpen(true);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/topics') {
      return location.pathname === '/topics';
    }
    return location.pathname === path;
  };

  const isSubItemActive = (path: string) => {
    if (path.includes('#')) {
      return location.pathname === '/bookmarks';
    }
    return location.pathname === path;
  };

  // Don't render sidebar on mobile
  if (isMobile) return null;

  return (
    <>
      <aside 
        className={cn(
          "relative sticky top-0 flex h-screen flex-col bg-sidebar transition-all duration-300 border border-red-500",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo & Collapse Toggle */}
        <div className="flex h-14 items-center justify-between px-4 border border-red-500">
          <Link to="/" className="flex items-center">
            {collapsed ? (
              <img src={isDark ? hedyGlassesLogoDark : hedyGlassesLogo} alt="Hedy" className="h-12 w-14" />
            ) : (
              <img src={isDark ? hedyLogoDark : hedyLogo} alt="Hedy" className="h-6" />
            )}
          </Link>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="rounded-lg p-1.5 text-muted-foreground transition-smooth hover:bg-sidebar-accent hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 border border-red-500">
          <ul className="space-y-1 border border-red-500">
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
            {/* Settings */}
            <li>
              <button
                onClick={openSettings}
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
          </ul>
        </nav>

        {/* Bottom - Start Session Button */}
        <div className="px-2 py-4 border border-red-500">
          <Button 
            variant="action" 
            className={cn(
              "w-full gap-2",
              collapsed ? "px-2" : ""
            )}
            onClick={() => setStartSessionOpen(true)}
          >
            <img src={glassesIcon} alt="" className="h-6 w-6" />
            {!collapsed && <span>Start Session</span>}
          </Button>
        </div>
      </aside>

      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <StartSessionDialog open={startSessionOpen} onClose={() => setStartSessionOpen(false)} />
    </>
  );
}
