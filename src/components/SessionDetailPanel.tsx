import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, ChevronRight, MoreVertical, Play, Pause, Sparkles, 
  Send, Wand2, Pencil, Copy, Download, Trash2, 
  FileText, Video, Bookmark, Lightbulb, Quote, BarChart3, Clock, Upload, CloudUpload, FolderOpen
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { topics, Topic } from '@/data/topics';
import { useSessions } from '@/contexts/SessionContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type WallpaperType = NonNullable<Topic['wallpaper']>;

const wallpaperBadgeColors: Record<WallpaperType | 'none', { bg: string; text: string }> = {
  none: { bg: 'bg-muted', text: 'text-foreground' },
  sand: { bg: 'bg-amber-500/10 dark:bg-amber-500/20', text: 'text-amber-700 dark:text-amber-400' },
  peach: { bg: 'bg-orange-500/10 dark:bg-orange-500/20', text: 'text-orange-700 dark:text-orange-400' },
  mint: { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-400' },
  lavender: { bg: 'bg-purple-500/10 dark:bg-purple-500/20', text: 'text-purple-700 dark:text-purple-400' },
  ocean: { bg: 'bg-blue-500/10 dark:bg-blue-500/20', text: 'text-blue-700 dark:text-blue-400' },
  sunset: { bg: 'bg-pink-500/10 dark:bg-pink-500/20', text: 'text-pink-700 dark:text-pink-400' },
  rose: { bg: 'bg-rose-500/10 dark:bg-rose-500/20', text: 'text-rose-700 dark:text-rose-400' },
  slate: { bg: 'bg-slate-500/10 dark:bg-slate-500/20', text: 'text-slate-700 dark:text-slate-400' },
  forest: { bg: 'bg-green-500/10 dark:bg-green-500/20', text: 'text-green-700 dark:text-green-400' },
  berry: { bg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/20', text: 'text-fuchsia-700 dark:text-fuchsia-400' },
  coral: { bg: 'bg-red-500/10 dark:bg-red-500/20', text: 'text-red-700 dark:text-red-400' },
  sky: { bg: 'bg-cyan-500/10 dark:bg-cyan-500/20', text: 'text-cyan-700 dark:text-cyan-400' },
  gold: { bg: 'bg-yellow-500/10 dark:bg-yellow-500/20', text: 'text-yellow-700 dark:text-yellow-400' },
  sage: { bg: 'bg-lime-500/10 dark:bg-lime-500/20', text: 'text-lime-700 dark:text-lime-400' },
  plum: { bg: 'bg-violet-500/10 dark:bg-violet-500/20', text: 'text-violet-700 dark:text-violet-400' },
  copper: { bg: 'bg-orange-600/10 dark:bg-orange-600/20', text: 'text-orange-800 dark:text-orange-400' },
};

type SessionTab = 'details' | 'highlights' | 'transcript' | 'settings';

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
  const { getSessionById, assignTopicToSession } = useSessions();
  const [activeTab, setActiveTab] = useState<SessionTab>('details');
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewOriginal, setViewOriginal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [selectedBookmark, setSelectedBookmark] = useState(mockBookmarks[0]);
  const [checkedTodos, setCheckedTodos] = useState<Set<number>>(new Set());

  const toggleTodo = (index: number) => {
    setCheckedTodos(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const session = getSessionById(sessionId);
  const assignedTopicId = session?.topicId;
  const selectedTopicData = assignedTopicId ? topics.find(t => t.id === assignedTopicId) : null;

  const handleAssignTopic = (topicId: string) => {
    assignTopicToSession(sessionId, topicId);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Session Header */}
      <div className="shrink-0 border-b border-border bg-background px-4 py-2 flex items-center justify-between">
        {/* Left spacer for balance */}
        <div className="w-48" />
        
        {/* Centered Tabs */}
        <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
          {(['details', 'highlights', 'transcript', 'settings'] as const).map(tab => (
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

        {/* Right side: Topic selector + Menu */}
        <div className="flex items-center gap-2 w-48 justify-end">
          <Select value={assignedTopicId || ''} onValueChange={handleAssignTopic}>
            <SelectTrigger className="h-8 w-auto gap-2 border-border bg-muted/50 px-3 text-sm">
              {selectedTopicData ? (
                <span className="flex items-center gap-2">
                  <span>{selectedTopicData.icon}</span>
                  <span className="max-w-[120px] truncate">{selectedTopicData.name}</span>
                </span>
              ) : (
                <span className="flex items-center gap-2 text-muted-foreground">
                  <FolderOpen className="h-4 w-4" />
                  <span>Add to topic</span>
                </span>
              )}
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {topics.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  <span className="flex items-center gap-2">
                    <span>{t.icon}</span>
                    <span>{t.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left/Center area with audio player */}
        <div className="flex min-w-0 flex-1 flex-col">
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
                    <div 
                      key={i} 
                      onClick={() => toggleTodo(i)}
                      className="group flex items-start gap-3 rounded-lg border border-border bg-background p-3 cursor-pointer hover:bg-muted/50 transition-smooth"
                    >
                      <Checkbox 
                        className="mt-0.5" 
                        checked={checkedTodos.has(i)}
                        onCheckedChange={() => toggleTodo(i)}
                        onClick={(e) => e.stopPropagation()}
                      />
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

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Detailed Notes</h2>
                  <MoreVertical className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-foreground">
                  <p>
                    The session explored unique approaches to urban development with a focus on sustainable, community-centered practices. Key themes included the importance of long-term property holds versus quick flips, and how patience-based strategies can lead to better outcomes for both developers and communities.
                  </p>
                  <p>
                    Creative financing was a major topic, covering seller financing arrangements, community investment models, and alternative funding structures that prioritize sustainable growth over rapid returns. These approaches allow for more flexibility and better alignment with neighborhood needs.
                  </p>
                  <p>
                    The discussion also touched on tenant curation strategies – selecting tenants based on profession to create vibrant, creative communities. This includes prioritizing artists, small business owners, and creative professionals who contribute positively to neighborhood character and culture.
                  </p>
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

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              {/* Session Details Section */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground mb-4">Session Details</h3>
                <div className="space-y-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Title</label>
                    <input
                      type="text"
                      defaultValue={session?.title || 'Untitled Session'}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Date</label>
                      <input
                        type="text"
                        defaultValue={session?.date || ''}
                        placeholder="Nov 4, 2025"
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Time</label>
                      <input
                        type="text"
                        defaultValue={session?.time || ''}
                        placeholder="4:58 PM"
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5">
                <h3 className="text-base font-semibold text-destructive mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete a session, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" size="sm" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Session
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
          {/* Audio Player - only spans left/center columns */}
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

        {/* Right Column - Chat */}
        <div className="w-80 shrink-0 flex flex-col border-l border-border bg-muted/30">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold text-foreground">Chat</h2>
              <div className="flex items-center gap-2">
                <Switch id="topic-context" className="scale-75" />
                <label htmlFor="topic-context" className="text-xs text-muted-foreground">Topic context</label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
              <Upload className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {/* User message */}
            <div className="flex justify-end">
              <div className="rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground max-w-[85%]">
                Can you summarize the key points from this session?
              </div>
            </div>
            {/* AI response */}
            <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-foreground">
              <p className="mb-2">Here are the key points from this session:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Urban development approaches discussed</li>
                <li>Long-term holds vs quick flips analyzed</li>
                <li>Creative financing options explored</li>
                <li>Community-focused development highlighted</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border p-4 space-y-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-2">
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
      </div>
    </div>
  );
}
