import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Copy, RefreshCw, ChevronRight, Info, Send, Sparkles, Lock, Lightbulb, FolderOpen, FolderPlus, Umbrella, UsersRound, Calendar, MessageCircle, Monitor, UserRound, LayoutGrid, Landmark, Wrench, Utensils, Search, MusicIcon, Heart, Star, Settings, Camera, Smartphone, Check } from 'lucide-react';
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
  'hsl(12, 76%, 61%)',    // coral/orange-red
  'hsl(199, 89%, 48%)',   // bright blue
  'hsl(235, 66%, 45%)',   // indigo
  'hsl(142, 71%, 45%)',   // green
  'hsl(142, 69%, 58%)',   // light green
  'hsl(76, 74%, 50%)',    // lime
  'hsl(36, 100%, 50%)',   // orange
  'hsl(16, 100%, 50%)',   // red-orange
  'hsl(0, 84%, 60%)',     // red
  'hsl(338, 71%, 51%)',   // pink
  'hsl(262, 52%, 47%)',   // purple
  'hsl(271, 91%, 65%)',   // light purple
  'hsl(25, 38%, 39%)',    // brown
  'hsl(0, 0%, 62%)',      // gray
  'hsl(207, 18%, 51%)',   // slate
  'hsl(160, 84%, 39%)',   // teal
  'hsl(181, 100%, 41%)',  // cyan
  'hsl(45, 93%, 47%)',    // yellow/gold
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
    date: 'Monday, December 1, 2025 • 3:43 PM',
    duration: '22m',
    summary: 'Julian and Clara reviewed the progress on the final UI refinements for the Hedy app redesign, confirming that the interface is nearing completion and ready for merging into the main branch. Clara walked through the visual updates including session lists, ...',
  },
  {
    id: '2',
    title: 'Hedy App Redesign Sync',
    date: 'Tuesday, November 18, 2025 • 3:31 PM',
    duration: '40m',
    summary: 'Julian and Clara reviewed the current state of the Hedy app redesign, focusing on UI refinements, mobile responsiveness, and technical implementation challenges. Clara demonstrated progress on settings redesign, dropdown standardization, and visual c...',
  },
  {
    id: '3',
    title: 'Hedy App UI Update and Health Discussion',
    date: 'Friday, November 14, 2025 • 9:33 AM',
    duration: '31m',
    summary: 'Julian and Clara discussed the latest progress on the Hedy app redesign, focusing on UI refinements in the settings area and dropdown component standardization. Clara detailed her work in Figma, moving settings sections into containers for visual consi...',
  },
  {
    id: '4',
    title: 'Hedy Redesign Progress Review',
    date: 'Wednesday, November 5, 2025 • 2:15 PM',
    duration: '28m',
    summary: 'The team reviewed overall progress on the redesign initiative and discussed next steps.',
  },
];

const TopicDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('overview');
  const [iconType, setIconType] = useState<'icons' | 'emoji'>('icons');
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState(17); // sparkles
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
    <div className="flex min-h-screen bg-background">
      {!isMobile && <Sidebar />}
      
      <div className="flex flex-1 flex-col">
        <Header />
        
        <main className="flex-1 p-4 pb-24 md:p-6 md:pb-6">
          <div className="mx-auto max-w-4xl">
            {/* Topic Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Button variant="ghost" size="icon" onClick={() => navigate('/topics')}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <span className="text-2xl">{topic.icon}</span>
                <h1 className="text-xl font-semibold">{topic.name}</h1>
                {topic.sharedBy && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
                    <Users className="h-3 w-3" />
                    Shared by {topic.sharedBy}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground ml-14">
                {topic.sessionCount} Sessions • Last Updated: Dec 1, 2025 4:05 PM
              </p>
            </div>
            
            {/* Tabs */}
            <div className="mb-6">
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

            {/* Content */}
          {activeTab === 'overview' && (
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
                    The Hedy Redesign initiative is advancing through its final visual stabilization phase, with the team focused on refining UI components in Figma and preparing for a critical merge of the main branch into the 'feature design updates V2' branch. Led by Clara and Julian, the effort emphasizes consistency in padding, dropdown behavior, and Flutter-based theming to ensure cross-platform harmony.
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    Core design decisions have been locked in, including a chat-first interface, modal settings, and signature micro-interactions like the sparkle animation. The team is now resolving technical debt and iOS-specific issues, such as app crashes during navigation, while deferring experimental features like iOS-style animations and drag-and-drop organization to post-launch. The target remains a post-Thanksgiving release, pending final polish and successful integration.
                  </p>
                  <p className="text-xs text-muted-foreground text-right">
                    Last Generated: Dec 1, 2025 4:05 PM
                  </p>
                </div>
              </div>
              
              {/* Next Agenda */}
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-semibold mb-4">Next Agenda</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Finalize UI refinements in Figma: padding, dropdowns, and Flutter-based theming</p>
                        <p className="text-xs text-muted-foreground">Discussed on Dec 1, 2025; Clara's progress on container visibility and dropdown consistency remains a critical path item before merge and search implementation can proceed.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Execute collaborative merge of main into feature branch using AI-assisted tools</p>
                        <p className="text-xs text-muted-foreground">Confirmed on Dec 1, 2025; Julian and Clara agreed to perform the merge during their next sync to resolve conflicts early and ensure clean integration before new feature work resumes.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Review readiness for search bar implementation post-UI merge</p>
                        <p className="text-xs text-muted-foreground">Highlighted on Dec 1, 2025; Julian is blocked until UI stabilization is complete and the feature branch is up to date—this will be a key follow-up once the merge is finalized.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress Summary */}
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-semibold mb-4">Progress Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Strong momentum in visual redesign with Figma updates nearly complete</p>
                      <p className="text-xs text-muted-foreground">Including refined micro-interactions and standardized components; Clara advanced multiple branches, including conservative and experimental versions with AI-generated backgrounds, and demonstrated container visibility toggles and dropdown consistency on Dec 1, 2025.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Technical foundation stabilized after resolving Flutter upgrade, Whisper model, and Xcode signing issues</p>
                      <p className="text-xs text-muted-foreground">App now builds and runs successfully on macOS after dependency fixes—confirmed during Oct 29 session, enabling Clara to begin implementation on a clean branch.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Key design decisions locked in: chat-first interface, modal settings, sparkle animation, and audio separation for speaker ID</p>
                      <p className="text-xs text-muted-foreground">Balances innovation with brand continuity and technical feasibility; confirmed across multiple sessions including Nov 5 alignment.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Setback in branch integrity required a reset via 'feature design updates V2' to avoid merge conflicts</p>
                      <p className="text-xs text-muted-foreground">Julian advised the clean start after structural changes in the Windows branch caused instability—branch created on Oct 22, 2025.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Unresolved Decisions */}
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-semibold mb-4">Unresolved Decisions</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="h-4 w-4 mt-0.5 rounded border border-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Session layout options (list vs. multi-column) deferred pending mobile responsiveness validation</p>
                      <p className="text-xs text-muted-foreground">Data gap: user testing feedback on space efficiency and navigation clarity across devices; last discussed on Oct 23, 2025.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-4 w-4 mt-0.5 rounded border border-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Image background rollout strategy undecided—default for new users vs. opt-in toggle</p>
                      <p className="text-xs text-muted-foreground">Concerns about performance and accessibility in low-bandwidth or high-contrast scenarios not yet evaluated; discussed on Nov 5, 2025.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Items */}
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-semibold mb-4">Action Items</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-destructive px-1.5 py-0.5 text-[10px] font-semibold text-destructive-foreground">P0</span>
                    </div>
                    <p className="text-sm font-medium">Finalize UI refinements in Figma—padding, dropdowns, theming with Flutter variables—and prepare for merge</p>
                    <p className="text-xs text-muted-foreground">Owner: Clara • Due: 2025-12-03</p>
                    <p className="text-xs text-muted-foreground">Blocking Julian's implementation of search and other features; progress reviewed on Dec 1, 2025.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">P1</span>
                    </div>
                    <p className="text-sm font-medium">Collaboratively merge main into feature branch using AI-assisted conflict resolution</p>
                    <p className="text-xs text-muted-foreground">Owner: Clara, Julian • Due: 2025-12-04</p>
                    <p className="text-xs text-muted-foreground">Scheduled during next sync to ensure clean integration before release.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">P1</span>
                    </div>
                    <p className="text-sm font-medium">Implement search bar functionality post-merge</p>
                    <p className="text-xs text-muted-foreground">Owner: Julian • Due: 2025-12-06</p>
                    <p className="text-xs text-muted-foreground">Dependent on UI stabilization and successful merge; confirmed as next step on Dec 1, 2025.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">P2</span>
                    </div>
                    <p className="text-sm font-medium">Other tasks</p>
                    <p className="text-xs text-muted-foreground">8 total including onboarding screens, button radii adjustment, dark mode testing, and Figma documentation. Also noted: iOS animation exploration, language selection, global navigation refinement, and toast standardization (7 more).</p>
                  </div>
                </div>
              </div>
              
              {/* Stakeholder Positions */}
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-semibold mb-4">Stakeholder Positions</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="h-4 w-4 mt-0.5 rounded border border-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Clara advocates for modern, visually rich updates—including AI-generated backgrounds and iOS-style animations—while remaining aligned with brand identity.</p>
                      <p className="text-xs text-muted-foreground">Pushing for innovation within defined boundaries; demonstrated experimental designs on Nov 5 and Dec 1, 2025.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-4 w-4 mt-0.5 rounded border border-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Julian prioritizes technical stability, favoring incremental structural changes and clean merges over experimental UI patterns.</p>
                      <p className="text-xs text-muted-foreground">Seeks to minimize risk ahead of post-Thanksgiving release; emphasized merge strategy and conflict resolution on Dec 1, 2025.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-4 w-4 mt-0.5 rounded border border-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Both agree on preserving Hedy's identity as a proactive coach, supporting a chat-first interface and deferring major UX overhauls until after visual stabilization.</p>
                      <p className="text-xs text-muted-foreground">Strong alignment on product vision and phased delivery strategy; confirmed across multiple sessions including Nov 5 and Dec 1.</p>
                    </div>
                  </div>
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
              {/* Notice */}
              <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground mb-4">
                <Info className="h-4 w-4 shrink-0" />
                <span>Chat messages in shared content are not saved</span>
              </div>
              
              {/* Chat area - empty state */}
              <div className="flex-1" />
              
              {/* Input */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="How can I help?"
                    className="pr-12 rounded-full"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-primary"
                  >
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
                  Provide context to help Hedy understand this topic. These notes are included in AI interactions for sessions in this topic.
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
          )}
          </div>
        </main>
      </div>
      
      <MobileBottomNav />
    </div>
  );
};

export default TopicDetail;
