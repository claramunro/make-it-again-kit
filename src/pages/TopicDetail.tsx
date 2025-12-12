import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Copy, RefreshCw, ChevronRight, Info, Send, Sparkles, Lock, Lightbulb, FolderOpen, FolderPlus, Umbrella, UsersRound, Calendar, MessageCircle, Monitor, UserRound, LayoutGrid, Landmark, Wrench, Utensils, Search, MusicIcon, Heart, Star, Settings, Camera, Smartphone, Check, FileText, Share, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { topics } from '@/data/topics';
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

const TopicDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTopicTab, setActiveTopicTab] = useState<TopicTab>('sessions');
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
  
  const topic = topics.find(t => t.id === id);
  const selectedSession = mockSessions.find(s => s.id === selectedSessionId);
  
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

  return (
    <div className="flex min-h-screen bg-card">
      {!isMobile && <Sidebar />}
      
      <div className="flex flex-1 flex-col">
        <Header />
        
        <main className="flex-1 rounded-tl-2xl bg-background pb-24 md:pb-0">
          {/* Topic Header */}
          <div className="sticky top-14 z-10 border-b border-border bg-card px-4 py-4 md:px-6">
            <div className="mx-auto max-w-6xl">
              {/* Top row: Back, Title, Shared badge */}
              <div className="mb-3 flex items-start gap-4">
                {/* Back Button */}
                <button 
                  onClick={() => navigate('/topics')}
                  className="mt-1 rounded-lg p-1 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                
                {/* Topic Icon & Title with meta below */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <h1 className="text-xl font-semibold">{topic.name}</h1>
                    {topic.sharedBy && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
                        <Users className="h-3 w-3" />
                        Shared by {topic.sharedBy}
                      </span>
                    )}
                  </div>
                  
                  {/* Session Count & Last Updated as line items */}
                  <div className="mt-2 hidden md:flex items-center gap-4 text-sm text-muted-foreground border border-border rounded-lg px-3 py-2 w-fit">
                    <span className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      Total Sessions: {mockSessions.length}
                    </span>
                    <span>•</span>
                    <span>Last Updated: Oct 17, 2025 10:33 AM</span>
                  </div>
                </div>
              </div>

              {/* Topic Tabs - matching SessionDetail style */}
              <div className="mt-4 flex justify-center">
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
            </div>
          </div>
          
          {/* Content Area */}
          {activeTopicTab === 'sessions' && (
            <div className="flex h-[calc(100vh-130px)]">
              {/* Left: Sessions Sidebar */}
              <div className="w-80 shrink-0 border-r border-border overflow-y-auto bg-background">
                <div className="p-3 space-y-1">
                  {mockSessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => setSelectedSessionId(session.id)}
                      className={cn(
                        'w-full flex items-start gap-3 rounded-lg px-3 py-3 text-left transition-smooth',
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
                          {sessionFavorites[session.id] && (
                            <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {session.date} • {session.time} • {session.duration}
                        </p>
                        {session.bookmarks > 0 && (
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <Bookmark className="h-3 w-3" />
                            {session.bookmarks} bookmarks
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Center: Session Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
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
                        <div className="flex items-center justify-center h-40 text-muted-foreground">
                          <p>No bookmarks in this session yet.</p>
                        </div>
                      )}
                      
                      {activeSessionTab === 'transcript' && (
                        <div className="flex items-center justify-center h-40 text-muted-foreground">
                          <p>Transcript content will appear here.</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              
              {/* Right: Chat Panel */}
              <div className="w-80 shrink-0 border-l border-border bg-card flex flex-col">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-primary">Chat in Session</h3>
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
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border" />
                    <div>
                      <p className="text-foreground">Visit the Endurance website or call the provided number for a quote</p>
                      <p className="text-xs text-muted-foreground">Due: Today</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border" />
                    <div>
                      <p className="text-foreground">Evaluate the Endurance warranty plan for potential enrollment</p>
                    </div>
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
              </div>
            </div>
          )}
          
          {activeTopicTab === 'overview' && (
            <div className="p-6 max-w-4xl mx-auto">
              <div className="space-y-6">
                {/* Shared by indicator */}
                {topic.sharedBy && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Users className="h-4 w-4" />
                    <span>Shared by {topic.sharedBy} • View only</span>
                  </div>
                )}
                
                {/* Topic Insights */}
                <div>
                  <div className="flex items-center justify-between mb-4">
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
                  
                  <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                    <p className="text-sm text-foreground leading-relaxed">
                      The Hedy Redesign initiative is advancing through its final visual stabilization phase, with the team focused on refining UI components in Figma and preparing for a critical merge of the main branch into the 'feature design updates V2' branch.
                    </p>
                    <p className="text-xs text-muted-foreground text-right">
                      Last Generated: Dec 1, 2025 4:05 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTopicTab === 'bookmarks' && (
            <div className="p-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                <p>Topic bookmarks will appear here.</p>
              </div>
            </div>
          )}
          
          {activeTopicTab === 'appearance' && (
            <div className="p-6 max-w-4xl mx-auto">
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
                <div className="space-y-4">
                  <h3 className="font-semibold">Appearance</h3>
                  
                  <div className="space-y-3">
                    <Label className="text-sm">Color</Label>
                    <div className="flex flex-wrap gap-2">
                      {topicColors.map((color, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(i)}
                          disabled={!!topic.sharedBy}
                          className={cn(
                            'h-10 w-10 rounded-full transition-all',
                            selectedColor === i && 'ring-2 ring-offset-2 ring-primary'
                          )}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
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
          )}
        </main>
      </div>
      
      <MobileBottomNav />
    </div>
  );
};

export default TopicDetail;
