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
        
        <main className="flex-1 overflow-hidden rounded-tl-2xl bg-background">
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
                    Date: Oct 18, 2025 9:16 AM · Duration: 2 minutes
                  </p>
                </div>
              </div>

              {/* Center: Tabs */}
              <div className="flex-1 flex justify-center">
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

              {/* Right: Topic Tag */}
              <div className="shrink-0">
                {selectedTopicData ? (
                  <button
                    onClick={() => navigate(`/topic/${selectedTopicData.id}`)}
                    className="inline-flex items-center gap-2 rounded-lg bg-violet-500/10 dark:bg-violet-500/20 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-violet-500/20 dark:hover:bg-violet-500/30 transition-smooth"
                  >
                    <span>{selectedTopicData.icon}</span>
                    <span>{selectedTopicData.name}</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    No Topic
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Main Layout - 3 columns for Highlights, 2 columns for Details/Transcript */}
          {/* Account for header (56px) + session header (~80px) + audio bar (~72px) */}
          <div className="flex h-[calc(100vh-208px)] overflow-hidden">
            {/* Left Column - Only show for Highlights tab */}
            {activeTab === 'highlights' && (
              <div className="w-64 min-w-0 shrink-0 overflow-auto border-r border-border bg-muted/30 p-4 xl:w-80">
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
            )}

            {/* Center Column - Content based on tab */}
            <div className="min-w-0 flex-1 overflow-auto p-6">
              {/* Highlights Tab */}
              {activeTab === 'highlights' && (
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
              )}

              {/* Details Tab */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="rounded-xl border border-border bg-card p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-foreground">Summary</h2>
                      <MoreVertical className="h-5 w-5 text-muted-foreground" />
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
                      <Download className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-3">
                      {[
                        "Review Gorilla Development's website and pro forma templates",
                        'Research legal implications of profession-based rent policies',
                        'Draft a case study outline based on The Great Scout project',
                        'Identify a list of potential enlightened investors for a test project',
                        'Schedule a follow-up call with Kevin Cavanaugh to clarify financial models'
                      ].map((todo, i) => (
                        <label key={i} className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
                          <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-border" />
                          <div>
                            <p className="text-sm text-foreground">{todo}</p>
                            <p className="text-xs text-muted-foreground">Due: Not set</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Transcript Tab */}
              {activeTab === 'transcript' && (
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

            {/* Right Column - Chat */}
            <div className="w-64 min-w-0 shrink-0 flex flex-col border-l border-border bg-card xl:w-80">
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

              {/* Chat Messages Area - scrollable */}
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-muted px-4 py-3">
                    <p className="text-sm text-foreground">How engaged are they in this opportunity?</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="rounded-xl border-l-4 border-primary/30 bg-primary/5 p-4">
                  <p className="mb-3 text-sm leading-relaxed text-foreground">
                    The discussion centered on Kevin Cavanaugh's innovative development model and his deep engagement with socially driven real estate projects in Portland. He is highly engaged in this opportunity, demonstrating strong commitment through long-term holds, creative financing, and legal experimentation around profession-based housing.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>- He actively pursues projects that combine affordability with profitability, using market-rate units to internally subsidize social impact units without legal encumbrances.</li>
                    <li>- His willingness to cap investor returns (4% vs. 8%) and forgo refinancing shows prioritization of mission over maximum yield.</li>
                  </ul>
                </div>
              </div>

              {/* Chat Input - always visible at bottom */}
              <div className="shrink-0 border-t border-border p-4">
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
        <div className={cn("fixed bottom-0 right-0 z-20 border-t border-border bg-card px-4 py-3 transition-all duration-300", isMobile ? "left-0" : collapsed ? "left-20" : "left-64")}>
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
