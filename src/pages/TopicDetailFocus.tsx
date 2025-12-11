import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Copy, RefreshCw, ChevronRight, Info, Send, Sparkles, Lock, Lightbulb, FolderOpen, FolderPlus, Umbrella, UsersRound, Calendar, MessageCircle, Monitor, UserRound, LayoutGrid, Landmark, Wrench, Utensils, Search, MusicIcon, Heart, Star, Settings, Camera, Smartphone, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { topics } from '@/data/topics';
import { cn } from '@/lib/utils';

const topicColors = [
  'hsl(12, 76%, 61%)', 'hsl(199, 89%, 48%)', 'hsl(235, 66%, 45%)', 'hsl(142, 71%, 45%)',
  'hsl(142, 69%, 58%)', 'hsl(76, 74%, 50%)', 'hsl(36, 100%, 50%)', 'hsl(16, 100%, 50%)',
  'hsl(0, 84%, 60%)', 'hsl(338, 71%, 51%)', 'hsl(262, 52%, 47%)', 'hsl(271, 91%, 65%)',
  'hsl(25, 38%, 39%)', 'hsl(0, 0%, 62%)', 'hsl(207, 18%, 51%)', 'hsl(160, 84%, 39%)',
  'hsl(181, 100%, 41%)', 'hsl(45, 93%, 47%)',
];

const topicIcons = [
  { icon: FolderOpen, name: 'folder' }, { icon: FolderPlus, name: 'folder-plus' },
  { icon: LayoutGrid, name: 'grid' }, { icon: Umbrella, name: 'umbrella' },
  { icon: UsersRound, name: 'users' }, { icon: Calendar, name: 'calendar' },
  { icon: Lightbulb, name: 'lightbulb' }, { icon: MessageCircle, name: 'message' },
  { icon: Monitor, name: 'monitor' }, { icon: UserRound, name: 'user' },
  { icon: Landmark, name: 'home' }, { icon: LayoutGrid, name: 'table' },
  { icon: Wrench, name: 'tools' }, { icon: Utensils, name: 'utensils' },
  { icon: Search, name: 'search' }, { icon: MusicIcon, name: 'music' },
  { icon: Sparkles, name: 'sparkles' }, { icon: Heart, name: 'heart' },
  { icon: Star, name: 'star' }, { icon: Settings, name: 'settings' },
  { icon: Camera, name: 'camera' }, { icon: Smartphone, name: 'phone' },
];

const topicEmojis = ['🎨', '📦', '🏋️', '☕', '🐶', '📅', '💡', '🎯', '🚀', '✨', '🎵', '❤️', '⭐', '🔧', '📱', '💻'];

const mockSessions = [
  { id: '1', title: 'Final UI Refinements and Merge Preparation', date: 'Monday, December 1, 2025 • 3:43 PM', duration: '22m', summary: 'Julian and Clara reviewed the progress on the final UI refinements...' },
  { id: '2', title: 'Hedy App Redesign Sync', date: 'Tuesday, November 18, 2025 • 3:31 PM', duration: '40m', summary: 'Julian and Clara reviewed the current state of the Hedy app redesign...' },
  { id: '3', title: 'Hedy App UI Update and Health Discussion', date: 'Friday, November 14, 2025 • 9:33 AM', duration: '31m', summary: 'Julian and Clara discussed the latest progress on the Hedy app redesign...' },
  { id: '4', title: 'Hedy Redesign Progress Review', date: 'Wednesday, November 5, 2025 • 2:15 PM', duration: '28m', summary: 'The team reviewed overall progress on the redesign initiative...' },
];

const TopicDetailFocus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [iconType, setIconType] = useState<'icons' | 'emoji'>('icons');
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState(17);
  const [topicName, setTopicName] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [aiContext, setAiContext] = useState('Clara is working on design updates to the Hedy app.');
  
  const topic = topics.find(t => t.id === id);
  
  if (!topic) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Topic not found</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">{topic.icon}</span>
              <h1 className="text-lg font-semibold">{topic.name}</h1>
            </div>
            <p className="text-xs text-muted-foreground">
              {topic.sessionCount} Sessions • Last Updated: Dec 1, 2025 4:05 PM
            </p>
          </div>
          
          <Button variant="ghost" size="icon" className="text-primary">
            <Users className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Tabs */}
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg bg-muted p-1">
              {['overview', 'sessions', 'chat', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'rounded-md px-4 py-1.5 text-sm font-medium transition-all',
                    activeTab === tab
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl p-4 md:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {topic.sharedBy && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Users className="h-4 w-4" />
                  <span>Shared by {topic.sharedBy} • View only</span>
                </div>
              )}
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Topic Insights</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Copy className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><RefreshCw className="h-4 w-4" /></Button>
                  </div>
                </div>
                
                <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    The Hedy Redesign initiative is advancing through its final visual stabilization phase...
                  </p>
                  <p className="text-xs text-muted-foreground text-right">Last Generated: Dec 1, 2025 4:05 PM</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="space-y-4">
              {mockSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => navigate(`/session/${session.id}`)}
                  className="w-full rounded-xl border border-border bg-card p-4 text-left transition-smooth hover:border-primary/20 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold">{session.title}</h3>
                      <p className="text-xs text-muted-foreground">{session.date}</p>
                      <p className="text-xs text-muted-foreground">Duration: {session.duration}</p>
                      <p className="text-sm text-muted-foreground italic line-clamp-2">{session.summary}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex flex-col h-[calc(100vh-200px)]">
              <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground mb-4">
                <Info className="h-4 w-4 shrink-0" />
                <span>Chat messages in shared content are not saved</span>
              </div>
              <div className="flex-1" />
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input placeholder="How can I help?" className="pr-12 rounded-full" />
                  <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-primary">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="icon" className="rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              {topic.sharedBy && (
                <div className="rounded-lg bg-amber-100 px-4 py-3 text-sm text-amber-800 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  This topic is shared view-only. Ask the owner to make changes.
                </div>
              )}
              
              <div className="space-y-4">
                <h3 className="font-semibold">Basic information</h3>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Topic Name</Label>
                  <Input value={topicName || topic.name} onChange={(e) => setTopicName(e.target.value)} disabled={!!topic.sharedBy} />
                </div>
                <Textarea placeholder="Topic Description" value={topicDescription} onChange={(e) => setTopicDescription(e.target.value)} disabled={!!topic.sharedBy} />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Appearance</h3>
                <div className="space-y-3">
                  <Label className="text-sm">Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {topicColors.map((color, i) => (
                      <button key={i} onClick={() => setSelectedColor(i)} disabled={!!topic.sharedBy}
                        className={cn('h-10 w-10 rounded-full transition-all', selectedColor === i && 'ring-2 ring-offset-2 ring-primary')}
                        style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <h3 className="font-semibold">AI context & instructions</h3>
                </div>
                <p className="text-sm text-muted-foreground">Provide context to help Hedy understand this topic.</p>
                <div className="relative">
                  <Textarea value={aiContext} onChange={(e) => setAiContext(e.target.value)} placeholder="Add context for AI..." className="min-h-[120px]" disabled={!!topic.sharedBy} maxLength={20000} />
                  <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">{aiContext.length}/20000</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TopicDetailFocus;
