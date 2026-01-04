import { useState, useEffect, useRef } from 'react';
import { Search, X, Mic, Folder, Star } from 'lucide-react';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

// Mock search results data
const mockSessions = [
  { id: '1', title: 'Team Meeting - Q4 Planning', time: '2 hours ago' },
  { id: '2', title: 'Client Call with Marketing Team', time: 'Yesterday' },
  { id: '3', title: 'Product Roadmap Discussion', time: '3 days ago' },
];

const mockTopics = [
  { id: '1', name: 'Product Development', sessions: 12 },
  { id: '2', name: 'Marketing Strategy', sessions: 8 },
  { id: '3', name: 'Team Planning', sessions: 5 },
];

const mockHighlights = [
  { id: '1', title: 'Increase marketing budget by 20%', source: 'From Team Meeting' },
];

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Clear search when closing
  useEffect(() => {
    if (!open) {
      setSearchValue('');
    }
  }, [open]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const hasResults = searchValue.length > 0;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/20 backdrop-blur-sm pt-[15vh]"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search sessions, topics, highlights..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={`h-14 w-full bg-card pl-14 pr-14 text-lg placeholder:text-muted-foreground focus:outline-none ${
              hasResults ? 'rounded-t-2xl border border-b-0 border-border' : 'rounded-2xl border border-border shadow-lg'
            }`}
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Search Results */}
        {hasResults && (
          <div className="rounded-b-2xl border border-t-0 border-border bg-card shadow-lg">
            <div className="max-h-[50vh] overflow-auto p-3">
              {/* Sessions Section */}
              <div className="mb-3">
                <h3 className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Sessions</h3>
                {mockSessions.map((session) => (
                  <button
                    key={session.id}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-muted transition-smooth"
                    onClick={onClose}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Mic className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {session.title.split(new RegExp(`(${searchValue})`, 'gi')).map((part, i) => 
                          part.toLowerCase() === searchValue.toLowerCase() ? 
                            <mark key={i} className="bg-primary/20 text-foreground rounded">{part}</mark> : part
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{session.time}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Topics Section */}
              <div className="mb-3">
                <h3 className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Topics</h3>
                {mockTopics.map((topic) => (
                  <button
                    key={topic.id}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-muted transition-smooth"
                    onClick={onClose}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Folder className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {topic.name.split(new RegExp(`(${searchValue})`, 'gi')).map((part, i) => 
                          part.toLowerCase() === searchValue.toLowerCase() ? 
                            <mark key={i} className="bg-primary/20 text-foreground rounded">{part}</mark> : part
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{topic.sessions} sessions</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Highlights Section */}
              <div>
                <h3 className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Highlights</h3>
                {mockHighlights.map((highlight) => (
                  <button
                    key={highlight.id}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-muted transition-smooth"
                    onClick={onClose}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {highlight.title.split(new RegExp(`(${searchValue})`, 'gi')).map((part, i) => 
                          part.toLowerCase() === searchValue.toLowerCase() ? 
                            <mark key={i} className="bg-primary/20 text-foreground rounded">{part}</mark> : part
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{highlight.source}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer hint */}
            <div className="border-t border-border px-4 py-3 text-center text-xs text-muted-foreground">
              Press <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Esc</kbd> to close
            </div>
          </div>
        )}
      </div>
    </div>
  );
}