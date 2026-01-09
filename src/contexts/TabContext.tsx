import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type SessionTab = 'details' | 'highlights' | 'transcript' | 'settings' | 'chat';
type TopicTab = 'overview' | 'sessions' | 'highlights' | 'settings' | 'chat';
type TopicDetailSessionTab = 'details' | 'highlights' | 'transcript' | 'chat';
type HighlightsGroupBy = 'sessions' | 'topics';

type NavSection = 'sessions' | 'topics' | 'highlights';

type SectionPathState = {
  sessions: string;
  topics: string;
  highlights: string;
};

interface TabContextType {
  // Session detail tabs (standalone page and SessionDetailPanel)
  sessionDetailTab: SessionTab;
  setSessionDetailTab: (tab: SessionTab) => void;

  // Topic detail tabs (TopicDetailPanel and TopicDetail page)
  topicDetailTab: TopicTab;
  setTopicDetailTab: (tab: TopicTab) => void;

  // Session sub-tab within Topic's Sessions tab
  topicSessionSubTab: TopicDetailSessionTab;
  setTopicSessionSubTab: (tab: TopicDetailSessionTab) => void;

  // Highlights page groupBy
  highlightsGroupBy: HighlightsGroupBy;
  setHighlightsGroupBy: (groupBy: HighlightsGroupBy) => void;

  // Selected highlight ID persistence (Highlights page)
  selectedHighlightId: string | null;
  setSelectedHighlightId: (id: string | null) => void;

  // Session Detail page -> Highlights tab selected highlight
  sessionHighlightId: string | null;
  setSessionHighlightId: (id: string | null) => void;

  // Topic Detail page -> Highlights tab selected highlight
  topicHighlightId: string | null;
  setTopicHighlightId: (id: string | null) => void;

  // Topic Detail page -> Sessions tab -> Session -> Highlights sub-tab
  topicSessionHighlightId: string | null;
  setTopicSessionHighlightId: (id: string | null) => void;

  // Topic Detail page -> Sessions tab -> Selected session ID
  topicSelectedSessionId: string | null;
  setTopicSelectedSessionId: (id: string | null) => void;

  // "Return me to where I was" navigation targets for left-nav
  getNavPath: (section: NavSection) => string;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

const SECTION_PATHS_STORAGE_KEY = 'nav-last-paths';
const SELECTED_HIGHLIGHT_KEY = 'highlights-selected-id';
const SESSION_HIGHLIGHT_KEY = 'session-highlight-id';
const TOPIC_HIGHLIGHT_KEY = 'topic-highlight-id';
const TOPIC_SESSION_HIGHLIGHT_KEY = 'topic-session-highlight-id';
const TOPIC_SELECTED_SESSION_KEY = 'topic-selected-session-id';

function loadSavedSectionPaths(): SectionPathState {
  if (typeof window === 'undefined') return { sessions: '/', topics: '/topics', highlights: '/highlights' };

  try {
    const raw = localStorage.getItem(SECTION_PATHS_STORAGE_KEY);
    if (!raw) return { sessions: '/', topics: '/topics', highlights: '/highlights' };
    const parsed = JSON.parse(raw) as Partial<SectionPathState>;
    return {
      sessions: typeof parsed.sessions === 'string' ? parsed.sessions : '/',
      topics: typeof parsed.topics === 'string' ? parsed.topics : '/topics',
      highlights: typeof parsed.highlights === 'string' ? parsed.highlights : '/highlights',
    };
  } catch {
    return { sessions: '/', topics: '/topics', highlights: '/highlights' };
  }
}

export function TabProvider({ children }: { children: ReactNode }) {
  const location = useLocation();

  const [sessionDetailTab, setSessionDetailTab] = useState<SessionTab>('details');
  const [topicDetailTab, setTopicDetailTab] = useState<TopicTab>('overview');
  const [topicSessionSubTab, setTopicSessionSubTab] = useState<TopicDetailSessionTab>('details');

  const [highlightsGroupBy, setHighlightsGroupBy] = useState<HighlightsGroupBy>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('highlights-group-by');
      return (saved === 'sessions' || saved === 'topics') ? saved : 'sessions';
    }
    return 'sessions';
  });

  const [selectedHighlightId, setSelectedHighlightIdState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(SELECTED_HIGHLIGHT_KEY) || null;
    }
    return null;
  });

  const setSelectedHighlightId = (id: string | null) => {
    setSelectedHighlightIdState(id);
    if (typeof window !== 'undefined') {
      if (id) {
        localStorage.setItem(SELECTED_HIGHLIGHT_KEY, id);
      } else {
        localStorage.removeItem(SELECTED_HIGHLIGHT_KEY);
      }
    }
  };

  // Session Detail -> Highlights tab
  const [sessionHighlightId, setSessionHighlightIdState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(SESSION_HIGHLIGHT_KEY) || null;
    }
    return null;
  });

  const setSessionHighlightId = (id: string | null) => {
    setSessionHighlightIdState(id);
    if (typeof window !== 'undefined') {
      if (id) {
        localStorage.setItem(SESSION_HIGHLIGHT_KEY, id);
      } else {
        localStorage.removeItem(SESSION_HIGHLIGHT_KEY);
      }
    }
  };

  // Topic Detail -> Highlights tab
  const [topicHighlightId, setTopicHighlightIdState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOPIC_HIGHLIGHT_KEY) || null;
    }
    return null;
  });

  const setTopicHighlightId = (id: string | null) => {
    setTopicHighlightIdState(id);
    if (typeof window !== 'undefined') {
      if (id) {
        localStorage.setItem(TOPIC_HIGHLIGHT_KEY, id);
      } else {
        localStorage.removeItem(TOPIC_HIGHLIGHT_KEY);
      }
    }
  };

  // Topic Detail -> Sessions tab -> Session -> Highlights sub-tab
  const [topicSessionHighlightId, setTopicSessionHighlightIdState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOPIC_SESSION_HIGHLIGHT_KEY) || null;
    }
    return null;
  });

  const setTopicSessionHighlightId = (id: string | null) => {
    setTopicSessionHighlightIdState(id);
    if (typeof window !== 'undefined') {
      if (id) {
        localStorage.setItem(TOPIC_SESSION_HIGHLIGHT_KEY, id);
      } else {
        localStorage.removeItem(TOPIC_SESSION_HIGHLIGHT_KEY);
      }
    }
  };

  // Topic Detail -> Sessions tab -> Selected session ID
  const [topicSelectedSessionId, setTopicSelectedSessionIdState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOPIC_SELECTED_SESSION_KEY) || null;
    }
    return null;
  });

  const setTopicSelectedSessionId = (id: string | null) => {
    setTopicSelectedSessionIdState(id);
    if (typeof window !== 'undefined') {
      if (id) {
        localStorage.setItem(TOPIC_SELECTED_SESSION_KEY, id);
      } else {
        localStorage.removeItem(TOPIC_SELECTED_SESSION_KEY);
      }
    }
  };

  const [sectionPaths, setSectionPaths] = useState<SectionPathState>(() => loadSavedSectionPaths());

  // Track the last "meaningful" route within each nav section so clicking the left-nav returns you there.
  useEffect(() => {
    const path = location.pathname;

    setSectionPaths((prev) => {
      let next = prev;

      // Sessions section
      if (path === '/' || path.startsWith('/session/')) {
        // Prefer persisting detail pages; but if user is on '/', keep '/' as a safe fallback.
        next = {
          ...next,
          sessions: path.startsWith('/session/') ? path : next.sessions || '/',
        };
      }

      // Topics section
      if (path === '/topics' || path.startsWith('/topic/')) {
        next = {
          ...next,
          topics: path.startsWith('/topic/') ? path : next.topics || '/topics',
        };
      }

      // Highlights section
      if (path === '/highlights') {
        next = { ...next, highlights: '/highlights' };
      }

      if (next !== prev && typeof window !== 'undefined') {
        try {
          localStorage.setItem(SECTION_PATHS_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
      }

      return next;
    });
  }, [location.pathname]);

  const handleSetHighlightsGroupBy = (groupBy: HighlightsGroupBy) => {
    setHighlightsGroupBy(groupBy);
    localStorage.setItem('highlights-group-by', groupBy);
  };

  const getNavPath = useMemo(() => {
    return (section: NavSection) => {
      if (section === 'sessions') return sectionPaths.sessions || '/';
      if (section === 'topics') return sectionPaths.topics || '/topics';
      return sectionPaths.highlights || '/highlights';
    };
  }, [sectionPaths]);

  return (
    <TabContext.Provider value={{
      sessionDetailTab,
      setSessionDetailTab,
      topicDetailTab,
      setTopicDetailTab,
      topicSessionSubTab,
      setTopicSessionSubTab,
      highlightsGroupBy,
      setHighlightsGroupBy: handleSetHighlightsGroupBy,
      selectedHighlightId,
      setSelectedHighlightId,
      sessionHighlightId,
      setSessionHighlightId,
      topicHighlightId,
      setTopicHighlightId,
      topicSessionHighlightId,
      setTopicSessionHighlightId,
      topicSelectedSessionId,
      setTopicSelectedSessionId,
      getNavPath,
    }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabContext() {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
}

