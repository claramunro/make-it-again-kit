import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, ChevronDown, MoreVertical, Play, Pause, Sparkles, 
  Send, Wand2, Pencil, Copy, Download, Link2, UserPlus, Mail, 
  Calendar, Trash2, Share, Folder, FileText, Video, Bookmark,
  Lightbulb, Quote, BarChart3, Clock, Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Sidebar, useSidebarCollapsed } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { topics } from '@/data/topics';

type SessionTab = 'details' | 'highlights' | 'transcript';

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

const SessionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isMobile = useIsMobile();
  const { collapsed } = useSidebarCollapsed();
  const [activeTab, setActiveTab] = useState<SessionTab>('highlights');
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

  const selectedTopicData = topics.find(t => t.id === '2');
  const selectedSessionTypeData = sessionTypes.find(t => t.id === selectedSessionType);

  return (
    <div className="flex min-h-screen bg-card">
      {!isMobile && <Sidebar />}
      
      <div className="flex flex-1 flex-col">
        {!isMobile && <Header />}
        
        <main className="flex-1 rounded-tl-2xl bg-background">
          {/* Session Header */}
          <div className="sticky top-14 z-10 border-b border-border bg-card px-4 py-4 md:px-6">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Back button + Icon + Title + Meta */}
              <div className="flex items-center gap-3 min-w-0">
                <button 
                  onClick={() => navigate('/')}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-smooth hover:bg-primary/90"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <h1 className="truncate text-base font-semibold text-foreground">
                    Title
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Date: Oct 18, 2025 9:16 AM<br />
                    Duration: 2 minutes
                  </p>
                </div>
              </div>

              {/* Right: Badge */}
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Badge
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-4">
              <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
                {(['details', 'highlights', 'transcript'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'rounded-md px-6 py-2 text-sm font-medium transition-smooth',
                      activeTab === tab
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

          {/* Main 3-Column Layout */}
          <div className="flex h-[calc(100vh-180px)]">
            {/* Left Column - Bookmarks List */}
            <div className="w-80 shrink-0 overflow-auto border-r border-border bg-muted/30 p-4">
              <div className="space-y-2">
                {mockBookmarks.map((bookmark) => (
                  <button
                    key={bookmark.id}
                    onClick={() => setSelectedBookmark(bookmark)}
                    className={cn(
                      "w-full rounded-lg p-3 text-left transition-smooth",
                      selectedBookmark.id === bookmark.id
                        ? "bg-card border border-border shadow-sm"
                        : "hover:bg-card/50"
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

            {/* Center Column - Bookmark Detail */}
            <div className="flex-1 overflow-auto p-6">
              <div className="rounded-xl border border-border bg-card p-6">
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

            {/* Right Column - Chat */}
            <div className="w-80 shrink-0 flex flex-col border-l border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">Chat</h2>
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

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-auto p-4">
                {/* Empty state or messages would go here */}
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 rounded-full bg-muted p-4">
                    <Sparkles className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Ask questions about this session</p>
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t border-border p-4">
                {/* Todo checkboxes */}
                <div className="mb-3 space-y-2">
                  <label className="flex items-start gap-2 text-xs text-muted-foreground">
                    <input type="checkbox" className="mt-0.5 h-3 w-3 rounded border-border" />
                    <span>Visit the Endurance website or call the provided number for a quote from Terrie.</span>
                  </label>
                  <label className="flex items-start gap-2 text-xs text-muted-foreground">
                    <input type="checkbox" className="mt-0.5 h-3 w-3 rounded border-border" />
                    <span>Evaluate the Endurance warranty plan for potential enrollment.</span>
                  </label>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-2">
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
          </div>

        </main>
        
        {/* Audio Player - Fixed at bottom */}
        <div className={cn("fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-card px-4 py-3 transition-all duration-300", isMobile ? "" : collapsed ? "md:left-20" : "md:left-56")}>
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
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default SessionDetail;
