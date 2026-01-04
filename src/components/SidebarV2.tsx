import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FileText, Folder, Sparkles, Settings, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SettingsDialog } from './SettingsDialog';
import { StartSessionDialog } from './StartSessionDialog';
import { SearchDialog } from './SearchDialog';
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
  { icon: <Sparkles className="h-5 w-5" />, label: 'Highlights', path: '/highlights' },
];

// Sidebar is always collapsed now - keeping hook for compatibility
export function useSidebarCollapsed() {
  return { collapsed: true, setCollapsed: () => {} };
}

export function SidebarV2() {
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [startSessionOpen, setStartSessionOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

  // Don't render sidebar on mobile
  if (isMobile) return null;

  return (
    <>
      <aside className="relative sticky top-0 flex h-screen w-20 flex-col bg-background">
        {/* Logo */}
        <div className="flex h-14 items-center justify-center px-4">
          <Link to="/" className="flex items-center">
            <img src={isDark ? hedyGlassesLogoDark : hedyGlassesLogo} alt="Hedy" className="h-12 w-14" />
          </Link>
        </div>

        {/* Main Navigation - Vertically Centered */}
        <nav className="flex-1 flex items-center justify-center px-2 py-2">
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex w-full flex-col items-center justify-center rounded-lg px-2 py-3 gap-1 transition-smooth',
                    isActive(item.path)
                      ? 'bg-card text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  {item.icon}
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
            {/* Settings */}
            <li>
              <button
                onClick={openSettings}
                className="flex w-full flex-col items-center justify-center rounded-lg px-2 py-3 gap-1 text-sidebar-foreground transition-smooth hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Settings className="h-5 w-5" />
                <span className="text-[10px] font-medium">Settings</span>
              </button>
            </li>
            {/* Search */}
            <li>
              <button
                onClick={() => setSearchOpen(true)}
                className="flex w-full flex-col items-center justify-center rounded-lg px-2 py-3 gap-1 text-sidebar-foreground transition-smooth hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Search className="h-5 w-5" />
                <span className="text-[10px] font-medium">Search</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Bottom - Start Session Button */}
        <div className="px-2 py-4">
          <Button 
            variant="action" 
            className="w-full px-2 flex-col h-auto py-2 gap-1"
            onClick={() => setStartSessionOpen(true)}
          >
            <img src={glassesIcon} alt="" className="h-6 w-6" />
            <span className="text-[10px] font-medium leading-tight text-center">Start<br/>Session</span>
          </Button>
        </div>
      </aside>

      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <StartSessionDialog open={startSessionOpen} onClose={() => setStartSessionOpen(false)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
