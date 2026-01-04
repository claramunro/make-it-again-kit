import { useState, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Users, Copy, RefreshCw, ChevronRight, ChevronDown, Info, Send, Sparkles, Lock, Lightbulb, FolderOpen, FolderPlus, Umbrella, UsersRound, Calendar, MessageCircle, Monitor, UserRound, LayoutGrid, Landmark, Wrench, Utensils, Search, MusicIcon, Heart, Star, Settings, Camera, Smartphone, Check, FileText, Share, Bookmark as BookmarkIcon, Clock, Trash2, Quote, BarChart3, Pencil, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SidebarV2 } from '@/components/SidebarV2';
import { Header } from '@/components/Header';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { BookmarkDetailPanel } from '@/components/BookmarkDetailPanel';
import { useIsMobile } from '@/hooks/use-mobile';
import { topics } from '@/data/topics';
import { bookmarks, Bookmark } from '@/data/bookmarks';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

const topicColorMap: Record<string, string> = {
  '🎨': 'hsl(12, 76%, 61%)',
  '📦': 'hsl(199, 89%, 48%)',
  '🚀': 'hsl(235, 66%, 45%)',
  '🏋️': 'hsl(142, 71%, 45%)',
  '☕': 'hsl(25, 38%, 39%)',
  '🐶': 'hsl(36, 100%, 50%)',
  '📅': 'hsl(262, 52%, 47%)',
  '💻': 'hsl(207, 18%, 51%)',
  '📢': 'hsl(338, 71%, 51%)',
  '🤝': 'hsl(160, 84%, 39%)',
  '💰': 'hsl(45, 93%, 47%)',
  '👥': 'hsl(271, 91%, 65%)',
  '🔬': 'hsl(181, 100%, 41%)',
  '⚖️': 'hsl(0, 0%, 62%)',
  '🎉': 'hsl(0, 84%, 60%)',
};

const topicColors = [
  'hsl(12, 76%, 61%)',
  'hsl(199, 89%, 48%)',
  'hsl(235, 66%, 45%)',
  'hsl(142, 71%, 45%)',
  'hsl(142, 69%, 58%)',
  'hsl(76, 74%, 50%)',
  'hsl(36, 100%, 50%)',
  'hsl(16, 100%, 50%)',
  'hsl(0, 84%, 60%)',
  'hsl(338, 71%, 51%)',
  'hsl(262, 52%, 47%)',
  'hsl(271, 91%, 65%)',
  'hsl(25, 38%, 39%)',
  'hsl(0, 0%, 62%)',
  'hsl(207, 18%, 51%)',
  'hsl(160, 84%, 39%)',
  'hsl(181, 100%, 41%)',
  'hsl(45, 93%, 47%)',
];

const topicEmojis = ['🎨', '📦', '🏋️', '☕', '🐶', '📅', '💡', '🎯', '🚀', '✨', '🎵', '❤️', '⭐', '🔧', '📱', '💻'];

const mockSessions = [
  {
    id: '1',
    title: 'Final UI Refinements and Merge Preparation',
    date: 'Oct 18, 2025',
    time: '9:16 AM',
    duration: '22m',
    bookmarks: 3,
    summary: 'Julian and Clara reviewed the progress on the final UI refinements for the Hedy app redesign.',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Hedy App Redesign Sync',
    date: 'Nov 18, 2025',
    time: '3:31 PM',
    duration: '40m',
    bookmarks: 0,
    summary: 'Julian and Clara reviewed the current state of the Hedy app redesign.',
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Hedy App UI Update and Health Discussion',
    date: 'Nov 14, 2025',
    time: '9:33 AM',
    duration: '31m',
    bookmarks: 2,
    summary: 'Julian and Clara discussed the latest progress on the Hedy app redesign.',
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Hedy Redesign Progress Review',
    date: 'Nov 5, 2025',
    time: '2:15 PM',
    duration: '28m',
    bookmarks: 0,
    summary: 'The team reviewed overall progress on the redesign initiative.',
    isFavorite: false,
  },
];

type TopicTab = 'overview' | 'sessions' | 'bookmarks' | 'appearance';
type MobileTopicTab = 'overview' | 'sessions' | 'chat' | 'highlights' | 'appearance';
type SessionTab = 'details' | 'bookmarks' | 'transcript';

const wallpaperPresets = [
  { id: 'sand', gradient: 'bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300', name: 'Sand', color: 'hsl(45, 93%, 60%)' },
  { id: 'peach', gradient: 'bg-gradient-to-br from-orange-200 via-rose-100 to-orange-300', name: 'Peach', color: 'hsl(12, 76%, 61%)' },
  { id: 'mint', gradient: 'bg-gradient-to-br from-emerald-300 via-teal-200 to-emerald-400', name: 'Mint', color: 'hsl(160, 84%, 39%)' },
  { id: 'lavender', gradient: 'bg-gradient-to-br from-purple-300 via-pink-200 to-purple-400', name: 'Lavender', color: 'hsl(271, 91%, 65%)' },
  { id: 'ocean', gradient: 'bg-gradient-to-br from-blue-300 via-sky-200 to-blue-400', name: 'Ocean', color: 'hsl(199, 89%, 48%)' },
  { id: 'sunset', gradient: 'bg-gradient-to-br from-orange-400 via-rose-300 to-yellow-400', name: 'Sunset', color: 'hsl(16, 100%, 50%)' },
];

const mockSessionBookmarks = [
  {
    id: '1',
    title: 'Uncertainty and Initiative in Action',
    date: 'Oct 21, 2025',
    time: '7:22 PM',
    duration: '01:14',
    mainIdea: 'When faced with uncertainty, taking a small, concrete action can precede clarity and serve as a catalyst for problem-solving.',
    originalContext: "Bye bye. I'm going to the desk. I wasn't sure what to do. I'll figure that out.",
    analysis: 'This reflects the principle of "action preceding insight," common in dynamic work environments.',
  },
  {
    id: '2',
    title: 'The Importance of Sequence in Process',
    date: 'Oct 21, 2025',
    time: '7:25 PM',
    duration: '00:45',
    mainIdea: 'The order of operations matters significantly in any process.',
    originalContext: "We need to establish the baseline before we can measure improvement.",
    analysis: 'This highlights the importance of methodical approach in problem-solving.',
  },
];

const visibleQuickPrompts = [
  'Summarize key points',
  'What are the action items?',
  'Explain the main concepts',
  'Identify key themes',
];

const TopicDetailBannerFull = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  
  const initialSessionId = searchParams.get('session') || mockSessions[0].id;
  const initialTab = searchParams.get('tab') as TopicTab | null;
  
  const [activeTopicTab, setActiveTopicTab] = useState<TopicTab>(initialTab === 'sessions' ? 'sessions' : 'overview');
  const [mobileActiveTab, setMobileActiveTab] = useState<MobileTopicTab>('overview');
  const [activeSessionTab, setActiveSessionTab] = useState<SessionTab>('details');
  const [selectedSessionId, setSelectedSessionId] = useState(initialSessionId);
  const [sessionFavorites, setSessionFavorites] = useState<Record<string, boolean>>(
    mockSessions.reduce((acc, s) => ({ ...acc, [s.id]: s.isFavorite }), {})
  );
  const [selectedColor, setSelectedColor] = useState(0);
  const [topicName, setTopicName] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [selectedWallpaper, setSelectedWallpaper] = useState('mint');
  const [selectedBookmarkId, setSelectedBookmarkId] = useState(mockSessionBookmarks[0].id);
  const [bookmarkDropdownOpen, setBookmarkDropdownOpen] = useState(false);
  const [promptsModalOpen, setPromptsModalOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [mobileSelectedSession, setMobileSelectedSession] = useState<typeof mockSessions[0] | null>(null);
  
  const selectedSessionBookmark = mockSessionBookmarks.find(b => b.id === selectedBookmarkId);
  const topic = topics.find(t => t.id === id);
  const selectedSession = mockSessions.find(s => s.id === selectedSessionId);
  const defaultTopicColor = topic ? topicColorMap[topic.icon] || 'hsl(207, 18%, 51%)' : 'hsl(207, 18%, 51%)';
  const selectedWallpaperPreset = wallpaperPresets.find(w => w.id === selectedWallpaper);
  const topicColor = selectedWallpaperPreset?.color || defaultTopicColor;
  
  const topicBookmarks = useMemo(() => {
    return bookmarks.filter(b => b.topicId === id || b.topicName === topic?.name);
  }, [id, topic?.name]);
  
  const toggleSessionFavorite = (sessionId: string) => {
    setSessionFavorites(prev => ({ ...prev, [sessionId]: !prev[sessionId] }));
  };
  
  if (!topic) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Topic not found</p>
      </div>
    );
  }

  // Chat Panel Component
  const ChatPanel = () => (
    <div className="w-80 shrink-0 border-l border-border bg-card flex flex-col relative z-50">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">Chat in Topic</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Share className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="px-4 py-3 border-b border-border space-y-2">
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <Share className="h-4 w-4" />
          Share as Text
        </button>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <FileText className="h-4 w-4" />
          Share as Markdown
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
            Can you summarize the key points from this topic?
          </div>
        </div>
        
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-sm text-foreground">
            <p className="mb-2">Here are the key points from this topic:</p>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>UI refinements are nearing completion</li>
              <li>The main branch merge is ready</li>
              <li>Mobile responsiveness improvements discussed</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-2 border-t border-border">
        <div className="flex flex-wrap gap-1.5">
          {visibleQuickPrompts.map((prompt) => (
            <button
              key={prompt}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth"
            >
              {prompt}
              <Sparkles className="h-3 w-3" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-2">
          <Sparkles className="ml-2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="How can I help?"
            className="flex-1 bg-transparent px-2 text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <Button variant="action" size="icon" className="h-9 w-9 rounded-full">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Mobile Session Drawer
  const MobileSessionDrawer = () => {
    if (!mobileSelectedSession) return null;
    
    return (
      <Drawer open={sessionModalOpen} onOpenChange={(open) => {
        setSessionModalOpen(open);
        if (!open) setMobileSelectedSession(null);
      }}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="border-b border-border pb-4">
            <DrawerTitle className="text-xl font-semibold text-left">
              {mobileSelectedSession.title}
            </DrawerTitle>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{mobileSelectedSession.date}</span>
                <span className="rounded-full bg-primary/80 px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  {mobileSelectedSession.duration}
                </span>
              </div>
            </div>
          </DrawerHeader>
          
          <div className="flex border-b border-border px-4">
            {(['details', 'highlights', 'transcript'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveSessionTab(tab === 'highlights' ? 'bookmarks' : tab)}
                className={cn(
                  'flex-1 py-3 text-sm font-medium transition-smooth border-b-2',
                  (tab === 'highlights' ? activeSessionTab === 'bookmarks' : activeSessionTab === tab)
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground'
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto p-4">
            {activeSessionTab === 'details' && (
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-4">
                  <h2 className="mb-3 text-base font-semibold text-foreground">Summary</h2>
                  <p className="text-sm leading-relaxed text-foreground">
                    {mobileSelectedSession.summary}
                  </p>
                </div>
              </div>
            )}

            {activeSessionTab === 'bookmarks' && (
              <div className="space-y-3">
                {mockSessionBookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <BookmarkIcon className="mt-0.5 h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-foreground">{bookmark.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{bookmark.mainIdea}</p>
                  </div>
                ))}
              </div>
            )}

            {activeSessionTab === 'transcript' && (
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-sm text-primary mb-4">
                  <Sparkles className="h-4 w-4" />
                  Viewing cleaned transcript
                </div>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold mb-1">Speaker 1:</p>
                    <p className="text-muted-foreground">This is example transcript content.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    );
  };

  // Mobile/Tablet Layout
  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <MobileSessionDrawer />

        {/* Color Banner */}
        <div 
          className="h-14 w-full shrink-0 relative"
          style={{ backgroundColor: `color-mix(in srgb, ${topicColor} 30%, white 70%)` }}
        >
          {/* Back Button */}
          <div className="absolute top-3 left-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col bg-background rounded-t-3xl -mt-4 relative z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          {/* Header */}
          <div className="px-4 pt-5 pb-4">
            {/* Row 1: Emoji container overlapping banner */}
            <div className="flex items-start gap-3 ml-8">
              {/* Topic Icon Container - overlapping banner with white inner stroke */}
              <div 
                className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl shrink-0 -mt-12"
                style={{ 
                  backgroundColor: `color-mix(in srgb, ${topicColor} 15%, white 85%)`,
                  boxShadow: 'inset 0 0 0 5px white, 0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                {topic.icon}
              </div>
              
              {/* Title + Meta + Shared badge */}
              <div className="min-w-0 flex-1 pt-1">
                <h1 className="text-xl font-bold text-foreground">{topic.name}</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {mockSessions.length} sessions • Last updated {topic.date}
                </p>
                {topic.sharedBy && (
                  <span 
                    className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium mt-2"
                    style={{ 
                      borderColor: `color-mix(in srgb, ${topicColor} 50%, transparent 50%)`,
                      backgroundColor: `color-mix(in srgb, ${topicColor} 10%, transparent 90%)`,
                      color: topicColor
                    }}
                  >
                    <Users className="h-3 w-3" />
                    Shared by {topic.sharedBy}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="flex border-t border-b border-border overflow-x-auto px-2">
            {(['overview', 'sessions', 'chat', 'highlights', 'appearance'] as MobileTopicTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setMobileActiveTab(tab)}
                className={cn(
                  'flex-1 min-w-0 py-3 text-xs font-medium transition-smooth whitespace-nowrap px-2',
                  mobileActiveTab === tab
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <span className={cn(
                  'inline-block px-3 py-1.5 rounded-lg',
                  mobileActiveTab === tab && 'bg-muted'
                )}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4">
          {mobileActiveTab === 'overview' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <h2 className="mb-3 text-base font-semibold text-foreground">Topic Overview</h2>
                <p className="text-sm leading-relaxed text-foreground">
                  This topic contains {topic.sessionCount} sessions covering various discussions related to {topic.name}.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <h2 className="mb-3 text-base font-semibold text-foreground">Recent Sessions</h2>
                <div className="space-y-2">
                  {mockSessions.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{session.title}</p>
                        <p className="text-xs text-muted-foreground">{session.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mobileActiveTab === 'sessions' && (
            <div className="space-y-3">
              {mockSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => {
                    setMobileSelectedSession(session);
                    setSessionModalOpen(true);
                    setActiveSessionTab('details');
                  }}
                  className="w-full flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="flex-1 text-sm font-medium truncate">{session.title}</span>
                      <Star 
                        className={cn(
                          "h-4 w-4 shrink-0",
                          sessionFavorites[session.id] 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-muted-foreground"
                        )} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {session.date} • {session.duration}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground mt-3" />
                </button>
              ))}
            </div>
          )}

          {mobileActiveTab === 'chat' && (
            <div className="flex flex-col h-[calc(100vh-320px)]">
              <div className="flex-1 overflow-auto space-y-4 mb-4">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary px-4 py-3 text-sm text-primary-foreground">
                    Can you summarize the key points from this topic?
                  </div>
                </div>

                <div className="rounded-xl border-l-4 border-primary/30 bg-primary/5 p-4">
                  <p className="mb-2 text-sm leading-relaxed text-foreground">
                    Here are the key points from this topic:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                    <li>UI refinements are nearing completion</li>
                    <li>The main branch merge is ready</li>
                    <li>Mobile responsiveness improvements discussed</li>
                  </ul>
                </div>
              </div>

              <div className="shrink-0">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-2">
                  <Sparkles className="ml-2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="How can I help?"
                    className="flex-1 bg-transparent px-2 text-sm placeholder:text-muted-foreground focus:outline-none"
                  />
                  <Button variant="action" size="icon" className="h-9 w-9 rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {mobileActiveTab === 'highlights' && (
            <div className="space-y-3">
              {topicBookmarks.length > 0 ? (
                topicBookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-start gap-3">
                      <BookmarkIcon className="mt-0.5 h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{bookmark.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{bookmark.sessionTitle}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No highlights in this topic yet
                </div>
              )}
            </div>
          )}

          {mobileActiveTab === 'appearance' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Wallpaper</h3>
                <div className="grid grid-cols-3 gap-2">
                  {wallpaperPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedWallpaper(preset.id)}
                      className={cn(
                        'aspect-video rounded-lg overflow-hidden border-2 transition-all',
                        selectedWallpaper === preset.id ? 'border-primary' : 'border-transparent'
                      )}
                    >
                      <div className={cn('h-full w-full', preset.gradient)} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Accent Color</h3>
                <div className="flex flex-wrap gap-2">
                  {topicColors.slice(0, 12).map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={cn(
                        'h-8 w-8 rounded-full transition-all',
                        selectedColor === i && 'ring-2 ring-offset-2 ring-primary'
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Icon</h3>
                <div className="flex flex-wrap gap-2">
                  {topicEmojis.slice(0, 12).map((emoji, i) => (
                    <button
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-xl"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        <MobileBottomNav />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="flex h-screen bg-card overflow-hidden">
      <SidebarV2 />
      
      {promptsModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setPromptsModalOpen(false)}
        />
      )}
      
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Header />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Color Banner - Light tinted */}
          <div 
            className="h-16 w-full shrink-0 relative rounded-tl-2xl"
            style={{ backgroundColor: `color-mix(in srgb, ${topicColor} 25%, white 75%)` }}
          >
            {/* Back Button */}
            <div className="absolute top-3 left-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Content Container - overlapping the banner with shadow */}
          <div className="flex-1 -mt-4 relative z-10 bg-background rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] overflow-visible flex flex-col">
          
            {/* Topic Header */}
            <div className="sticky top-0 z-10 border-b border-border bg-background rounded-t-3xl px-6 pt-6 pb-4">
              {/* Row 1: Emoji + Title + Meta + Shared Badge */}
              <div className="flex items-start gap-4">
                {/* Topic Icon Container - overlapping into banner, positioned to the right of back button */}
                <div 
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shrink-0 -mt-14 ml-10 shadow-lg"
                  style={{ 
                    backgroundColor: `color-mix(in srgb, ${topicColor} 15%, white 85%)`,
                    boxShadow: 'inset 0 0 0 5px white, 0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  {topic.icon}
                </div>
                
                {/* Title and Meta */}
                <div className="min-w-0 flex-1 pt-2">
                  <h1 className="text-2xl font-bold text-foreground">{topic.name}</h1>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <span>{mockSessions.length} sessions</span>
                    <span>•</span>
                    <span>Last updated Dec 1</span>
                    <span>•</span>
                  </div>
                </div>

                {/* Right: Shared badge */}
                <div className="shrink-0 pt-2">
                  {topic.sharedBy ? (
                    <span 
                      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium"
                      style={{ 
                        borderColor: `color-mix(in srgb, ${topicColor} 40%, transparent 60%)`,
                        backgroundColor: `color-mix(in srgb, ${topicColor} 8%, transparent 92%)`,
                        color: topicColor
                      }}
                    >
                      <Users className="h-3 w-3" />
                      Shared by {topic.sharedBy}
                    </span>
                  ) : (
                    <div className="w-24" /> 
                  )}
                </div>
              </div>

              {/* Row 2: Tabs - left justified, aligned with emoji container */}
              <div className="mt-4 ml-10">
                <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
                  {(['overview', 'sessions', 'highlights', 'appearance'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTopicTab(tab === 'highlights' ? 'bookmarks' : tab)}
                      className={cn(
                        'rounded-md px-6 py-2 text-sm font-medium transition-smooth',
                        (tab === 'highlights' ? activeTopicTab === 'bookmarks' : activeTopicTab === tab)
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          
          {/* Content Area - Same as original TopicDetail */}
          {activeTopicTab === 'sessions' && (
            <div className="flex flex-1 overflow-hidden">
              {/* Left: Sessions Sidebar */}
              <div className="w-64 xl:w-80 shrink-0 border-r border-border overflow-y-auto bg-background min-w-0">
                <div className="p-3 space-y-1">
                  {mockSessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => setSelectedSessionId(session.id)}
                      className={cn(
                        'w-full flex items-start gap-3 rounded-lg px-3 py-3 text-left transition-smooth cursor-pointer',
                        selectedSessionId === session.id
                          ? 'bg-card border border-border shadow-sm'
                          : 'hover:bg-muted/50'
                      )}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="flex-1 text-sm font-medium truncate">{session.title}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSessionFavorite(session.id);
                            }}
                            className="shrink-0 p-0.5 rounded hover:bg-muted transition-smooth"
                          >
                            <Star 
                              className={cn(
                                "h-3.5 w-3.5",
                                sessionFavorites[session.id] 
                                  ? "fill-yellow-400 text-yellow-400" 
                                  : "text-muted-foreground hover:text-yellow-400"
                              )} 
                            />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {session.date} • {session.time} • {session.duration}
                        </p>
                        {session.bookmarks > 0 && (
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <BookmarkIcon className="h-3 w-3" />
                            {session.bookmarks} bookmarks
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Center: Session Content */}
              <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                {selectedSession && (
                  <>
                    <div className="shrink-0 px-6 pt-6 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Date: {selectedSession.date} {selectedSession.time}</p>
                          <p className="text-sm text-muted-foreground">Duration: {selectedSession.duration}</p>
                        </div>
                        
                        <button className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm">
                          <span>☕</span>
                          <span>Coffee</span>
                          <ChevronRight className="h-3.5 w-3.5 rotate-90" />
                        </button>
                      </div>
                      
                      <div className="flex justify-center">
                        <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
                          {(['details', 'bookmarks', 'transcript'] as SessionTab[]).map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setActiveSessionTab(tab)}
                              className={cn(
                                'rounded-md px-6 py-2 text-sm font-medium transition-smooth',
                                activeSessionTab === tab
                                  ? 'bg-card text-foreground shadow-sm'
                                  : 'text-muted-foreground hover:text-foreground'
                              )}
                            >
                              {tab === 'bookmarks' ? 'Bookmarks' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto px-6 pb-6">
                      {activeSessionTab === 'details' && (
                        <div className="space-y-6">
                          <div className="rounded-xl border border-border bg-card p-5">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold">Topic Overview</h3>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                              <p>
                                The {topic.name} initiative is an ongoing effort to modernize and enhance the user interface and experience. The redesign focuses on improving usability, simplifying navigation, and aligning the visual identity more closely with the brand.
                              </p>
                              <p>
                                Key themes across the sessions include a strong emphasis on simplifying the UI structure, especially by reducing nested containers and moving toward cleaner, more intuitive layouts.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center gap-2">
                            <Button variant="ghost" className="gap-2">
                              <FileText className="h-4 w-4" />
                              Edit Notes
                            </Button>
                            <Button variant="ghost" className="gap-2">
                              <Share className="h-4 w-4" />
                              Share Detailed Notes
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {activeSessionTab === 'bookmarks' && (
                        <div className="space-y-4">
                          <div className="relative">
                            <button
                              onClick={() => setBookmarkDropdownOpen(!bookmarkDropdownOpen)}
                              className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-3 text-left text-sm transition-smooth hover:bg-muted/50"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <BookmarkIcon className="h-4 w-4 shrink-0 text-primary" />
                                <span className="truncate font-medium">{selectedSessionBookmark?.title}</span>
                              </div>
                              <ChevronRight className={cn(
                                "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                                bookmarkDropdownOpen && "rotate-90"
                              )} />
                            </button>
                            
                            {bookmarkDropdownOpen && (
                              <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-border bg-card py-1 shadow-lg">
                                {mockSessionBookmarks.map((bookmark) => (
                                  <button
                                    key={bookmark.id}
                                    onClick={() => {
                                      setSelectedBookmarkId(bookmark.id);
                                      setBookmarkDropdownOpen(false);
                                    }}
                                    className={cn(
                                      'flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-smooth',
                                      selectedBookmarkId === bookmark.id
                                        ? 'bg-muted text-foreground'
                                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                    )}
                                  >
                                    <BookmarkIcon className="h-4 w-4 shrink-0 text-primary" />
                                    <span className="truncate">{bookmark.title}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {selectedSessionBookmark && (
                            <div className="rounded-xl border border-border bg-card p-5">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <p className="text-sm text-foreground">{selectedSessionBookmark.date}</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-muted-foreground">{selectedSessionBookmark.time}</span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      {selectedSessionBookmark.duration}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                                    <Share className="h-4 w-4" />
                                    Share
                                  </Button>
                                  <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                                  <h4 className="text-sm font-medium">Main Idea</h4>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {selectedSessionBookmark.mainIdea}
                                </p>
                              </div>
                              
                              <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Quote className="h-4 w-4 text-muted-foreground" />
                                  <h4 className="text-sm font-medium">Original Context</h4>
                                </div>
                                <p className="text-sm text-muted-foreground italic leading-relaxed">
                                  {selectedSessionBookmark.originalContext}
                                </p>
                              </div>
                              
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                  <h4 className="text-sm font-medium">Analysis</h4>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {selectedSessionBookmark.analysis}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {activeSessionTab === 'transcript' && (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-primary text-sm">
                              <Sparkles className="h-4 w-4" />
                              Viewing cleaned transcript
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                            <div>
                              <p className="font-semibold text-foreground mb-1">Julian:</p>
                              <p className="text-sm text-muted-foreground">Hey Clara, how's the redesign coming along? I saw your latest updates in Figma.</p>
                            </div>
                            <div>
                              <p className="font-semibold text-foreground mb-1">Clara:</p>
                              <p className="text-sm text-muted-foreground">It's going well! I've been focusing on the mobile layouts this week. The navigation is much cleaner now.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              
              {/* Right: Chat Panel */}
              <ChatPanel />
            </div>
          )}
          
          {activeTopicTab === 'overview' && (
            <div className="flex flex-1 overflow-hidden">
              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Topic Insights</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The topic of {topic.name} contains {topic.sessionCount} sessions covering various aspects of the subject. Key discussions have focused on implementation strategies, best practices, and collaborative problem-solving.
                  </p>
                  <p className="text-xs text-muted-foreground text-right">
                    Last Generated: Dec 11, 2025 10:25 PM
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold border-t border-border pt-6">Recent Sessions</h3>
                  <div className="space-y-2">
                    {mockSessions.slice(0, 4).map((session) => (
                      <div key={session.id} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{session.title}</p>
                          <p className="text-xs text-muted-foreground">{session.date} • {session.duration}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right: Chat Panel */}
              <ChatPanel />
            </div>
          )}
          
          {activeTopicTab === 'bookmarks' && (
            <div className="flex flex-1 overflow-hidden">
              {/* Left: Bookmarks List */}
              <div className="w-[400px] shrink-0 border-r border-border overflow-y-auto p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">Bookmarks</h2>
                    <span className="text-sm text-muted-foreground">({topicBookmarks.length})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Sort By</span>
                    <span className="font-medium text-foreground">Recent</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  {topicBookmarks.length > 0 ? (
                    topicBookmarks.map((bookmark) => (
                      <button
                        key={bookmark.id}
                        onClick={() => setSelectedBookmark(bookmark)}
                        className={cn(
                          'w-full flex items-center gap-3 rounded-lg p-3 text-left transition-smooth',
                          selectedBookmark?.id === bookmark.id
                            ? 'bg-primary/5 border border-primary/20'
                            : 'hover:bg-muted/50'
                        )}
                      >
                        <BookmarkIcon className={cn(
                          'h-5 w-5 shrink-0',
                          bookmark.isFavorite 
                            ? 'stroke-yellow-500 fill-yellow-400/30' 
                            : 'text-muted-foreground'
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{bookmark.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-muted-foreground">{bookmark.datetime}</span>
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                              {bookmark.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{bookmark.sessionTitle}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      </button>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-40 text-muted-foreground">
                      <p>No bookmarks in this topic yet.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Middle: Bookmark Detail Panel */}
              <div className="flex-1 overflow-y-auto p-6">
                {selectedBookmark ? (
                  <div className="max-w-2xl mx-auto">
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                      <BookmarkDetailPanel 
                        bookmark={selectedBookmark} 
                        onClose={() => setSelectedBookmark(null)}
                        showCloseButton
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>Select a bookmark to view details</p>
                  </div>
                )}
              </div>
              
              {/* Right: Chat Panel */}
              <ChatPanel />
            </div>
          )}
          
          {activeTopicTab === 'appearance' && (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  {topic.sharedBy && (
                    <div className="rounded-lg bg-amber-100 px-4 py-3 text-sm text-amber-800 flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      This topic is shared view-only. Ask the owner to make changes.
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Basic information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="topicName" className="text-xs text-muted-foreground">Topic Name</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <FolderOpen className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          id="topicName"
                          value={topicName || topic.name}
                          onChange={(e) => setTopicName(e.target.value)}
                          className="pl-10"
                          disabled={!!topic.sharedBy}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Topic Description"
                        value={topicDescription}
                        onChange={(e) => setTopicDescription(e.target.value)}
                        className="min-h-[80px]"
                        disabled={!!topic.sharedBy}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="font-semibold">Appearance</h3>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">Wallpaper</p>
                      <div className="grid grid-cols-6 gap-3">
                        {wallpaperPresets.map((preset) => (
                          <button
                            key={preset.id}
                            onClick={() => setSelectedWallpaper(preset.id)}
                            className={cn(
                              'aspect-video rounded-lg overflow-hidden border-2 transition-all',
                              selectedWallpaper === preset.id ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-border'
                            )}
                          >
                            <div className={cn('h-full w-full', preset.gradient)} />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">Color</p>
                      <div className="flex flex-wrap gap-2">
                        {topicColors.map((color, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedColor(i)}
                            className={cn(
                              'h-8 w-8 rounded-full transition-all',
                              selectedColor === i && 'ring-2 ring-offset-2 ring-primary'
                            )}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">Emoji</p>
                      <div className="flex flex-wrap gap-2">
                        {topicEmojis.map((emoji, i) => (
                          <button
                            key={i}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-xl hover:bg-muted transition-smooth"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TopicDetailBannerFull;
