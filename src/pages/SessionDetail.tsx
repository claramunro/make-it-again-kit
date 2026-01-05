import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, ChevronDown, ChevronRight, MoreVertical, Play, Pause, Sparkles, 
  Send, Wand2, Pencil, Copy, Download, Link2, UserPlus, Mail, 
  Calendar, Trash2, Share, Folder, FolderOpen, FileText, Video, Bookmark, ALargeSmall,
  Lightbulb, Quote, BarChart3, Clock, Upload, CloudUpload, Star, AudioLines, RefreshCw, FileCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SidebarV2, useSidebarCollapsed } from '@/components/SidebarV2';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { topics } from '@/data/topics';
import { SessionBadge } from '@/components/SessionBadge';
import { TopicBadgeInfo } from '@/types/session';

type SessionTab = 'details' | 'highlights' | 'transcript';
type MobileSessionTab = 'details' | 'highlights' | 'chat' | 'transcript';

const sessionTypes = [
  { id: 'business', label: 'Business Meetings', icon: '📁' },
  { id: 'brainstorm', label: 'Solo Brainstorm', icon: '💡' },
  { id: 'journalism', label: 'Journalism', icon: '📝' },
  { id: 'recruitment', label: 'Recruitment', icon: '👥' },
  { id: 'lectures', label: 'Lectures or Classes', icon: '📖' },
  { id: 'medical', label: 'Medical Consultation', icon: '🏥' },
  { id: 'personal', label: 'Personal Conversation', icon: '❤️' },
  { id: 'coaching', label: 'Coaching and Mentoring', icon: '🎯' },
  { id: 'interview', label: 'Job Interview (Candidate)', icon: '⭐' },
];

// Mock bookmarks for this session
const mockBookmarks = [
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

// Import session data to check type
import { sessionGroups } from '@/data/sessions';

const SessionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isMobile = useIsMobile();
  const { collapsed } = useSidebarCollapsed();
  const [activeTab, setActiveTab] = useState<SessionTab>('details');
  const [mobileActiveTab, setMobileActiveTab] = useState<MobileSessionTab>('details');
  const [isPlaying, setIsPlaying] = useState(false);
  const [topicDropdownOpen, setTopicDropdownOpen] = useState(false);
  const [sessionTypeDropdownOpen, setSessionTypeDropdownOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('new');
  const [selectedSessionType, setSelectedSessionType] = useState('coaching');
  const [viewOriginal, setViewOriginal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [selectedBookmark, setSelectedBookmark] = useState(mockBookmarks[0]);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [topicContextEnabled, setTopicContextEnabled] = useState(true);
  const [summaryMenuOpen, setSummaryMenuOpen] = useState(false);
  const [todoTextCopied, setTodoTextCopied] = useState(false);
  const [todoMarkdownCopied, setTodoMarkdownCopied] = useState(false);

  const handleTodoTextCopy = useCallback(() => {
    setTodoTextCopied(true);
    setTimeout(() => setTodoTextCopied(false), 2000);
  }, []);

  const handleTodoMarkdownCopy = useCallback(() => {
    setTodoMarkdownCopied(true);
    setTimeout(() => setTodoMarkdownCopied(false), 2000);
  }, []);

  // Find the current session to check if it has audio
  const currentSession = sessionGroups.flatMap(g => g.sessions).find(s => s.id === id);
  const hasAudio = currentSession?.type === 'audio';
  
  const [isFavorite, setIsFavorite] = useState(currentSession?.isFavorite || false);

  const selectedTopicData = currentSession?.topicId ? topics.find(t => t.id === currentSession.topicId) : null;
  const selectedSessionTypeData = sessionTypes.find(t => t.id === selectedSessionType);

  // Mobile/Tablet Layout
  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        {/* Mobile Header - Title Row */}
        <header className="sticky top-0 z-10 border-b border-border bg-card">
          {/* Title Row */}
          <div className="flex items-center gap-3 px-4 py-3">
            <button 
              onClick={() => navigate('/')}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-smooth hover:bg-primary/90"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <h1 className="truncate text-sm font-medium leading-snug text-foreground">
                Session Title
              </h1>
              <p className="text-xs text-muted-foreground">
                Oct 18, 2025 9:16 AM • 2 minutes
              </p>
            </div>
          </div>

          {/* Tab Bar - Full Width */}
          <div className="flex border-t border-border">
            {(['details', 'highlights', 'chat', 'transcript'] as MobileSessionTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setMobileActiveTab(tab)}
                className={cn(
                  'flex-1 py-3 text-sm font-medium transition-smooth border-b-2',
                  mobileActiveTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </header>

        {/* Content - Single Column */}
        <main className="flex-1 overflow-auto p-4">
          {/* Details Tab */}
          {mobileActiveTab === 'details' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <h2 className="mb-3 text-base font-semibold text-foreground">Summary</h2>
                <p className="text-sm leading-relaxed text-foreground">
                  The session explored Kevin Cavanaugh's unique approach to urban development, focusing on long-term holds, creative financing, and legal discrimination by profession.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <h2 className="mb-3 text-base font-semibold text-foreground">Your To-Dos</h2>
                <div className="space-y-2">
                  {[
                    "Review Gorilla Development's website",
                    'Research legal implications',
                    'Draft case study outline',
                  ].map((todo, i) => (
                    <div key={i} className="group flex items-start gap-3 rounded-lg border border-border bg-background p-3">
                      <Checkbox className="mt-0.5" />
                      <span className="flex-1 text-sm text-foreground">{todo}</span>
                      {/* Hover actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); }}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-smooth"
                        >
                          <CloudUpload className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); }}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-smooth"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); }}
                          className="p-1.5 text-muted-foreground hover:text-destructive transition-smooth"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <h2 className="mb-3 text-base font-semibold text-foreground">Detailed Notes</h2>
                <div className="space-y-3 text-sm leading-relaxed text-foreground">
                  <p>
                    Kevin Cavanaugh, founder of Guerrilla Development, shared his unconventional philosophy on urban development. Unlike traditional developers who focus on quick flips and maximum profit margins, Cavanaugh emphasized the value of long-term property holds and building genuine community relationships.
                  </p>
                  <p>
                    A key insight from the discussion was his approach to "legal discrimination by profession" – strategically selecting tenants based on their profession to create a curated community atmosphere. This includes prioritizing artists, small business owners, and creative professionals who contribute to neighborhood character.
                  </p>
                  <p>
                    The creative financing strategies discussed included seller financing arrangements, community investment models, and patience-based approaches that prioritize sustainable growth over rapid returns. These methods allow for more flexibility and better alignment with community needs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Highlights Tab */}
          {mobileActiveTab === 'highlights' && (
            <div className="space-y-3">
              {mockBookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className={cn(
                    "rounded-xl border border-border bg-card p-4 transition-smooth",
                    selectedBookmark.id === bookmark.id && "border-primary"
                  )}
                  onClick={() => setSelectedBookmark(bookmark)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Bookmark className="mt-0.5 h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-foreground">{bookmark.title}</span>
                  </div>
                  {selectedBookmark.id === bookmark.id && (
                    <div className="space-y-3 pt-2 border-t border-border">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <Lightbulb className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs font-semibold text-foreground">Main Idea</span>
                        </div>
                        <p className="text-xs leading-relaxed text-foreground">{bookmark.mainIdea}</p>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <Quote className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs font-semibold text-foreground">Original Context</span>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground italic">{bookmark.originalContext}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Chat Tab */}
          {mobileActiveTab === 'chat' && (
            <div className="flex flex-col h-[calc(100vh-220px)]">
              <div className="flex-1 overflow-auto space-y-4 mb-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary px-4 py-3">
                    <p className="text-sm text-primary-foreground">How engaged are they in this opportunity?</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="rounded-2xl rounded-tl-md bg-muted px-4 py-3">
                  <p className="mb-3 text-sm leading-relaxed text-foreground">
                    The discussion centered on Kevin Cavanaugh's innovative development model and his deep engagement with socially driven real estate projects in Portland.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• He actively pursues projects that combine affordability with profitability.</li>
                    <li>• His willingness to cap investor returns shows prioritization of mission over yield.</li>
                  </ul>
                </div>
              </div>

              {/* Chat Input */}
              <div className="shrink-0">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-2">
                  <Sparkles className="ml-2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
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

          {/* Transcript Tab */}
          {mobileActiveTab === 'transcript' && (
            <div>
              <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Sparkles className="h-4 w-4" />
                  Viewing cleaned transcript
                </div>
                <button 
                  onClick={() => setViewOriginal(!viewOriginal)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  {viewOriginal ? 'View cleaned' : 'View original'}
                </button>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <div className="space-y-4 text-sm leading-relaxed text-foreground">
                  <div>
                    <p className="mb-1 font-semibold">Speaker 1:</p>
                    <p>This is our first experiment in legal discrimination. I can say, I won't rent to you because you're a lawyer.</p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold">Speaker 2:</p>
                    <p>I'm Kevin Cavanaugh, and I own Gorilla Development, a development firm here in Portland, Oregon.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Audio Player */}
        <div className="fixed bottom-20 left-0 right-0 z-20 border-t border-border bg-card px-4 py-3">
          <div className="flex items-center gap-3 ml-20">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
            <div className="flex-1 h-1 rounded-full bg-muted">
              <div className="h-1 w-1/6 rounded-full bg-primary" />
            </div>
            <span className="text-xs text-muted-foreground">22:28</span>
          </div>
        </div>

        <MobileBottomNav />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="flex min-h-screen bg-card">
      <SidebarV2 />
      
      <div className="flex flex-1 flex-col">
        
        <main className="flex-1 overflow-hidden bg-background">
          {/* Session Header */}
          <div className="sticky top-0 z-10 border-b border-border bg-background px-4 py-3 md:px-6">
            {/* Top Row: Back + Title + Meta | Topic + Star */}
            <div className="flex items-start justify-between gap-4 mb-3">
              {/* Left: Back button + Icon + Title + Meta */}
              <div className="flex items-start gap-3 min-w-0">
                <button 
                  onClick={() => navigate('/')}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-smooth hover:bg-primary/90 mt-0.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="min-w-0 flex-1">
                  <h1 className="line-clamp-2 text-base font-medium leading-snug text-foreground mb-1">
                    {currentSession?.title ? (currentSession.title.length > 85 ? currentSession.title.slice(0, 85).trim() : currentSession.title) : 'Untitled Session'}
                  </h1>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      {currentSession?.type === 'audio' ? (
                        <AudioLines className="h-3.5 w-3.5" />
                      ) : (
                        <FileText className="h-3.5 w-3.5" />
                      )}
                      {currentSession?.type === 'audio' ? 'Audio' : 'Text'}
                    </span>
                    <span>{currentSession?.date || 'Unknown date'}</span>
                    <span>{currentSession?.time || ''}</span>
                    <span>{currentSession?.duration || ''}</span>
                  </div>
                </div>
              </div>

              {/* Right: Topic Select + Star */}
              <div className="shrink-0 flex items-center gap-3">
                <Select
                  value={selectedTopic}
                  onValueChange={(value) => setSelectedTopic(value)}
                >
                  <SelectTrigger className="h-8 w-auto max-w-none gap-0 border-none bg-transparent p-0 shadow-none hover:bg-transparent focus:ring-0 [&>svg]:hidden">
                    {selectedTopicData ? (
                      <SessionBadge 
                        topicBadge={{
                          icon: selectedTopicData.icon,
                          label: selectedTopicData.name,
                          wallpaper: selectedTopicData.wallpaper,
                        } as TopicBadgeInfo}
                        showChevron
                      />
                    ) : (
                      <div
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap border"
                        style={{
                          backgroundColor: 'hsl(0, 0%, 96%)',
                          color: 'hsl(0, 0%, 55%)',
                          borderColor: 'hsl(0, 0%, 88%)',
                        }}
                      >
                        <FolderOpen className="h-3.5 w-3.5" />
                        <span>Select topic</span>
                        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                      </div>
                    )}
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-card border border-border shadow-lg">
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id} className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span>{topic.icon}</span>
                          <span>{topic.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-1 rounded-md transition-smooth hover:bg-muted"
                >
                  <Star 
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isFavorite 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-muted-foreground hover:text-yellow-400"
                    )} 
                  />
                </button>
              </div>
            </div>

            {/* Second Row: Tabs (left) | Session Type Dropdown (right) */}
            <div className="flex items-center justify-between">
              {/* Tabs - Left aligned */}
              <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
                {(['details', 'highlights', 'transcript'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'rounded-md px-5 py-1.5 text-sm font-medium transition-smooth',
                      activeTab === tab
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Session Type Dropdown - Right aligned */}
              <div className="relative">
                <button
                  onClick={() => setSessionTypeDropdownOpen(!sessionTypeDropdownOpen)}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-smooth hover:bg-muted"
                >
                  <span>{selectedSessionTypeData?.icon}</span>
                  <span>{selectedSessionTypeData?.label}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {sessionTypeDropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-border bg-card py-1 shadow-lg">
                    {sessionTypes.map(type => (
                      <button 
                        key={type.id}
                        onClick={() => {
                          setSelectedSessionType(type.id);
                          setSessionTypeDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
                      >
                        <span>{type.icon}</span>
                        {type.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Layout - 2 columns: Content + Chat */}
          {/* Account for header (56px) + session header (~80px) + audio bar (~72px) */}
          <div className={cn("flex overflow-hidden", hasAudio ? "h-[calc(100vh-208px)]" : "h-[calc(100vh-136px)]")}>
            {/* Center Column - Content based on tab */}
            <div className="min-w-0 flex-1 overflow-auto p-6">
              {/* Highlights Tab */}
              {activeTab === 'highlights' && (
                <div className="rounded-xl border border-border bg-card flex overflow-hidden">
                  {/* Left: Bookmark List */}
                  <div className="w-48 shrink-0 border-r border-border p-3 overflow-auto">
                    <div className="space-y-2">
                      {mockBookmarks.map((bookmark) => (
                        <button
                          key={bookmark.id}
                          onClick={() => setSelectedBookmark(bookmark)}
                          className={cn(
                            "w-full rounded-lg p-3 text-left transition-smooth",
                            selectedBookmark.id === bookmark.id
                              ? "bg-muted"
                              : "hover:bg-muted/50"
                          )}
                        >
                          <div className="flex items-start gap-2">
                            <Bookmark className="mt-0.5 h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-foreground line-clamp-2">
                              {bookmark.title}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Bookmark Details */}
                  <div className="flex-1 p-6 overflow-auto">
                    {/* Header */}
                    <div className="mb-6 flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{selectedBookmark.date}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{selectedBookmark.time}</span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {selectedBookmark.duration}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Upload className="h-4 w-4" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>

                    {/* Main Idea */}
                    <div className="mb-6">
                      <div className="mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-foreground">Main Idea</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground">
                        {selectedBookmark.mainIdea}
                      </p>
                    </div>

                    {/* Original Context */}
                    <div className="mb-6">
                      <div className="mb-2 flex items-center gap-2">
                        <Quote className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-foreground">Original Context</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground italic">
                        {selectedBookmark.originalContext}
                      </p>
                    </div>

                    {/* Analysis */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <h3 className="text-sm font-semibold text-foreground">Analysis</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground">
                        {selectedBookmark.analysis}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Details Tab */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-foreground">Summary</h2>
                      <div className="relative">
                        <button 
                          onClick={() => setSummaryMenuOpen(!summaryMenuOpen)}
                          className="rounded-lg p-1 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        {summaryMenuOpen && (
                          <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-border bg-card py-1 shadow-lg">
                            <button 
                              onClick={() => setSummaryMenuOpen(false)}
                              className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
                            >
                              <Pencil className="h-4 w-4" />
                              Edit Summary
                            </button>
                            <button 
                              onClick={() => setSummaryMenuOpen(false)}
                              className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
                            >
                              <Upload className="h-4 w-4" />
                              Share Summary
                            </button>
                            <button 
                              onClick={() => setSummaryMenuOpen(false)}
                              className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
                            >
                              <RefreshCw className="h-4 w-4" />
                              Re-generate Summary
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-foreground">
                      The session explored Kevin Cavanaugh's unique approach to urban development, focusing on long-term holds, creative financing, and legal discrimination by profession. Key insights include the profitability of affordable housing without subsidies, architectural innovation using adaptive reuse, and the importance of enlightened investors. The discussion emphasized community-focused development and the potential for replicating these models in other cities.
                    </p>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">Key Points:</h3>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>• Kevin Cavanaugh's development model focuses on long-term holds rather than flipping, enabling the creation of profitable yet affordable housing without requiring subsidies.</li>
                      <li>• Gorilla Development's projects often combine market-rate and subsidized units within the same building, creating mixed-income environments.</li>
                      <li>• The concept of legal discrimination by profession allows developers to offer reduced rents to specific groups (e.g., social workers, teachers) based on their profession rather than income level.</li>
                    </ul>
                  </div>

                  {/* Your To-Dos */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-foreground">Your To-Dos</h2>
                      <div className="flex items-center gap-1">
                        <TooltipProvider>
                          <Tooltip open={todoTextCopied ? true : undefined}>
                            <TooltipTrigger asChild>
                              <button 
                                onClick={handleTodoTextCopy}
                                className="rounded-lg p-1.5 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
                              >
                                <ALargeSmall className="h-5 w-5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{todoTextCopied ? 'Text Copied!' : 'Share as Text'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip open={todoMarkdownCopied ? true : undefined}>
                            <TooltipTrigger asChild>
                              <button 
                                onClick={handleTodoMarkdownCopy}
                                className="rounded-lg p-1.5 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
                              >
                                <FileCode className="h-5 w-5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{todoMarkdownCopied ? 'Markdown Copied!' : 'Share as Markdown'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        "Review Gorilla Development's website and pro forma templates",
                        'Research legal implications of profession-based rent policies',
                        'Draft a case study outline based on The Great Scout project',
                        'Identify a list of potential enlightened investors for a test project',
                        'Schedule a follow-up call with Kevin Cavanaugh to clarify financial models'
                      ].map((todo, i) => (
                        <div key={i} className="group flex items-start gap-3 rounded-lg border border-border bg-background p-3">
                          <Checkbox className="mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground">{todo}</p>
                            <p className="text-xs text-muted-foreground">Due: Not set</p>
                          </div>
                          {/* Hover actions */}
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={(e) => { e.stopPropagation(); }}
                              className="p-1.5 text-muted-foreground hover:text-foreground transition-smooth"
                            >
                              <CloudUpload className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); }}
                              className="p-1.5 text-muted-foreground hover:text-foreground transition-smooth"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); }}
                              className="p-1.5 text-muted-foreground hover:text-destructive transition-smooth"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Notes */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-foreground">Detailed Notes</h2>
                      <MoreVertical className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-4 text-sm leading-relaxed text-foreground">
                      <p>
                        Kevin Cavanaugh, founder of Guerrilla Development, shared his unconventional philosophy on urban development. Unlike traditional developers who focus on quick flips and maximum profit margins, Cavanaugh emphasized the value of long-term property holds and building genuine community relationships.
                      </p>
                      <p>
                        A key insight from the discussion was his approach to "legal discrimination by profession" – strategically selecting tenants based on their profession to create a curated community atmosphere. This includes prioritizing artists, small business owners, and creative professionals who contribute to neighborhood character.
                      </p>
                      <p>
                        The creative financing strategies discussed included seller financing arrangements, community investment models, and patience-based approaches that prioritize sustainable growth over rapid returns. These methods allow for more flexibility and better alignment with community needs.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Transcript Tab */}
              {activeTab === 'transcript' && (
                <div className="relative">
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
                  <div className="rounded-xl border border-border bg-card p-5 pr-16">
                    <div className="space-y-6 text-sm leading-relaxed text-foreground">
                      <div>
                        <p className="mb-2 font-semibold">Speaker 1:</p>
                        <p>This is our first experiment in legal discrimination. I can say, I won't rent to you because you're a lawyer. And if you are on the front lines of fixing the homeless housing problem in the city, here's a key to a loft that's half price. I don't care what you make; I care what you do. So that's the experiment behind this.</p>
                        <p className="mt-4">I'm Kevin Cavanaugh, and I own Gorilla Development, a development firm here in Portland, Oregon. We have a few projects here, infill projects, mostly small to medium scale. Half of them are adaptive reuse projects, and half of them are new construction. We've got 24 projects. A dozen of them are completed, and a dozen are on the boards or under construction.</p>
                      </div>
                      <div>
                        <p>I've been doing this for 20 years. I was trained as an architect, one of the 50% of architecture grads who isn't a licensed architect. I chose the development path. I don't want to call myself a real estate developer because they're like always the bad guy in the movies, but that's my profession.</p>
                      </div>
                      <div>
                        <p>Gorilla Development came out after the last recession. It's "guerrilla" like, you know, guerrilla warfare, like the nimble fighters that can take on the big guys. We focus on smaller infill projects that the large developers don't want to touch. These are often in neighborhoods that need investment but haven't seen it because the numbers don't work for the big players.</p>
                      </div>
                      <div>
                        <p>Our model is different because we hold properties long-term rather than flipping them. This allows us to offer below-market rents to specific professions we want in our buildings. Teachers, social workers, nurses - people who make our communities better but often can't afford to live in them.</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Actions - Fixed position relative to viewport */}
                  <div className="fixed bottom-24 right-[340px] z-30 space-y-2">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground shadow-md transition-smooth hover:bg-muted-foreground hover:text-muted">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-smooth hover:bg-primary/90">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-smooth hover:bg-primary/90">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-smooth hover:bg-primary/90">
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Chat */}
            <div className="fixed top-0 right-0 bottom-0 w-80 flex flex-col border-l border-border bg-card z-10">
              <div className="border-b border-border px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-foreground">Chat</h2>
                    <Switch
                      id="topic-context"
                      checked={topicContextEnabled}
                      onCheckedChange={setTopicContextEnabled}
                      className="scale-75"
                    />
                    <Label htmlFor="topic-context" className="text-xs text-muted-foreground cursor-pointer">
                      Topic context
                    </Label>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="rounded-lg p-2 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground">
                      <FileText className="h-4 w-4" />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setShareMenuOpen(!shareMenuOpen)}
                        className="rounded-lg p-2 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
                      >
                        <Upload className="h-4 w-4" />
                      </button>
                    {shareMenuOpen && (
                      <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-border bg-card py-1 shadow-lg">
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          Share as Text
                        </button>
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          Share as Markdown
                        </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages Area - scrollable */}
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary px-4 py-3">
                    <p className="text-sm text-primary-foreground">How engaged are they in this opportunity?</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="rounded-2xl rounded-tl-md bg-muted px-4 py-3">
                  <p className="mb-3 text-sm leading-relaxed text-foreground">
                    The discussion centered on Kevin Cavanaugh's innovative development model and his deep engagement with socially driven real estate projects in Portland. He is highly engaged in this opportunity, demonstrating strong commitment through long-term holds, creative financing, and legal experimentation around profession-based housing.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• He actively pursues projects that combine affordability with profitability, using market-rate units to internally subsidize social impact units without legal encumbrances.</li>
                    <li>• His willingness to cap investor returns (4% vs. 8%) and forgo refinancing shows prioritization of mission over maximum yield.</li>
                  </ul>
                </div>
              </div>

              {/* Chat Input - always visible at bottom */}
              <div className="shrink-0 border-t border-border p-4 space-y-3">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-2 min-h-[44px]">
                  <textarea
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="How can I help?"
                    rows={1}
                    className="flex-1 bg-transparent pl-1 pr-2 text-sm placeholder:text-muted-foreground focus:outline-none resize-none min-h-[28px] max-h-[72px] overflow-y-auto leading-7"
                    style={{ height: '28px' }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 72) + 'px';
                    }}
                  />
                  <Button variant="action" size="icon" className="h-9 w-9 rounded-full shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth">
                    Identify key themes
                    <Sparkles className="h-3 w-3" />
                  </button>
                  <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-smooth">
                    More
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </main>
        
        {/* Audio Player - Fixed at bottom - Only show for audio sessions */}
        {hasAudio && (
          <div className={cn("fixed bottom-0 right-80 z-20 border-t border-border bg-card px-4 py-3 transition-all duration-300", collapsed ? "left-20" : "left-64")}>
            <div className="mx-auto flex max-w-4xl items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-smooth hover:bg-primary/90"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </button>
              <div className="flex flex-1 items-center gap-3">
                <div className="h-1 w-2 rounded-full bg-primary" />
                <div className="h-1 flex-1 rounded-full bg-muted" />
              </div>
              <span className="text-sm text-muted-foreground">22:28</span>
              <button className="rounded-lg border border-border px-2 py-1 text-sm text-muted-foreground hover:bg-muted">
                1.0×
              </button>
              <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionDetail;
