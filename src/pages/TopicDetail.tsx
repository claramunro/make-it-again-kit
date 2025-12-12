import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Copy, RefreshCw, ChevronRight, ChevronDown, Info, Send, Sparkles, Lock, Lightbulb, FolderOpen, FolderPlus, Umbrella, UsersRound, Calendar, MessageCircle, Monitor, UserRound, LayoutGrid, Landmark, Wrench, Utensils, Search, MusicIcon, Heart, Star, Settings, Camera, Smartphone, Check, FileText, Share, Bookmark as BookmarkIcon, Clock, Trash2, Quote, BarChart3, Pencil, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { BookmarkGroup } from '@/components/BookmarkGroup';
import { BookmarkDetailPanel } from '@/components/BookmarkDetailPanel';
import { useIsMobile } from '@/hooks/use-mobile';
import { topics } from '@/data/topics';
import { bookmarks, Bookmark } from '@/data/bookmarks';
import { cn } from '@/lib/utils';

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

const topicIcons = [
  { icon: FolderOpen, name: 'folder' },
  { icon: FolderPlus, name: 'folder-plus' },
  { icon: LayoutGrid, name: 'grid' },
  { icon: Umbrella, name: 'umbrella' },
  { icon: UsersRound, name: 'users' },
  { icon: Calendar, name: 'calendar' },
  { icon: Lightbulb, name: 'lightbulb' },
  { icon: MessageCircle, name: 'message' },
  { icon: Monitor, name: 'monitor' },
  { icon: UserRound, name: 'user' },
  { icon: Landmark, name: 'home' },
  { icon: LayoutGrid, name: 'table' },
  { icon: Wrench, name: 'tools' },
  { icon: Utensils, name: 'utensils' },
  { icon: Search, name: 'search' },
  { icon: MusicIcon, name: 'music' },
  { icon: Sparkles, name: 'sparkles' },
  { icon: Heart, name: 'heart' },
  { icon: Star, name: 'star' },
  { icon: Settings, name: 'settings' },
  { icon: Camera, name: 'camera' },
  { icon: Smartphone, name: 'phone' },
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
    summary: 'Julian and Clara reviewed the progress on the final UI refinements for the Hedy app redesign, confirming that the interface is nearing completion and ready for merging into the main branch.',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Hedy App Redesign Sync',
    date: 'Nov 18, 2025',
    time: '3:31 PM',
    duration: '40m',
    bookmarks: 0,
    summary: 'Julian and Clara reviewed the current state of the Hedy app redesign, focusing on UI refinements, mobile responsiveness, and technical implementation challenges.',
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Hedy App UI Update and Health Discussion',
    date: 'Nov 14, 2025',
    time: '9:33 AM',
    duration: '31m',
    bookmarks: 2,
    summary: 'Julian and Clara discussed the latest progress on the Hedy app redesign, focusing on UI refinements in the settings area and dropdown component standardization.',
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Hedy Redesign Progress Review',
    date: 'Nov 5, 2025',
    time: '2:15 PM',
    duration: '28m',
    bookmarks: 0,
    summary: 'The team reviewed overall progress on the redesign initiative and discussed next steps.',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Initial Design Kickoff',
    date: 'Oct 28, 2025',
    time: '10:00 AM',
    duration: '45m',
    bookmarks: 5,
    summary: 'Initial meeting to establish design goals and brand direction for the refresh.',
    isFavorite: false,
  },
  {
    id: '6',
    title: 'Technical Architecture Review',
    date: 'Oct 23, 2025',
    time: '2:00 PM',
    duration: '35m',
    bookmarks: 1,
    summary: 'Deep dive into the technical architecture required for implementing the new design.',
    isFavorite: false,
  },
];

type TopicTab = 'overview' | 'sessions' | 'bookmarks' | 'appearance';
type SessionTab = 'details' | 'bookmarks' | 'transcript';

// Wallpaper presets with gradient configurations
const wallpaperPresets = [
  { id: 'sand', gradient: 'bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300', name: 'Sand' },
  { id: 'peach', gradient: 'bg-gradient-to-br from-orange-200 via-rose-100 to-orange-300', name: 'Peach' },
  { id: 'mint', gradient: 'bg-gradient-to-br from-emerald-300 via-teal-200 to-emerald-400', name: 'Mint' },
  { id: 'lavender', gradient: 'bg-gradient-to-br from-purple-300 via-pink-200 to-purple-400', name: 'Lavender' },
  { id: 'ocean', gradient: 'bg-gradient-to-br from-blue-300 via-sky-200 to-blue-400', name: 'Ocean' },
  { id: 'sunset', gradient: 'bg-gradient-to-br from-orange-400 via-rose-300 to-yellow-400', name: 'Sunset' },
];

// Mock bookmarks for sessions
const mockSessionBookmarks = [
  {
    id: '1',
    title: 'Uncertainty and Initiative in Action',
    date: 'Oct 21, 2025',
    time: '7:22 PM',
    duration: '01:14',
    mainIdea: 'When faced with uncertainty, taking a small, concrete action—like moving to a workspace—can precede clarity and serve as a catalyst for problem-solving, rather than waiting for full understanding before acting.',
    originalContext: "Bye bye. I'm going to the desk. I wasn't sure what to do. I'll figure that out.",
    analysis: 'This reflects the principle of "action preceding insight," common in dynamic work environments where decisions must be made amid ambiguity. By beginning the process—physically relocating and committing to figuring it out—the individual leverages momentum over hesitation, turning uncertainty into productive exploration.',
  },
  {
    id: '2',
    title: 'The Importance of Sequence in Process',
    date: 'Oct 21, 2025',
    time: '7:25 PM',
    duration: '00:45',
    mainIdea: 'The order of operations matters significantly in any process. Starting with the right foundation prevents costly rework later.',
    originalContext: "We need to establish the baseline before we can measure improvement. Otherwise, we're just guessing.",
    analysis: 'This highlights the importance of methodical approach in problem-solving and development processes.',
  },
  {
    id: '3',
    title: 'The Importance of Sequence in Process',
    date: 'Oct 21, 2025',
    time: '7:30 PM',
    duration: '00:52',
    mainIdea: 'Iterative feedback loops accelerate learning and reduce the time between action and insight.',
    originalContext: "Every time we test, we learn something new. The faster we can cycle through, the quicker we reach our goal.",
    analysis: 'This emphasizes the value of rapid iteration in modern development methodologies.',
  },
  {
    id: '4',
    title: 'The Importance of Sequence in Process',
    date: 'Oct 21, 2025',
    time: '7:35 PM',
    duration: '01:03',
    mainIdea: 'Documentation serves not just as record-keeping but as a tool for thinking through complex problems.',
    originalContext: "Writing it down forces me to think clearly. If I can't explain it simply, I don't understand it well enough.",
    analysis: 'This reflects the cognitive benefits of externalization—using writing as a thinking tool rather than merely a recording tool.',
  },
];

// Quick prompts data
const quickPromptCategories = [
  {
    title: 'Help understand',
    prompts: [
      'Summarize last 5 minutes',
      'Explain it like I\'m 5',
      'Request concept clarification',
      'Translate what was said',
    ],
  },
  {
    title: 'Lead the meeting',
    prompts: [
      'Outline next steps',
      'Identify blindspots',
      'Challenge idea constructively',
      'Resolve disagreements',
      'Recap decisions and actions',
    ],
  },
  {
    title: 'Contribute ideas',
    prompts: [
      'Suggest alternatives',
      'Brainstorm solutions',
      'Connect to past discussions',
    ],
  },
];

const visibleQuickPrompts = [
  'Summarize key points',
  'What are the action items?',
  'Explain the main concepts',
  'Identify key themes',
];

const TopicDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTopicTab, setActiveTopicTab] = useState<TopicTab>('overview');
  const [activeSessionTab, setActiveSessionTab] = useState<SessionTab>('details');
  const [selectedSessionId, setSelectedSessionId] = useState(mockSessions[0].id);
  const [sessionFavorites, setSessionFavorites] = useState<Record<string, boolean>>(
    mockSessions.reduce((acc, s) => ({ ...acc, [s.id]: s.isFavorite }), {})
  );
  const [iconType, setIconType] = useState<'icons' | 'emoji'>('icons');
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState(17);
  const [topicName, setTopicName] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [aiContext, setAiContext] = useState('Clara is working on design updates to the Hedy app.');
  const [selectedWallpaper, setSelectedWallpaper] = useState('mint');
  const [blurAmount, setBlurAmount] = useState([50]);
  const [overlayOpacity, setOverlayOpacity] = useState([60]);
  const [selectedBookmarkId, setSelectedBookmarkId] = useState(mockSessionBookmarks[0].id);
  const [viewOriginal, setViewOriginal] = useState(false);
  const [bookmarkDropdownOpen, setBookmarkDropdownOpen] = useState(false);
  const [promptsModalOpen, setPromptsModalOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);
  
  const selectedSessionBookmark = mockSessionBookmarks.find(b => b.id === selectedBookmarkId);
  
  const topic = topics.find(t => t.id === id);
  const selectedSession = mockSessions.find(s => s.id === selectedSessionId);
  
  // Filter bookmarks for this topic
  const topicBookmarks = useMemo(() => {
    return bookmarks.filter(b => b.topicId === id || b.topicName === topic?.name);
  }, [id, topic?.name]);
  
  // Group topic bookmarks by session
  const groupedTopicBookmarks = useMemo(() => {
    const groups: Record<string, { title: string; bookmarks: Bookmark[] }> = {};
    
    topicBookmarks.forEach((bookmark) => {
      const key = bookmark.sessionId;
      const title = bookmark.sessionTitle;
      
      if (!groups[key]) {
        groups[key] = { title, bookmarks: [] };
      }
      groups[key].bookmarks.push(bookmark);
    });
    
    return Object.entries(groups).map(([key, group]) => ({
      id: key,
      ...group,
    }));
  }, [topicBookmarks]);
  
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
    <div className="w-80 shrink-0 border-l border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">Chat in Topic</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Share className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Share Options */}
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
      
      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* User Message */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
            Can you summarize the key points from this topic?
          </div>
        </div>
        
        {/* AI Response */}
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-sm text-foreground">
            <p className="mb-2">Here are the key points from this topic:</p>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>UI refinements are nearing completion</li>
              <li>The main branch merge is ready</li>
              <li>Mobile responsiveness improvements discussed</li>
              <li>New font selection in progress</li>
            </ul>
          </div>
        </div>
        
        {/* User Message */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
            What are the next steps?
          </div>
        </div>
        
        {/* AI Response */}
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-sm text-foreground">
            Based on the discussion, the next steps are to finalize the font selection, complete the mobile layout adjustments, and prepare for the design review meeting scheduled for next week.
          </div>
        </div>
      </div>
      
      {/* Quick Prompts */}
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
          <button
            onClick={() => setPromptsModalOpen(true)}
            className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs text-primary hover:bg-primary/10 transition-smooth"
          >
            More
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      {/* Chat Input */}
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
      
      {/* Quick Prompts Modal */}
      {promptsModalOpen && (
        <div className="absolute bottom-0 right-80 w-96 max-h-[70vh] bg-card border border-border rounded-t-xl shadow-xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold">Quick Prompts</h3>
            <button
              onClick={() => setPromptsModalOpen(false)}
              className="p-1 rounded-md hover:bg-muted transition-smooth"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {quickPromptCategories.map((category) => (
              <div key={category.title}>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">{category.title}</h4>
                <div className="space-y-1">
                  {category.prompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setPromptsModalOpen(false)}
                      className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground hover:bg-muted transition-smooth"
                    >
                      <div className="flex items-center gap-3">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        <span>{prompt}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-card overflow-hidden">
      {!isMobile && <Sidebar />}
      
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Header />
        
        <main className="flex-1 flex flex-col rounded-tl-2xl bg-background overflow-hidden">
          {/* Topic Header */}
          <div className="sticky top-0 z-10 border-b border-border bg-background px-4 py-4 md:px-6">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Back button + Icon + Title + Meta */}
              <div className="flex items-center gap-3 min-w-0">
                <button 
                  onClick={() => navigate('/topics')}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-smooth hover:bg-primary/90"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <span className="text-xl shrink-0">{topic.icon}</span>
                <div className="min-w-0">
                  <h1 className="truncate text-sm font-medium leading-snug text-foreground">
                    {topic.name}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {mockSessions.length} Sessions
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last Updated: Oct 17, 2025 10:33 AM
                  </p>
                </div>
              </div>

              {/* Center: Tabs */}
              <div className="flex-1 flex justify-center">
                <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
                  {(['overview', 'sessions', 'bookmarks', 'appearance'] as TopicTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTopicTab(tab)}
                      className={cn(
                        'rounded-md px-6 py-2 text-sm font-medium transition-smooth',
                        activeTopicTab === tab
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {tab === 'bookmarks' ? 'Bookmarks' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Shared badge */}
              <div className="shrink-0">
                {topic.sharedBy ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
                    <Users className="h-3 w-3" />
                    Shared by {topic.sharedBy}
                  </span>
                ) : (
                  <div className="w-24" /> 
                )}
              </div>
            </div>
          </div>
          
          {/* Content Area */}
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
                    {/* Session Header */}
                    <div className="shrink-0 px-6 pt-6 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Date: {selectedSession.date} {selectedSession.time}</p>
                          <p className="text-sm text-muted-foreground">Duration: {selectedSession.duration}</p>
                        </div>
                        
                        {/* Session Type Badge */}
                        <button className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm">
                          <span>☕</span>
                          <span>Coffee</span>
                          <ChevronRight className="h-3.5 w-3.5 rotate-90" />
                        </button>
                      </div>
                      
                      {/* Session Tabs - matching pill style */}
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
                    
                    {/* Session Tab Content */}
                    <div className="flex-1 overflow-y-auto px-6 pb-6">
                      {activeSessionTab === 'details' && (
                        <div className="space-y-6">
                          {/* Topic Overview */}
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
                                The Hedy Redesign initiative is an ongoing effort led by Clara in collaboration with Julian to modernize and enhance the Hedy app's user interface and experience. The redesign focuses on improving usability, simplifying navigation, and aligning the visual identity more closely with the Hedy brand. Clara has been systematically refining the design through Figma, allowing for structured visual direction before implementation, and has been exploring new design systems and workflows to improve documentation and consistency.
                              </p>
                              <p>
                                Key themes across the sessions include a strong emphasis on simplifying the UI structure, especially by reducing nested containers and moving toward cleaner, more intuitive layouts such as a session-first homepage and a three-column layout for wider screens. The navigation is being restructured, with modal-based settings inspired by apps like Slack and Granola, aiming to improve user clarity and flow. Clara has also been rethinking the branding elements such as color palette, typography, and visual motifs. Notably, she is exploring a departure from the dominant salmon/orange theme in favor of more neutral tones, while retaining it for the logo. The font selection process is ongoing, with a preference emerging for modern, clean typefaces such as Inter or Instrument.
                              </p>
                              <p>
                                On the technical side, Julian has been aligning the development infrastructure to support the redesign, including merging the Windows version into the main branch and preparing the web version as the new baseline for UI implementation. He has advised Clara to create a new branch named "feature design updates V2" to avoid prior conflicts and ensure a fresh start aligned with the latest codebase changes.
                              </p>
                              <p>
                                Usability improvements discussed include simplifying the onboarding process by reducing the pre-login experience to a single splash screen, integrating chat-based prompts for context input during sessions, and exploring features such as session pinning and clearer indicators for active sessions. Clara has also proposed implementing a subtle sparkle animation for the Hedy logo, inspired by the Android version, which has been approved for rollout across platforms.
                              </p>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-col items-center gap-2">
                            <Button variant="ghost" className="gap-2">
                              <FileText className="h-4 w-4" />
                              Edit Notes
                            </Button>
                            <Button variant="ghost" className="gap-2">
                              <Share className="h-4 w-4" />
                              Share Detailed Notes
                            </Button>
                            <Button variant="ghost" className="gap-2">
                              <RefreshCw className="h-4 w-4" />
                              Re-generate Detailed Notes
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {activeSessionTab === 'bookmarks' && (
                        <div className="space-y-4">
                          {/* Bookmarks Dropdown */}
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
                          
                          {/* Bookmark Detail */}
                          {selectedSessionBookmark && (
                            <div className="rounded-xl border border-border bg-card p-5">
                              {/* Header */}
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
                              
                              {/* Main Idea */}
                              <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                                  <h4 className="text-sm font-medium">Main Idea</h4>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {selectedSessionBookmark.mainIdea}
                                </p>
                              </div>
                              
                              {/* Original Context */}
                              <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Quote className="h-4 w-4 text-muted-foreground" />
                                  <h4 className="text-sm font-medium">Original Context</h4>
                                </div>
                                <p className="text-sm text-muted-foreground italic leading-relaxed">
                                  {selectedSessionBookmark.originalContext}
                                </p>
                              </div>
                              
                              {/* Analysis */}
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
                          {/* Transcript Header */}
                          <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                            <div className="flex items-center gap-2 text-sm text-primary">
                              <Sparkles className="h-4 w-4" />
                              Viewing cleaned transcript
                            </div>
                            <button 
                              onClick={() => setViewOriginal(!viewOriginal)}
                              className="text-sm text-muted-foreground hover:text-foreground"
                            >
                              {viewOriginal ? 'View cleaned' : 'View original'}
                            </button>
                          </div>

                          {/* Transcript Content */}
                          <div className="relative rounded-xl border border-border bg-card p-5">
                            <div className="space-y-6 text-sm leading-relaxed text-foreground">
                              <div>
                                <p className="mb-2 font-semibold">Speaker 1:</p>
                                <p>This is our first experiment in legal discrimination. I can say, I won't rent to you because you're a lawyer. And if you are on the front lines of fixing the homeless housing problem in the city, here's a key to a loft that's half price. I don't care what you make; I care what you do. So that's the experiment behind this.</p>
                              </div>
                              <div>
                                <p>I'm Kevin Cavanaugh, and I own Gorilla Development, a development firm here in Portland, Oregon. We have a few projects here, infill projects, mostly small to medium scale. Half of them are adaptive reuse projects, and half of them are new construction. We've got 24 projects. A dozen of them are completed, and a dozen are on the boards or under construction.</p>
                              </div>
                              <div>
                                <p>I've been doing this for 20 years. I was trained as an architect, one of the 50% of architecture grads who isn't a licensed architect. I chose the development path. I don't want to call myself a real estate developer because they're like always the bad guy in the movies, but that's my profession.</p>
                              </div>
                              <div>
                                <p>Gorilla Development came out after the last recession. It's "guerrilla" like, you know, guerrilla warfare, like the...</p>
                              </div>
                            </div>

                            {/* Floating Actions */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-2">
                              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-smooth hover:bg-muted-foreground hover:text-muted">
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-smooth hover:bg-primary/90">
                                <Copy className="h-4 w-4" />
                              </button>
                              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-smooth hover:bg-primary/90">
                                <Download className="h-4 w-4" />
                              </button>
                              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-smooth hover:bg-primary/90">
                                <Sparkles className="h-4 w-4" />
                              </button>
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
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                  {/* Shared by indicator */}
                  {topic.sharedBy && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Users className="h-4 w-4" />
                      <span>Shared by {topic.sharedBy} • View only</span>
                    </div>
                  )}
                  
                  {/* Topic Insights Header */}
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
                  
                  {/* Intro Card */}
                  <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The topic of {topic.name} has not been directly addressed in any of the three sessions provided. Instead, all sessions focused on demonstrating workflows within an AI-assisted development environment, particularly the use of Plan Mode for feature planning in a personal website project.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Despite the stated topic, no academic content related to {topic.name.toLowerCase()}—such as its history, chemistry, cultivation, or cultural significance—was presented. The sessions served as technical walkthroughs of software tools and interface navigation, with repeated emphasis on highlight activation, keyboard shortcuts, and structured planning before coding.
                    </p>
                    <p className="text-xs text-muted-foreground text-right">
                      Last Generated: Dec 11, 2025 10:25 PM
                    </p>
                  </div>
                  
                  {/* Core Concepts */}
                  <div className="space-y-4">
                    <h3 className="font-semibold border-t border-border pt-6">Core Concepts</h3>
                    <div className="space-y-3">
                      {[
                        { text: "Plan Mode is a feature that analyzes a user's codebase and generates structured implementation plans before writing code.", detail: "Introduced in Session 3 on Oct 14, 2025, as part of an AI-assisted development workflow for building website features." },
                        { text: "Highlight activation is a UI function that marks key moments in a chat session for later reference.", detail: "Repeatedly demonstrated in Session 1 on Oct 29, 2025, to test reliability and reinforce usability." },
                        { text: "Command + N is a keyboard shortcut used to start a new chat in the AI interface.", detail: "Taught in Session 3 on Oct 14, 2025, as part of the standard entry point for initiating tasks." },
                        { text: "Shift + Tab toggles into Plan Mode, enabling high-level planning and research before code execution.", detail: "Demonstrated in Session 3 as a core step in the feature implementation workflow." },
                        { text: "The planning-first workflow emphasizes structuring tasks and analyzing existing code before making changes.", detail: "Stressed in Session 3 as a best practice to improve accuracy and reduce errors in development." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                          <div>
                            <p className="text-sm text-foreground">{item.text}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Key Takeaways */}
                  <div className="space-y-4">
                    <h3 className="font-semibold border-t border-border pt-6">Key Takeaways</h3>
                    <div className="space-y-3">
                      {[
                        { text: "Plan Mode is essential for analyzing existing code and generating reliable implementation strategies—this workflow will likely be emphasized in future applied tasks.", detail: null },
                        { text: "Repeated use of the highlight feature demonstrates its intended role in marking significant interactions for review.", detail: null },
                        { text: "Keyboard shortcuts like Command + N and Shift + Tab are foundational to efficient navigation and will likely be assessed in practical evaluations.", detail: "Instructor emphasized this in Session 3, indicating it may be test-relevant." },
                        { text: "Planning before coding helps prevent errors, ensures structural alignment, and supports better decision-making in development projects.", detail: "This rationale was implied through the demonstrated workflow in Session 3." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                          <div>
                            <p className="text-sm text-foreground">{item.text}</p>
                            {item.detail && <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Study Questions */}
                  <div className="space-y-4">
                    <h3 className="font-semibold border-t border-border pt-6">Study Questions</h3>
                    <div className="space-y-3">
                      {[
                        { q: "What is the purpose of entering Plan Mode before implementing a new feature?", a: "This probes understanding of pre-implementation analysis and structured planning." },
                        { q: "How does the highlight feature enhance user interaction with the AI interface?", a: "Asks students to connect UI design with user retention and review efficiency." },
                        { q: "Why might a developer choose to use Command + N followed by Shift + Tab instead of diving directly into coding?", a: "Encourages reflection on workflow discipline and tool mastery." },
                        { q: "What are the benefits of generating a high-level plan before modifying a codebase?", a: "Tests comprehension of risk mitigation and architectural foresight." },
                        { q: "What real-world development challenges does the Plan Mode workflow help mitigate?", a: "Also noted: efficiency, error reduction, structural alignment (2 more)" },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                          <div>
                            <p className="text-sm text-foreground font-medium">{item.q}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.a}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Connections & Context */}
                  <div className="space-y-4">
                    <h3 className="font-semibold border-t border-border pt-6">Connections & Context</h3>
                    <div className="space-y-3">
                      {[
                        { text: "The Plan Mode workflow mirrors software engineering best practices such as requirements analysis and architectural planning.", detail: "Connects to prior coursework on SDLC (Software Development Life Cycle), reinforcing academic foundations." },
                        { text: "Keyboard shortcut fluency reflects industry-standard IDE efficiency techniques.", detail: "Relates to lab exercises emphasizing tool fluency, similar to VS Code or JetBrains workflows." },
                        { text: "Highlight functionality parallels version control commenting or code annotation practices.", detail: "Real-world example: Git commit messages or PR reviews, where tracking decisions is critical." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                          <div>
                            <p className="text-sm text-foreground">{item.text}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Exam Preparation */}
                  <div className="space-y-4">
                    <h3 className="font-semibold border-t border-border pt-6">Exam Preparation</h3>
                    <div className="space-y-3">
                      {[
                        { priority: 'P1', text: "Practice navigating the AI interface using only keyboard shortcuts to build muscle memory.", detail: "Focus on Command + N and Shift + Tab sequences demonstrated on Oct 14, 2025." },
                        { priority: 'P1', text: "Review how Plan Mode analyzes code structures and generates implementation steps—be ready to describe the process in written responses.", detail: "This was central to the demo on Oct 14 and likely to appear on the exam." },
                        { priority: 'P2', text: "Memorize the sequence: Command + N → Shift + Tab → input feature request, as it may appear in procedural questions.", detail: "A core workflow pattern emphasized in Session 3." },
                        { priority: 'P2', text: "Be prepared to explain the advantages of planning over immediate coding in a short-answer format.", detail: "Expected due to repeated emphasis on structured workflows." },
                        { priority: 'P0', text: "Expect at least one question on feature planning workflows—this was emphasized as central to the course's applied objectives.", detail: "Mentioned on Oct 14, 2025; likely a high-weight exam item." },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={cn(
                                "text-xs px-1.5 py-0.5 rounded",
                                item.priority === 'P0' ? "bg-red-100 text-red-700" :
                                item.priority === 'P1' ? "bg-orange-100 text-orange-700" :
                                "bg-yellow-100 text-yellow-700"
                              )}>
                                {item.priority}
                              </span>
                            </div>
                            <p className="text-sm text-foreground">{item.text}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right: Chat Panel */}
              <ChatPanel />
            </div>
          )}
          
          {activeTopicTab === 'bookmarks' && (
            <div className="flex flex-1 overflow-hidden">
              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                  {/* Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold text-foreground">Bookmarks</h2>
                      <span className="text-sm text-muted-foreground">({topicBookmarks.length})</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">Sort By</span>
                      <span className="text-sm font-medium text-foreground">Recent</span>
                    </div>
                  </div>
                  
                  {/* Bookmarks List */}
                  <div className="flex gap-6">
                    <div className={cn(
                      'space-y-4',
                      selectedBookmark ? 'flex-1' : 'w-full'
                    )}>
                      {groupedTopicBookmarks.length > 0 ? (
                        groupedTopicBookmarks.map((group, index) => (
                          <BookmarkGroup
                            key={group.id}
                            title={group.title}
                            bookmarks={group.bookmarks}
                            selectedId={selectedBookmark?.id || null}
                            onSelectBookmark={setSelectedBookmark}
                            defaultExpanded={index === 0}
                          />
                        ))
                      ) : (
                        <div className="flex items-center justify-center h-40 text-muted-foreground">
                          <p>No bookmarks in this topic yet.</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Bookmark Detail Panel */}
                    {selectedBookmark && (
                      <div className="w-[400px] shrink-0 rounded-xl border border-border bg-card sticky top-6 max-h-[calc(100vh-200px)] flex flex-col overflow-hidden">
                        <BookmarkDetailPanel 
                          bookmark={selectedBookmark} 
                          onClose={() => setSelectedBookmark(null)}
                          showCloseButton
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right: Chat Panel */}
              <ChatPanel />
            </div>
          )}
          
          {activeTopicTab === 'appearance' && (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  {/* View-only warning */}
                  {topic.sharedBy && (
                    <div className="rounded-lg bg-amber-100 px-4 py-3 text-sm text-amber-800 flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      This topic is shared view-only. Ask the owner to make changes.
                    </div>
                  )}
                  
                  {/* Basic Information */}
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
                  
                  {/* Appearance */}
                  <div className="space-y-6">
                    <h3 className="font-semibold">Appearance</h3>
                    
                    {/* Wallpaper Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm">Wallpaper</Label>
                      <div className="flex flex-wrap gap-3">
                        {wallpaperPresets.map((preset) => (
                          <button
                            key={preset.id}
                            onClick={() => setSelectedWallpaper(preset.id)}
                            disabled={!!topic.sharedBy}
                            className={cn(
                              'relative h-16 w-16 rounded-xl overflow-hidden transition-all',
                              selectedWallpaper === preset.id && 'ring-2 ring-offset-2 ring-primary'
                            )}
                          >
                            {/* Base gradient */}
                            <div className={cn('absolute inset-0', preset.gradient)} />
                            {/* Blur overlay based on slider */}
                            <div 
                              className="absolute inset-0" 
                              style={{ backdropFilter: `blur(${blurAmount[0] / 25}px)` }}
                            />
                            {/* Light effects */}
                            <div 
                              className="absolute inset-0"
                              style={{
                                background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)'
                              }}
                            />
                            <div 
                              className="absolute inset-0"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 40%)'
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Blur Amount Slider */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Blur Amount</Label>
                        <span className="text-xs text-muted-foreground">{blurAmount[0]}%</span>
                      </div>
                      <div className="relative">
                        <div className="h-8 rounded-lg overflow-hidden">
                          <div className={cn(
                            'absolute inset-0',
                            wallpaperPresets.find(p => p.id === selectedWallpaper)?.gradient || 'bg-muted'
                          )} />
                          <div 
                            className="absolute inset-0" 
                            style={{ backdropFilter: `blur(${blurAmount[0] / 25}px)` }}
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={blurAmount[0]}
                          onChange={(e) => setBlurAmount([parseInt(e.target.value)])}
                          disabled={!!topic.sharedBy}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div 
                          className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-2 border-primary shadow-md pointer-events-none"
                          style={{ left: `calc(${blurAmount[0]}% - 10px)` }}
                        />
                      </div>
                    </div>
                    
                    {/* Overlay Opacity Slider */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Overlay Opacity</Label>
                        <span className="text-xs text-muted-foreground">{overlayOpacity[0]}%</span>
                      </div>
                      <div className="relative">
                        <div className="h-8 rounded-lg overflow-hidden">
                          <div className={cn(
                            'absolute inset-0',
                            wallpaperPresets.find(p => p.id === selectedWallpaper)?.gradient || 'bg-muted'
                          )} />
                          <div 
                            className="absolute inset-0 bg-white dark:bg-black" 
                            style={{ opacity: overlayOpacity[0] / 100 }}
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={overlayOpacity[0]}
                          onChange={(e) => setOverlayOpacity([parseInt(e.target.value)])}
                          disabled={!!topic.sharedBy}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div 
                          className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-2 border-primary shadow-md pointer-events-none"
                          style={{ left: `calc(${overlayOpacity[0]}% - 10px)` }}
                        />
                      </div>
                    </div>
                    
                    {/* Color Selection (accent color) */}
                    <div className="space-y-3">
                      <Label className="text-sm">Accent Color</Label>
                      <div className="flex flex-wrap gap-2">
                        {topicColors.map((color, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedColor(i)}
                            disabled={!!topic.sharedBy}
                            className={cn(
                              'h-8 w-8 rounded-full transition-all',
                              selectedColor === i && 'ring-2 ring-offset-2 ring-primary'
                            )}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Icon Selection */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Icon</Label>
                        <div className="flex rounded-lg border border-border overflow-hidden">
                          <button
                            onClick={() => setIconType('icons')}
                            className={cn(
                              'flex items-center gap-1.5 px-3 py-1.5 text-sm',
                              iconType === 'icons' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'
                            )}
                          >
                            {iconType === 'icons' && <Check className="h-3 w-3" />}
                            Icons
                          </button>
                          <button
                            onClick={() => setIconType('emoji')}
                            className={cn(
                              'flex items-center gap-1.5 px-3 py-1.5 text-sm',
                              iconType === 'emoji' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'
                            )}
                          >
                            😀 Emoji
                          </button>
                        </div>
                      </div>
                      
                      {iconType === 'icons' ? (
                        <div className="flex flex-wrap gap-2">
                          {topicIcons.map((item, i) => {
                            const Icon = item.icon;
                            return (
                              <button
                                key={i}
                                onClick={() => setSelectedIcon(i)}
                                disabled={!!topic.sharedBy}
                                className={cn(
                                  'flex h-10 w-10 items-center justify-center rounded-lg border transition-all',
                                  selectedIcon === i 
                                    ? 'border-primary bg-primary/10 text-primary' 
                                    : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                                )}
                              >
                                <Icon className="h-5 w-5" />
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {topicEmojis.map((emoji, i) => (
                            <button
                              key={i}
                              disabled={!!topic.sharedBy}
                              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-xl hover:border-primary/50"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* AI Context */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      <h3 className="font-semibold">AI context & instructions</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Provide context to help Hedy understand this topic.
                    </p>
                    <div className="relative">
                      <Textarea
                        value={aiContext}
                        onChange={(e) => setAiContext(e.target.value)}
                        placeholder="Add context for AI..."
                        className="min-h-[120px]"
                        disabled={!!topic.sharedBy}
                        maxLength={20000}
                      />
                      <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                        {aiContext.length}/20000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      
      <MobileBottomNav />
    </div>
  );
};

export default TopicDetail;
