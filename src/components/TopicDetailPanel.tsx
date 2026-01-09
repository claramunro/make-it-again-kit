import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Copy, RefreshCw, ChevronRight, ChevronDown, Send, Sparkles,
  Lightbulb, FileText, Share, Bookmark, Clock, Trash2, 
  Quote, BarChart3, Pencil, Download, Star, X, Upload, MessageSquare,
  FolderOpen, FolderPlus, Umbrella, UsersRound, Calendar, MessageCircle,
  Monitor, UserRound, LayoutGrid, Landmark, Wrench, Utensils, Search,
  MusicIcon, Heart, Settings, Camera, Smartphone, Check, Lock
} from 'lucide-react';
import { useIsLargeScreen } from '@/hooks/use-large-screen';
import { useIsXlScreen } from '@/hooks/use-xl-screen';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { topics, Topic } from '@/data/topics';
import { highlights, Highlight } from '@/data/highlights';
import { useTopics } from '@/contexts/TopicContext';
import { cn } from '@/lib/utils';

type TopicTab = 'overview' | 'sessions' | 'highlights' | 'settings';
type SessionTab = 'details' | 'highlights' | 'transcript' | 'chat';

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
  { icon: Star, name: 'star-icon' },
  { icon: Settings, name: 'settings' },
  { icon: Camera, name: 'camera' },
  { icon: Smartphone, name: 'phone' },
];

const topicEmojis = ['🎨', '📦', '🏋️', '☕', '🐶', '📅', '💡', '🎯', '🚀', '✨', '🎵', '❤️', '⭐', '🔧', '📱', '💻'];

const wallpaperPresets = [
  { id: 'mint', bannerColor: '#A8E6CF' },
  { id: 'peach', bannerColor: '#FFCBA4' },
  { id: 'coral', bannerColor: '#FF8A80' },
  { id: 'lavender', bannerColor: '#E1BEE7' },
  { id: 'yellow', bannerColor: '#FFF59D' },
  { id: 'teal', bannerColor: '#80CBC4' },
  { id: 'rose', bannerColor: '#F8BBD9' },
  { id: 'blue', bannerColor: '#90CAF9' },
  { id: 'sage', bannerColor: '#C5E1A5' },
  { id: 'mauve', bannerColor: '#D1A3D1' },
];

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
];

const mockSessionBookmarks = [
  {
    id: '1',
    title: 'Uncertainty and Initiative in Action',
    date: 'Oct 21, 2025',
    time: '7:22 PM',
    duration: '01:14',
    mainIdea: 'When faced with uncertainty, taking a small, concrete action can precede clarity.',
    originalContext: "Bye bye. I'm going to the desk. I wasn't sure what to do.",
    analysis: 'This reflects the principle of "action preceding insight."',
  },
  {
    id: '2',
    title: 'The Importance of Sequence in Process',
    date: 'Oct 21, 2025',
    time: '7:25 PM',
    duration: '00:45',
    mainIdea: 'The order of operations matters significantly in any process.',
    originalContext: "We need to establish the baseline before we can measure improvement.",
    analysis: 'This highlights the importance of methodical approach.',
  },
];

interface TopicDetailPanelProps {
  topicId: string;
}

export function TopicDetailPanel({ topicId }: TopicDetailPanelProps) {
  const navigate = useNavigate();
  const isLargeScreen = useIsLargeScreen();
  const isXlScreen = useIsXlScreen();
  const { updateTopic, updateTopicWallpaper } = useTopics();
  const [activeTopicTab, setActiveTopicTab] = useState<TopicTab>('overview');
  const [activeSessionTab, setActiveSessionTab] = useState<SessionTab>('details');
  
  const topic = topics.find(t => t.id === topicId);
  const topicSessions = topic?.sessions || [];
  
  const [selectedSessionId, setSelectedSessionId] = useState(topicSessions[0]?.id || '');
  const [sessionFavorites, setSessionFavorites] = useState<Record<string, boolean>>(
    topicSessions.reduce((acc, s) => ({ ...acc, [s.id]: s.isFavorite || false }), {})
  );
  const [selectedBookmarkId, setSelectedBookmarkId] = useState(mockSessionBookmarks[0].id);
  const [selectedHighlightId, setSelectedHighlightId] = useState<string | null>(null);
  
  // Settings tab state
  const [topicName, setTopicName] = useState(topic?.name || '');
  const [topicDescription, setTopicDescription] = useState(topic?.description || '');
  const [selectedWallpaper, setSelectedWallpaper] = useState<Topic['wallpaper']>(topic?.wallpaper || 'mint');
  const [iconType, setIconType] = useState<'icons' | 'emoji'>('emoji');
  const [selectedEmoji, setSelectedEmoji] = useState(topic?.icon || '🎨');
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);
  const [aiContext, setAiContext] = useState('');
  
  // Sync settings state when topic changes
  useEffect(() => {
    if (topic) {
      setTopicName(topic.name);
      setTopicDescription(topic.description || '');
      setSelectedWallpaper(topic.wallpaper || 'mint');
      setSelectedEmoji(topic.icon || '🎨');
      setIconType(topicEmojis.includes(topic.icon || '') ? 'emoji' : 'icons');
    }
  }, [topic?.id]);
  
  const selectedSession = topicSessions.find(s => s.id === selectedSessionId);
  const selectedSessionBookmark = mockSessionBookmarks.find(b => b.id === selectedBookmarkId);
  
  const topicHighlights = useMemo(() => {
    return highlights.filter(h => h.topicId === topicId || h.topicName === topic?.name);
  }, [topicId, topic?.name]);

  // Set first highlight as selected when highlights load
  const selectedHighlight = useMemo(() => {
    if (selectedHighlightId) {
      return topicHighlights.find(h => h.id === selectedHighlightId) || topicHighlights[0];
    }
    return topicHighlights[0] || null;
  }, [selectedHighlightId, topicHighlights]);
  
  const toggleSessionFavorite = (sessionId: string) => {
    setSessionFavorites(prev => ({ ...prev, [sessionId]: !prev[sessionId] }));
  };
  
  const handleNameBlur = () => {
    if (topicId && topicName && topicName !== topic?.name) {
      updateTopic(topicId, { name: topicName });
    }
  };
  
  const handleDescriptionBlur = () => {
    if (topicId && topicDescription !== topic?.description) {
      updateTopic(topicId, { description: topicDescription });
    }
  };
  
  const handleWallpaperChange = (wallpaper: Topic['wallpaper']) => {
    setSelectedWallpaper(wallpaper);
    if (topicId && wallpaper) {
      updateTopicWallpaper(topicId, wallpaper);
    }
  };
  
  const handleIconSelect = (iconName: string) => {
    if (topicId && !topic?.sharedBy) {
      updateTopic(topicId, { icon: iconName });
    }
  };
  
  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    if (topicId && !topic?.sharedBy) {
      updateTopic(topicId, { icon: emoji });
    }
  };
  
  if (!topic) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Topic not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Left side - Tabs and Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Topic Header with Tabs */}
        <div className="shrink-0 border-b border-border bg-background px-4 py-2 flex justify-start">
          {/* Tabs */}
          <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
            {(['overview', 'sessions', 'highlights', 'settings'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTopicTab(tab)}
                className={cn(
                  'rounded-md px-4 py-1.5 text-sm font-medium transition-smooth',
                  activeTopicTab === tab
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sessions Sidebar (only in sessions tab on XL screens) */}
          {activeTopicTab === 'sessions' && isXlScreen && (
            <div className="w-72 shrink-0 overflow-auto border-r border-border bg-card p-4">
              <div className="space-y-2">
                {topicSessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSessionId(session.id)}
                    className={cn(
                      "w-full rounded-lg p-3 text-left transition-smooth",
                      selectedSessionId === session.id
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-foreground line-clamp-2">
                          {session.title}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {session.date} • {session.duration}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSessionFavorite(session.id);
                        }}
                        className="p-1 rounded hover:bg-muted"
                      >
                        <Star className={cn(
                          'h-4 w-4',
                          sessionFavorites[session.id]
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        )} />
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Center Column - Content based on tab */}
          <div className="min-w-0 flex-1 overflow-auto p-6">
          {/* Overview Tab */}
          {activeTopicTab === 'overview' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Topic Overview</h2>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm"><Copy className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm"><RefreshCw className="h-4 w-4" /></Button>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-foreground">
                  This topic contains {topic.sessionCount} sessions covering various discussions and meetings 
                  related to {topic.name}. The sessions include brainstorming, planning, and review meetings.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Recent Sessions</h2>
                <div className="space-y-3">
                  {(topic.sessions || []).slice(0, 3).map((session) => (
                    <button 
                      key={session.id}
                      onClick={() => {
                        setSelectedSessionId(session.id);
                        setActiveTopicTab('sessions');
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth text-left"
                    >
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{session.title}</p>
                        <p className="text-xs text-muted-foreground">{session.date}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTopicTab === 'sessions' && (
            <div className="space-y-6">
              {/* Session Dropdown + Sub-tabs Row */}
              <div className="flex items-center gap-4">
                {/* Session Dropdown Selector (only on non-XL screens) */}
                {!isXlScreen && (
                  <Select
                    value={selectedSessionId}
                    onValueChange={(value) => setSelectedSessionId(value)}
                  >
                    <SelectTrigger className="w-[280px] bg-card">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <SelectValue placeholder="Select a session" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-card">
                      {topicSessions.map((session) => (
                        <SelectItem key={session.id} value={session.id}>
                          <div className="flex items-center gap-2">
                            <span className="line-clamp-1">{session.title}</span>
                            <span className="text-xs text-muted-foreground">• {session.date}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {/* Session Sub-tabs */}
                {selectedSession && (
                  <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
                    {(['details', 'highlights', 'transcript'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveSessionTab(tab)}
                        className={cn(
                          'rounded-md px-4 py-1.5 text-sm font-medium transition-smooth',
                          activeSessionTab === tab
                            ? 'bg-card text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {activeSessionTab === 'details' && selectedSession && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-2">{selectedSession.title}</h2>
                  <p className="text-xs text-muted-foreground mb-4">
                    {selectedSession.date} • {selectedSession.time} • {selectedSession.duration}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    Session details and notes from this discussion.
                  </p>
                </div>
              )}

              {activeSessionTab === 'highlights' && (
                <div className="space-y-4">
                  {/* Highlight Selector Dropdown */}
                  <Select
                    value={selectedBookmarkId}
                    onValueChange={(value) => setSelectedBookmarkId(value)}
                  >
                    <SelectTrigger className="w-full bg-card">
                      <div className="flex items-center gap-2">
                        <Bookmark className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
                        <SelectValue placeholder="Select a highlight" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-card">
                      {mockSessionBookmarks.map((bookmark) => (
                        <SelectItem key={bookmark.id} value={bookmark.id}>
                          <span className="line-clamp-1">{bookmark.title}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Highlight Detail Card */}
                  {selectedSessionBookmark && (
                    <div className="rounded-xl border border-border bg-card p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">{selectedSessionBookmark.date}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{selectedSessionBookmark.time}</span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {selectedSessionBookmark.duration}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Share className="h-4 w-4" />
                            Share
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-muted-foreground" />
                          <h3 className="text-sm font-semibold text-foreground">Main Idea</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-foreground">
                          {selectedSessionBookmark.mainIdea}
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Quote className="h-4 w-4 text-muted-foreground" />
                          <h3 className="text-sm font-semibold text-foreground">Original Context</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground italic">
                          {selectedSessionBookmark.originalContext}
                        </p>
                      </div>
                      
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          <h3 className="text-sm font-semibold text-foreground">Analysis</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-foreground">
                          {selectedSessionBookmark.analysis}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeSessionTab === 'transcript' && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2 text-sm text-primary mb-4">
                    <Sparkles className="h-4 w-4" />
                    Viewing cleaned transcript
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-semibold mb-1">Speaker 1:</p>
                      <p className="text-muted-foreground">This is example transcript content for the session.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Highlights Tab - Two Column Layout */}
          {activeTopicTab === 'highlights' && (
            <div className="flex flex-1 overflow-hidden">
              {/* Left: Highlights List */}
              <div className="w-72 shrink-0 overflow-auto border-r border-border p-4">
                <div className="space-y-2">
                  {topicHighlights.length > 0 ? (
                    topicHighlights.map((highlight) => (
                      <button
                        key={highlight.id}
                        onClick={() => setSelectedHighlightId(highlight.id)}
                        className={cn(
                          "w-full rounded-lg p-3 text-left transition-smooth",
                          selectedHighlight?.id === highlight.id
                            ? "bg-primary/10 border border-primary/30"
                            : "bg-muted hover:bg-muted/80"
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-foreground line-clamp-2">
                              {highlight.title}
                            </span>
                            <p className="text-xs text-muted-foreground mt-1 truncate">
                              {highlight.sessionTitle}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No highlights in this topic yet
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Highlight Details */}
              <div className="flex-1 overflow-auto p-6">
                {selectedHighlight ? (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="mb-6 flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-foreground mb-1">{selectedHighlight.title}</h2>
                        <p className="text-sm text-muted-foreground">{selectedHighlight.sessionTitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Share className="h-4 w-4" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-foreground">Main Idea</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground">
                        {selectedHighlight.description || 'No main idea available.'}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <div className="mb-2 flex items-center gap-2">
                        <Quote className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-foreground">Original Context</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground italic">
                        {selectedHighlight.originalContext || 'No original context available.'}
                      </p>
                    </div>
                    
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-foreground">Analysis</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground">
                        {selectedHighlight.analysis || 'No analysis available.'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Select a highlight to view details
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTopicTab === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* View-only warning */}
              {topic.sharedBy && (
                <div className="rounded-lg bg-amber-100 px-4 py-3 text-sm text-amber-800 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  This topic is shared view-only. Ask the owner to make changes.
                </div>
              )}
              
              {/* Basic Information */}
              <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Basic information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="topicName" className="text-xs text-muted-foreground">Topic Name</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <FolderOpen className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="topicName"
                      value={topicName}
                      onChange={(e) => setTopicName(e.target.value)}
                      onBlur={handleNameBlur}
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
                    onBlur={handleDescriptionBlur}
                    className="min-h-[80px]"
                    disabled={!!topic.sharedBy}
                  />
                </div>
              </div>
              
              {/* Appearance */}
              <div className="rounded-xl border border-border bg-card p-6 space-y-6">
                <h3 className="font-semibold">Appearance</h3>
                
                {/* Color Selection */}
                <div className="space-y-3">
                  <Label className="text-sm">Color</Label>
                  <div className="flex flex-wrap gap-3">
                    {wallpaperPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleWallpaperChange(preset.id as Topic['wallpaper'])}
                        disabled={!!topic.sharedBy}
                        className={cn(
                          'relative h-16 w-16 rounded-xl overflow-hidden transition-all',
                          selectedWallpaper === preset.id && 'ring-2 ring-offset-2 ring-primary'
                        )}
                      >
                        <div 
                          className="absolute inset-0" 
                          style={{ backgroundColor: preset.bannerColor }}
                        />
                      </button>
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
                        const isSelected = topic?.icon === item.name || (!topicEmojis.includes(topic?.icon || '') && selectedIconIndex === i);
                        return (
                          <button
                            key={i}
                            onClick={() => {
                              setSelectedIconIndex(i);
                              handleIconSelect(item.name);
                            }}
                            disabled={!!topic.sharedBy}
                            className={cn(
                              'flex h-10 w-10 items-center justify-center rounded-lg border transition-all',
                              isSelected 
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
                          onClick={() => handleEmojiSelect(emoji)}
                          disabled={!!topic.sharedBy}
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-lg border transition-all text-xl',
                            selectedEmoji === emoji 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border bg-background hover:border-primary/50'
                          )}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* AI Context */}
              <div className="rounded-xl border border-border bg-card p-6 space-y-4">
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

              {/* Danger Zone - Only show if user is owner */}
              {!topic.sharedBy && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 space-y-3">
                  <h3 className="font-semibold text-destructive">Danger zone</h3>
                  <p className="text-sm text-destructive/80">
                    Delete this topic and remove it from all sessions.
                  </p>
                  <Button
                    variant="outline"
                    className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => console.log('Delete topic:', topic.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Topic
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

          {/* Right Column - Session Chat (when in Sessions tab) */}
          {activeTopicTab === 'sessions' && (
            <div className="w-72 xl:w-80 shrink-0 flex flex-col border-l border-border bg-muted/30">
              <div className="flex items-center justify-between border-b border-border p-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-semibold text-foreground">Session Chat</h2>
                  <div className="flex items-center gap-2">
                    <Switch className="scale-75" />
                    <span className="text-xs text-muted-foreground">Topic context</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                  <Upload className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                </div>
              </div>
              <div className="flex-1 overflow-auto p-3 space-y-3">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="rounded-2xl bg-primary px-3 py-2 text-sm text-primary-foreground max-w-[85%]">
                    Can you summarize the key points from this session?
                  </div>
                </div>
                {/* AI response */}
                <div className="rounded-2xl bg-muted px-3 py-2 text-sm text-foreground">
                  <p className="mb-2">Here are the key points from this session:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Urban development approaches discussed</li>
                    <li>Long-term holds vs quick flips analyzed</li>
                    <li>Creative financing options explored</li>
                    <li>Community-focused development highlighted</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-border p-3">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-2">
                  <input
                    type="text"
                    placeholder="How can I help?"
                    className="flex-1 bg-transparent px-2 text-sm placeholder:text-muted-foreground focus:outline-none"
                  />
                  <Button variant="action" size="icon" className="h-8 w-8 rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <button className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth">
                    Summarize key points
                    <Sparkles className="h-3 w-3" />
                  </button>
                  <button className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth">
                    What are the action items?
                    <Sparkles className="h-3 w-3" />
                  </button>
                  <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-smooth">
                    More
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Topic Chat (extends full height alongside tabs) */}
      {activeTopicTab !== 'settings' && activeTopicTab !== 'sessions' && (
        <div className="w-80 xl:w-96 shrink-0 flex flex-col border-l border-border bg-muted/30">
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="text-sm font-semibold text-foreground">Topic Chat</h2>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
              <Upload className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {/* User message */}
            <div className="flex justify-end">
              <div className="rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground max-w-[85%]">
                Can you summarize the key points from this topic?
              </div>
            </div>
            {/* AI response */}
            <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-foreground">
              <p className="mb-2">Here are the key points from this topic:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>UI refinements are nearing completion</li>
                <li>The main branch merge is ready</li>
                <li>Mobile responsiveness improvements discussed</li>
                <li>New font selection in progress</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border p-4 space-y-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-2">
              <input
                type="text"
                placeholder="How can I help?"
                className="flex-1 bg-transparent px-2 text-sm placeholder:text-muted-foreground focus:outline-none"
              />
              <Button variant="action" size="icon" className="h-9 w-9 rounded-full">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth">
                Summarize key points
                <Sparkles className="h-3 w-3" />
              </button>
              <button className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth">
                What are the action items?
                <Sparkles className="h-3 w-3" />
              </button>
              <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-smooth">
                More
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
