import { SessionGroup, TopicBadgeInfo } from '@/types/session';
import { SessionCard } from './SessionCard';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useTopics } from '@/contexts/TopicContext';

interface SessionListProps {
  groups: SessionGroup[];
  selectedSessionId?: string | null;
  onSelectSession?: (id: string) => void;
  selectionMode?: boolean;
  selectedIds?: Set<string>;
  onCheckChange?: (id: string, checked: boolean) => void;
}

export function SessionList({ 
  groups, 
  selectedSessionId, 
  onSelectSession,
  selectionMode,
  selectedIds,
  onCheckChange
}: SessionListProps) {
  const { getTopicById } = useTopics();
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

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

  return (
    <div className="space-y-6">
      {groups.map((group) => {
        const isCollapsed = collapsedGroups.has(group.date);
        return (
          <div key={group.date} className="animate-fade-in">
            <button 
              onClick={() => toggleGroup(group.date)}
              className="mb-3 flex w-full items-center justify-between text-sm font-medium text-foreground hover:text-foreground/80"
            >
              <span>{group.date}</span>
              {isCollapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
            {!isCollapsed && (
              <div className="space-y-3">
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
