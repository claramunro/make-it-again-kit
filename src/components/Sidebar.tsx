import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FileText, Folder, Bookmark, Settings, HelpCircle, ChevronLeft, Star } from 'lucide-react';
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

interface SubItem {
  id: string;
  label: string;
  path: string;
  isStarred?: boolean;
}

const mainNavItems: NavItem[] = [
  { icon: <FileText className="h-5 w-5" />, label: 'Sessions', path: '/' },
  { icon: <Folder className="h-5 w-5" />, label: 'Topics', path: '/topics' },
  { icon: <Bookmark className="h-5 w-5" />, label: 'Bookmarks', path: '/bookmarks' },
];

const bottomNavItems = [
  { icon: <HelpCircle className="h-5 w-5" />, label: 'Support', action: 'support' },
];

// Get first 4 sessions (prioritizing starred ones)
const allSessions = sessionGroups.flatMap(group => group.sessions);
const starredSessions = allSessions.filter(s => s.isFavorite);
const nonStarredSessions = allSessions.filter(s => !s.isFavorite);
const recentSessions: SubItem[] = [...starredSessions, ...nonStarredSessions].slice(0, 4).map(session => ({
  id: session.id,
  label: session.title.length > 25 ? session.title.substring(0, 25) + '...' : session.title,
  path: `/session/${session.id}`,
  isStarred: session.isFavorite,
}));

// Get starred topics first, then recent ones
const starredTopics = topics.filter(t => t.isFavorite);
const nonStarredTopics = topics.filter(t => !t.isFavorite);
const recentTopics: SubItem[] = [...starredTopics, ...nonStarredTopics].slice(0, 4).map(topic => ({
  id: topic.id,
  label: topic.name,
  path: `/topic/${topic.id}`,
  isStarred: topic.isFavorite,
}));

// Get first 4 bookmarks
const recentBookmarks: SubItem[] = bookmarks.slice(0, 4).map(bookmark => ({
  id: bookmark.id,
  label: bookmark.title.length > 25 ? bookmark.title.substring(0, 25) + '...' : bookmark.title,
  path: `/bookmarks#${bookmark.id}`,
}));

const subItemsMap: Record<string, SubItem[]> = {
  Sessions: recentSessions,
  Topics: recentTopics,
  Bookmarks: recentBookmarks,
};

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
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/topics') {
      return location.pathname === '/topics';
    }
    if (path === '/highlights') {
      return location.pathname === '/highlights';
    }
    return location.pathname === path;
  };

  const isSubItemActive = (path: string) => {
    if (path.includes('#')) {
      return location.pathname === '/highlights';
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
                
                {/* Sub-items - only show when not collapsed */}
                {!collapsed && subItemsMap[item.label] && (
                  <ul className="mt-1 ml-7 space-y-0.5">
                    {subItemsMap[item.label].map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          to={subItem.path}
                          className={cn(
                            'flex items-center gap-1.5 truncate rounded-md px-2 py-1.5 text-xs transition-smooth',
                            isSubItemActive(subItem.path)
                              ? 'bg-sidebar-accent/50 text-sidebar-accent-foreground'
                              : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                          )}
                        >
                          {item.label === 'Bookmarks' && (
                            <Bookmark className="h-3 w-3 shrink-0 text-muted-foreground" />
                          )}
                          {subItem.isStarred && item.label !== 'Bookmarks' && (
                            <Star className="h-3 w-3 shrink-0 stroke-yellow-500 fill-yellow-400/30" />
                          )}
                          <span className="truncate">{subItem.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
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
