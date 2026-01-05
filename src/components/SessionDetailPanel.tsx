import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, MoreVertical, Play, Pause, Sparkles, 
  Send, Wand2, Pencil, Copy, Download, Trash2, 
  FileText, Video, Bookmark, Lightbulb, Quote, BarChart3, Clock, Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { topics } from '@/data/topics';

type SessionTab = 'details' | 'highlights' | 'transcript';

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
    analysis: 'This reflects the principle of "action preceding insight," common in dynamic work environments where decisions must be made amid ambiguity.',
  },
  {
    id: '2',
    title: 'The Importance of Sequence in Process',
    date: 'Oct 21, 2025',
    time: '7:25 PM',
    duration: '00:45',
    mainIdea: 'The order of operations matters significantly in any process. Starting with the right foundation prevents costly rework later.',
    originalContext: "We need to establish the baseline before we can measure improvement.",
    analysis: 'This highlights the importance of methodical approach in problem-solving.',
  },
  {
    id: '3',
    title: 'Iterative Feedback Loops',
    date: 'Oct 21, 2025',
    time: '7:30 PM',
    duration: '00:52',
    mainIdea: 'Iterative feedback loops accelerate learning and reduce the time between action and insight.',
    originalContext: "Every time we test, we learn something new.",
    analysis: 'This emphasizes the value of rapid iteration in modern development methodologies.',
  },
];

interface SessionDetailPanelProps {
  sessionId: string;
}

export function SessionDetailPanel({ sessionId }: SessionDetailPanelProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SessionTab>('details');
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewOriginal, setViewOriginal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [selectedBookmark, setSelectedBookmark] = useState(mockBookmarks[0]);

  const selectedTopicData = topics.find(t => t.id === '2');

  return (
    <div className="flex h-full flex-col">
      {/* Session Header */}
      <div className="shrink-0 border-b border-border bg-background px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Icon + Title + Meta */}
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <h1 className="truncate text-sm font-medium leading-snug text-foreground">
                Session Title
              </h1>
              <p className="text-xs text-muted-foreground">
                Oct 18, 2025 9:16 AM • 2 minutes
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
                    'rounded-md px-4 py-1.5 text-sm font-medium transition-smooth',
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
            {selectedTopicData && (
              <button
                onClick={() => navigate(`/topic/${selectedTopicData.id}`)}
                className="inline-flex items-center gap-2 rounded-lg bg-violet-500/10 dark:bg-violet-500/20 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-violet-500/20 dark:hover:bg-violet-500/30 transition-smooth"
              >
                <span>{selectedTopicData.icon}</span>
                <span>{selectedTopicData.name}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column - Only show for Highlights tab */}
        {activeTab === 'highlights' && (
          <div className="w-64 shrink-0 overflow-auto border-r border-border bg-muted/30 p-4">
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

              <div className="mb-6">
                <div className="mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">Main Idea</h3>
                </div>
                <p className="text-sm leading-relaxed text-foreground">
                  {selectedBookmark.mainIdea}
                </p>
              </div>

              <div className="mb-6">
                <div className="mb-2 flex items-center gap-2">
                  <Quote className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">Original Context</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  {selectedBookmark.originalContext}
                </p>
              </div>

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
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Summary</h2>
                  <MoreVertical className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="mb-4 text-sm leading-relaxed text-foreground">
                  The session explored unique approaches to urban development, focusing on long-term holds, creative financing, and community-focused development.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Your To-Dos</h2>
                  <Download className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  {[
                    "Review project templates",
                    'Research policy implications',
                    'Draft case study outline',
                  ].map((todo, i) => (
                    <label key={i} className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
                      <Checkbox className="mt-0.5" />
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

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="space-y-6 text-sm leading-relaxed text-foreground">
                  <div>
                    <p className="mb-2 font-semibold">Speaker 1:</p>
                    <p>This is our first experiment in the process. We're testing new approaches to understand how things work in practice.</p>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold">Speaker 2:</p>
                    <p>That's interesting. How do you plan to measure success in this experiment?</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Chat */}
        <div className="w-80 shrink-0 flex flex-col border-l border-border bg-muted/30">
          <div className="border-b border-border p-4">
            <h2 className="text-sm font-semibold text-foreground">Chat</h2>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div className="text-sm text-muted-foreground">
              Ask questions about this session...
            </div>
          </div>
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button size="icon" variant="ghost">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      <div className="shrink-0 border-t border-border bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-smooth hover:bg-primary/90"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </button>
          <div className="flex-1">
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-2 w-1/3 rounded-full bg-primary" />
            </div>
          </div>
          <span className="text-sm text-muted-foreground">0:45 / 2:00</span>
        </div>
      </div>
    </div>
  );
}
