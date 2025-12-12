import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Send, Sparkles, ChevronRight, Star, Mic, BookmarkIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { topics } from '@/data/topics';
import { cn } from '@/lib/utils';

const topicColors: Record<string, string> = {
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

const mockSessions = [
  { id: '1', title: 'Final UI Refinements and Merge Preparation', date: 'Oct 18, 2025', time: '9:16 AM', duration: '22m', bookmarks: 3, isFavorite: true },
  { id: '2', title: 'Hedy App Redesign Sync', date: 'Nov 18, 2025', time: '3:31 PM', duration: '40m', bookmarks: 0, isFavorite: true },
  { id: '3', title: 'Hedy App UI Update and Health Discussion', date: 'Nov 14, 2025', time: '9:33 AM', duration: '31m', bookmarks: 2, isFavorite: false },
  { id: '4', title: 'Hedy Redesign Progress Review', date: 'Nov 5, 2025', time: '2:15 PM', duration: '28m', bookmarks: 0, isFavorite: false },
];

type TopicTab = 'overview' | 'sessions' | 'highlights';

const TopicDetailBannerSolid = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<TopicTab>('overview');
  const [sessionFavorites, setSessionFavorites] = useState<Record<string, boolean>>(
    mockSessions.reduce((acc, s) => ({ ...acc, [s.id]: s.isFavorite }), {})
  );

  const topic = topics.find(t => t.id === id);
  const topicColor = topic ? topicColors[topic.icon] || 'hsl(207, 18%, 51%)' : 'hsl(207, 18%, 51%)';

  if (!topic) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Topic not found</p>
      </div>
    );
  }

  const tabs: { id: TopicTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'highlights', label: 'Highlights' },
  ];

  return (
    <div className="flex h-screen bg-card overflow-hidden">
      {!isMobile && <Sidebar />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {!isMobile && <Header />}
        
        <main className="flex-1 overflow-hidden bg-background rounded-tl-2xl flex flex-col relative">
          {/* Color Banner - Solid */}
          <div 
            className="h-28 w-full shrink-0"
            style={{ backgroundColor: topicColor }}
          >
            {/* Back Button */}
            <div className="absolute top-4 left-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Content Container - overlapping the banner */}
          <div className="flex-1 -mt-6 relative z-10 bg-card rounded-t-3xl overflow-hidden flex flex-col shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]">
            {/* Topic Icon Container - positioned at the overlap */}
            <div className="absolute -top-10 left-6">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg border-4 border-card"
                style={{ backgroundColor: topicColor }}
              >
                {topic.icon}
              </div>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pt-14 px-6 pb-6">
              {/* Topic Header Info */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">{topic.name}</h1>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span>{topic.sessionCount} sessions</span>
                  <span>•</span>
                  <span>Last updated {topic.date}</span>
                  {topic.sharedBy && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs">
                        <Users className="h-3 w-3" />
                        Shared by {topic.sharedBy}
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex gap-1 border-b border-border mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "px-4 py-2.5 text-sm font-medium transition-colors relative",
                      activeTab === tab.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-background rounded-xl p-6 border border-border">
                    <h3 className="font-semibold text-foreground mb-3">About this topic</h3>
                    <p className="text-muted-foreground text-sm">
                      {topic.description || `This topic contains ${topic.sessionCount} sessions related to ${topic.name}.`}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Recent Sessions</h3>
                    <div className="space-y-2">
                      {mockSessions.slice(0, 3).map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => navigate(`/session/${session.id}`)}
                        >
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <Mic className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{session.title}</p>
                            <p className="text-xs text-muted-foreground">{session.date} • {session.duration}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'sessions' && (
                <div className="space-y-2">
                  {mockSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/session/${session.id}`)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSessionFavorites(prev => ({ ...prev, [session.id]: !prev[session.id] }));
                        }}
                        className="p-1"
                      >
                        <Star
                          className={cn(
                            "h-4 w-4",
                            sessionFavorites[session.id]
                              ? "fill-yellow-400 stroke-yellow-500"
                              : "stroke-muted-foreground"
                          )}
                        />
                      </button>
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Mic className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{session.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{session.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {session.duration}
                          </span>
                          {session.bookmarks > 0 && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <BookmarkIcon className="h-3 w-3" />
                                {session.bookmarks}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'highlights' && (
                <div className="text-center py-12">
                  <BookmarkIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No highlights yet</p>
                  <p className="text-sm text-muted-foreground/70">Highlights from sessions will appear here</p>
                </div>
              )}
            </div>
          </div>
        </main>
        
        {isMobile && <MobileBottomNav />}
      </div>
    </div>
  );
};

export default TopicDetailBannerSolid;
