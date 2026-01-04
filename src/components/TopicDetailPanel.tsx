import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Copy, RefreshCw, ChevronRight, ChevronDown, Send, Sparkles,
  Lightbulb, FileText, Share, Bookmark as BookmarkIcon, Clock, Trash2, 
  Quote, BarChart3, Pencil, Download, Star, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { topics } from '@/data/topics';
import { highlights, Highlight } from '@/data/highlights';
import { cn } from '@/lib/utils';

type TopicTab = 'overview' | 'sessions' | 'highlights' | 'appearance';
type SessionTab = 'details' | 'highlights' | 'transcript';

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
  const [activeTopicTab, setActiveTopicTab] = useState<TopicTab>('overview');
  const [activeSessionTab, setActiveSessionTab] = useState<SessionTab>('details');
  const [selectedSessionId, setSelectedSessionId] = useState(mockSessions[0].id);
  const [sessionFavorites, setSessionFavorites] = useState<Record<string, boolean>>(
    mockSessions.reduce((acc, s) => ({ ...acc, [s.id]: s.isFavorite }), {})
  );
  const [selectedBookmarkId, setSelectedBookmarkId] = useState(mockSessionBookmarks[0].id);
  
  const topic = topics.find(t => t.id === topicId);
  const selectedSession = mockSessions.find(s => s.id === selectedSessionId);
  const selectedSessionBookmark = mockSessionBookmarks.find(b => b.id === selectedBookmarkId);
  
  const topicHighlights = useMemo(() => {
    return highlights.filter(h => h.topicId === topicId || h.topicName === topic?.name);
  }, [topicId, topic?.name]);
  
  const toggleSessionFavorite = (sessionId: string) => {
    setSessionFavorites(prev => ({ ...prev, [sessionId]: !prev[sessionId] }));
  };
  
  if (!topic) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Topic not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Topic Header */}
      <div className="shrink-0 border-b border-border bg-background px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Icon + Title + Meta */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl">{topic.icon}</span>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-medium leading-snug text-foreground">
                {topic.name}
              </h1>
              <p className="text-xs text-muted-foreground">
                {topic.sessionCount} sessions • Last updated {topic.date}
              </p>
            </div>
          </div>

          {/* Center: Tabs */}
          <div className="flex-1 flex justify-center">
            <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
              {(['overview', 'sessions', 'highlights'] as const).map(tab => (
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

          {/* Right: Placeholder */}
          <div className="w-32" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sessions Sidebar (only in sessions/overview tab) */}
        {(activeTopicTab === 'sessions' || activeTopicTab === 'overview') && activeTopicTab === 'sessions' && (
          <div className="w-72 shrink-0 overflow-auto border-r border-border bg-muted/30 p-4">
            <div className="space-y-2">
              {mockSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSessionId(session.id)}
                  className={cn(
                    "w-full rounded-lg p-3 text-left transition-smooth",
                    selectedSessionId === session.id
                      ? "bg-card border border-border shadow-sm"
                      : "hover:bg-card/50"
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
                  {mockSessions.slice(0, 3).map((session) => (
                    <div 
                      key={session.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                    >
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

          {/* Sessions Tab */}
          {activeTopicTab === 'sessions' && selectedSession && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
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
              </div>

              {activeSessionTab === 'details' && (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-2">{selectedSession.title}</h2>
                  <p className="text-xs text-muted-foreground mb-4">
                    {selectedSession.date} • {selectedSession.time} • {selectedSession.duration}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    {selectedSession.summary}
                  </p>
                </div>
              )}

              {activeSessionTab === 'highlights' && selectedSessionBookmark && (
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

          {/* Highlights Tab */}
          {activeTopicTab === 'highlights' && (
            <div className="space-y-4">
              {topicHighlights.length > 0 ? (
                topicHighlights.map((highlight) => (
                  <div key={highlight.id} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{highlight.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{highlight.sessionTitle}</p>
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
        </div>

        {/* Right Column - Chat (not on appearance tab) */}
        {activeTopicTab !== 'appearance' && (
          <div className="w-72 shrink-0 flex flex-col border-l border-border bg-muted/30">
            <div className="border-b border-border p-4">
              <h2 className="text-sm font-semibold text-primary">Chat in Topic</h2>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="text-sm text-muted-foreground">
                Ask questions about this topic...
              </div>
            </div>
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="How can I help?"
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button size="icon" variant="ghost">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
