import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ChevronDown, MoreVertical, Play, Pause, Sparkles, 
  Send, Wand2, Pencil, Copy, Download, Link2, UserPlus, Mail, 
  Calendar, Trash2, Share, Folder, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { topics } from '@/data/topics';

type SessionTab = 'details' | 'chat' | 'transcript';

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

const SessionDetail = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<SessionTab>('details');
  const [isPlaying, setIsPlaying] = useState(false);
  const [topicDropdownOpen, setTopicDropdownOpen] = useState(false);
  const [sessionTypeDropdownOpen, setSessionTypeDropdownOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('new');
  const [selectedSessionType, setSelectedSessionType] = useState('coaching');
  const [viewOriginal, setViewOriginal] = useState(false);
  const [contextEnabled, setContextEnabled] = useState(true);
  const [chatMessage, setChatMessage] = useState('');

  const selectedTopicData = topics.find(t => t.id === '2'); // "New" topic
  const selectedSessionTypeData = sessionTypes.find(t => t.id === selectedSessionType);

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && <Sidebar />}
      
      <div className="flex flex-1 flex-col overflow-hidden">
        {!isMobile && <Header />}
        
        <main className="flex flex-1 flex-col overflow-hidden pb-24 md:pb-0">
          {/* Session Header */}
          <div className="border-b border-border bg-card px-4 py-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              {/* Back button and Title */}
              <div className="mb-3 flex items-start gap-4">
                <button 
                  onClick={() => navigate('/')}
                  className="mt-1 rounded-lg p-1 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="flex-1 text-center text-lg font-semibold text-foreground md:text-xl">
                  Innovative Affordable Housing and Development Strategies (Ep. 27: Tour of "Atomic Orchard Experiment" (in Portland) // The Essential Housing Campaign)
                </h1>
              </div>

              {/* Meta info and dropdowns */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">Nov 4, 2025 4:58 PM • 12 minutes</span>
                
                <div className="flex items-center gap-2">
                  {/* Topic Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setTopicDropdownOpen(!topicDropdownOpen);
                        setSessionTypeDropdownOpen(false);
                        setMoreMenuOpen(false);
                      }}
                      className="flex items-center gap-2 rounded-lg border border-badge-workout bg-badge-workout-bg px-3 py-1.5 text-sm font-medium text-badge-workout transition-smooth hover:bg-badge-workout-bg/80"
                    >
                      📦 New
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                    {topicDropdownOpen && (
                      <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-border bg-card py-1 shadow-lg">
                        <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
                          <Folder className="h-4 w-4 text-muted-foreground" />
                          None
                        </button>
                        {topics.map(topic => (
                          <button 
                            key={topic.id}
                            onClick={() => {
                              setSelectedTopic(topic.id);
                              setTopicDropdownOpen(false);
                            }}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
                          >
                            <span>{topic.icon}</span>
                            {topic.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Session Type Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setSessionTypeDropdownOpen(!sessionTypeDropdownOpen);
                        setTopicDropdownOpen(false);
                        setMoreMenuOpen(false);
                      }}
                      className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-smooth hover:bg-muted"
                    >
                      ⚙️ {selectedSessionTypeData?.label}
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

                  {/* More Menu */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setMoreMenuOpen(!moreMenuOpen);
                        setTopicDropdownOpen(false);
                        setSessionTypeDropdownOpen(false);
                      }}
                      className="rounded-lg p-2 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                    {moreMenuOpen && (
                      <div className="absolute right-0 top-full z-50 mt-1 w-52 rounded-lg border border-border bg-card py-1 shadow-lg">
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted">
                          <Link2 className="h-4 w-4 text-muted-foreground" />
                          Copy link to session
                        </button>
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted">
                          <UserPlus className="h-4 w-4 text-muted-foreground" />
                          Invite to Session
                        </button>
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          Send Recap Email
                        </button>
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted">
                          <Pencil className="h-4 w-4 text-muted-foreground" />
                          Rename
                        </button>
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          Edit Date & Time
                        </button>
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted">
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                          Delete
                        </button>
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted">
                          <Share className="h-4 w-4 text-muted-foreground" />
                          Share All Data
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-4 flex justify-center">
                <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
                  {(['details', 'chat', 'transcript'] as const).map(tab => (
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
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <div className="mx-auto max-w-4xl">
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
                        'Review Gorilla Development\'s website and pro forma templates',
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

              {/* Chat Tab */}
              {activeTab === 'chat' && (
                <div className="flex h-[500px] flex-col">
                  {/* Context Toggle */}
                  <div className="mb-4 flex items-center justify-between rounded-lg border border-badge-workout-bg bg-badge-workout-bg/30 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-badge-workout" />
                      <div>
                        <p className="text-sm font-medium text-badge-workout">New</p>
                        <p className="text-xs text-badge-workout">This chat has context from all sessions in this topic.</p>
                      </div>
                    </div>
                    <Switch checked={contextEnabled} onCheckedChange={setContextEnabled} />
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 space-y-4 overflow-auto">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-muted px-4 py-3">
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

                  {/* Chat Input */}
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background p-2">
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
                    <Button variant="action" size="icon" className="h-9 w-9 rounded-full">
                      <Wand2 className="h-4 w-4" />
                    </Button>
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
          </div>

          {/* Audio Player */}
          <div className="border-t border-border bg-card px-4 py-3">
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
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default SessionDetail;
