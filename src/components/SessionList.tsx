import { SessionGroup, TopicBadgeInfo } from '@/types/session';
import { SessionCard } from './SessionCard';
import { ChevronUp, ChevronDown, ArrowDownUp, Check } from 'lucide-react';
import { useState } from 'react';
import { useTopics } from '@/contexts/TopicContext';
import { useSessions } from '@/contexts/SessionContext';
import { SessionSortOption, SESSION_SORT_OPTIONS } from './SessionsHeader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface SessionListProps {
  groups: SessionGroup[];
  selectedSessionId?: string | null;
  onSelectSession?: (id: string) => void;
  selectionMode?: boolean;
  selectedIds?: Set<string>;
  onCheckChange?: (id: string, checked: boolean) => void;
  sortBy?: SessionSortOption;
  onSortChange?: (sort: SessionSortOption) => void;
}

export function SessionList({ 
  groups, 
  selectedSessionId, 
  onSelectSession,
  selectionMode,
  selectedIds,
  onCheckChange,
  sortBy = 'most-recent',
  onSortChange
}: SessionListProps) {
  const { getTopicById } = useTopics();
  const { assignTopicToSession } = useSessions();
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const currentSortLabel = SESSION_SORT_OPTIONS.find(opt => opt.value === sortBy)?.label || 'Most Recent';

  const toggleGroup = (date: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  };

  const handleAssignTopic = (sessionId: string, topicId: string) => {
    assignTopicToSession(sessionId, topicId);
  };

  return (
    <div className="space-y-6">
      {/* Sort dropdown - left justified, smaller */}
      {onSortChange && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-smooth mb-2">
              <ArrowDownUp className="h-3 w-3" />
              {currentSortLabel}
              <ChevronDown className="h-2.5 w-2.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            {SESSION_SORT_OPTIONS.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className="flex items-center justify-between cursor-pointer text-xs"
              >
                <span>{option.label}</span>
                {sortBy === option.value && <Check className="h-3 w-3 text-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      {groups.map((group) => {
        const isCollapsed = collapsedGroups.has(group.date);
        return (
          <div key={group.date} className="animate-fade-in rounded-xl border border-border bg-card overflow-hidden">
            {/* Date Group Header */}
            <button 
              onClick={() => toggleGroup(group.date)}
              className="flex w-full items-center justify-between p-4 hover:bg-muted/30 transition-smooth"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">{group.date}</span>
              </div>
              {isCollapsed ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            
            {/* Group Content */}
            {!isCollapsed && (
              <div className="space-y-3 p-4 pt-0">
                {group.sessions.map((session) => {
                  // Get topic badge info if session is linked to a topic
                  let topicBadge: TopicBadgeInfo | undefined;
                  if (session.topicId) {
                    const topic = getTopicById(session.topicId);
                    if (topic) {
                      topicBadge = {
                        icon: topic.icon,
                        label: topic.name,
                        wallpaper: topic.wallpaper,
                      };
                    }
                  }
                  
                  return (
                    <SessionCard 
                      key={session.id} 
                      session={session} 
                      isSelected={selectedSessionId === session.id}
                      onSelect={onSelectSession}
                      selectionMode={selectionMode}
                      isChecked={selectedIds?.has(session.id)}
                      onCheckChange={onCheckChange}
                      topicBadge={topicBadge}
                      onAssignTopic={handleAssignTopic}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
