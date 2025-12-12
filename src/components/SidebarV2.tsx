import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FileText, Folder, Bookmark, Settings, HelpCircle, ChevronLeft, Star, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SettingsDialog } from './SettingsDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { sessionGroups } from '@/data/sessions';
import { topics } from '@/data/topics';
import { bookmarks } from '@/data/bookmarks';
import hedyLogo from '@/assets/hedy-logo.svg';
import hedyLogoDark from '@/assets/hedy-logo-dark.svg';
import hedyGlassesLogo from '@/assets/hedy-glasses-logo.svg';
import hedyGlassesLogoDark from '@/assets/hedy-glasses-logo-dark.svg';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface FavoriteItem {
  id: string;
  label: string;
  path: string;
  type: 'session' | 'topic' | 'bookmark';
  topicIcon?: string;
}

const mainNavItems: NavItem[] = [
  { icon: <FileText className="h-5 w-5" />, label: 'Sessions', path: '/home2' },
  { icon: <Folder className="h-5 w-5" />, label: 'Topics', path: '/topics' },
  { icon: <Bookmark className="h-5 w-5" />, label: 'Bookmarks', path: '/bookmarks' },
];

const bottomNavItems = [
  { icon: <HelpCircle className="h-5 w-5" />, label: 'Support', action: 'support' },
];

// Get all starred/favorite items
const allSessions = sessionGroups.flatMap(group => group.sessions);
const starredSessions: FavoriteItem[] = allSessions
  .filter(s => s.isFavorite)
  .map(session => ({
    id: session.id,
    label: session.title.length > 22 ? session.title.substring(0, 22) + '...' : session.title,
    path: `/session/${session.id}`,
    type: 'session' as const,
  }));

const starredTopics: FavoriteItem[] = topics
  .filter(t => t.isFavorite)
  .map(topic => ({
    id: topic.id,
    label: topic.name.length > 22 ? topic.name.substring(0, 22) + '...' : topic.name,
    path: `/topic/${topic.id}`,
    type: 'topic' as const,
    topicIcon: topic.icon,
  }));

const starredBookmarks: FavoriteItem[] = bookmarks
  .filter(b => b.isFavorite)
  .map(bookmark => ({
    id: bookmark.id,
    label: bookmark.title.length > 22 ? bookmark.title.substring(0, 22) + '...' : bookmark.title,
    path: `/bookmarks#${bookmark.id}`,
    type: 'bookmark' as const,
  }));

const allFavorites: FavoriteItem[] = [...starredSessions, ...starredTopics, ...starredBookmarks];

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
  const [settingsDefaultTab, setSettingsDefaultTab] = useState<'general' | 'support'>('general');
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

  const openSettings = (tab: 'general' | 'support' = 'general') => {
    setSettingsDefaultTab(tab);
    setSettingsOpen(true);
  };

  const isActive = (path: string) => {
    if (path === '/home2') {
      return location.pathname === '/home2';
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
          "relative sticky top-0 flex h-screen flex-col bg-sidebar transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo & Collapse Toggle */}
        <div className="flex h-14 items-center justify-between px-4">
          <Link to="/home2" className="flex items-center">
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
        <nav className="flex-1 overflow-y-auto px-2 py-2">
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

          {/* Favorites Section */}
          {!collapsed && allFavorites.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-2 px-3 py-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-400/50" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Favorites</span>
              </div>
              <ul className="space-y-0.5 mt-1">
                {allFavorites.map((item) => (
                  <li key={`${item.type}-${item.id}`}>
                    <Link
                      to={item.path}
                      className={cn(
                        'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-smooth',
                        isSubItemActive(item.path)
                          ? 'bg-sidebar-accent/50 text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                      )}
                    >
                      {/* Type icon */}
                      <span className="w-5 shrink-0 flex items-center justify-center">
                        {item.type === 'session' && (
                          <Mic className="h-4 w-4 text-muted-foreground" />
                        )}
                        {item.type === 'topic' && item.topicIcon && (
                          <span className="text-sm">{item.topicIcon}</span>
                        )}
                        {item.type === 'bookmark' && (
                          <Bookmark className="h-4 w-4 text-muted-foreground" />
                        )}
                      </span>
                      
                      {/* Label */}
                      <span className="truncate flex-1">{item.label}</span>
                      
                      {/* Star indicator */}
                      <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-500" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Collapsed favorites indicator */}
          {collapsed && allFavorites.length > 0 && (
            <div className="mt-4 flex flex-col items-center">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-400/50" />
              <span className="text-[10px] text-muted-foreground mt-1">{allFavorites.length}</span>
            </div>
          )}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-2 py-2">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => openSettings('general')}
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
                  onClick={() => openSettings('support')}
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

      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} defaultTab={settingsDefaultTab} />
    </>
  );
}
