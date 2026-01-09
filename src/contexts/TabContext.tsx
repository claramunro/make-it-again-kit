import React, { createContext, useContext, useState, ReactNode } from 'react';

type SessionTab = 'details' | 'highlights' | 'transcript' | 'settings' | 'chat';
type TopicTab = 'overview' | 'sessions' | 'highlights' | 'settings' | 'chat';
type TopicDetailSessionTab = 'details' | 'highlights' | 'transcript' | 'chat';
type HighlightsGroupBy = 'sessions' | 'topics';

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
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
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

  const handleSetHighlightsGroupBy = (groupBy: HighlightsGroupBy) => {
    setHighlightsGroupBy(groupBy);
    localStorage.setItem('highlights-group-by', groupBy);
  };

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
