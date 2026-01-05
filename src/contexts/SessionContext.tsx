import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Session, SessionGroup } from '@/types/session';
import { sessionGroups as initialSessionGroups } from '@/data/sessions';

interface SessionContextType {
  sessionGroups: SessionGroup[];
  assignTopicToSession: (sessionId: string, topicId: string) => void;
  removeTopicFromSession: (sessionId: string) => void;
  getSessionById: (sessionId: string) => Session | undefined;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const STORAGE_KEY = 'hedy-session-topics';

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionGroups, setSessionGroups] = useState<SessionGroup[]>(() => {
    // Load saved topic assignments from localStorage
    const savedTopics = localStorage.getItem(STORAGE_KEY);
    if (savedTopics) {
      try {
        const topicMap: Record<string, string> = JSON.parse(savedTopics);
        return initialSessionGroups.map(group => ({
          ...group,
          sessions: group.sessions.map(session => ({
            ...session,
            topicId: topicMap[session.id] ?? session.topicId,
          })),
        }));
      } catch {
        return initialSessionGroups;
      }
    }
    return initialSessionGroups;
  });

  const assignTopicToSession = (sessionId: string, topicId: string) => {
    setSessionGroups(prev => {
      const updated = prev.map(group => ({
        ...group,
        sessions: group.sessions.map(session =>
          session.id === sessionId ? { ...session, topicId } : session
        ),
      }));

      // Save to localStorage
      const topicMap: Record<string, string> = {};
      updated.forEach(group => {
        group.sessions.forEach(session => {
          if (session.topicId) {
            topicMap[session.id] = session.topicId;
          }
        });
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(topicMap));

      return updated;
    });
  };

  const removeTopicFromSession = (sessionId: string) => {
    setSessionGroups(prev => {
      const updated = prev.map(group => ({
        ...group,
        sessions: group.sessions.map(session =>
          session.id === sessionId ? { ...session, topicId: undefined } : session
        ),
      }));

      // Save to localStorage
      const topicMap: Record<string, string> = {};
      updated.forEach(group => {
        group.sessions.forEach(session => {
          if (session.topicId) {
            topicMap[session.id] = session.topicId;
          }
        });
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(topicMap));

      return updated;
    });
  };

  const getSessionById = useMemo(() => (sessionId: string) => {
    for (const group of sessionGroups) {
      const session = group.sessions.find(s => s.id === sessionId);
      if (session) return session;
    }
    return undefined;
  }, [sessionGroups]);

  return (
    <SessionContext.Provider value={{ sessionGroups, assignTopicToSession, removeTopicFromSession, getSessionById }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessions() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSessions must be used within a SessionProvider');
  }
  return context;
}
