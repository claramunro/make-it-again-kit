import React, { createContext, useContext, useState, ReactNode } from 'react';

type SessionTab = 'details' | 'highlights' | 'transcript' | 'settings' | 'chat';
type TopicTab = 'overview' | 'sessions' | 'highlights' | 'settings';

interface TabContextType {
  // Session detail tabs
  sessionDetailTab: SessionTab;
  setSessionDetailTab: (tab: SessionTab) => void;
  
  // Topic detail tabs  
  topicDetailTab: TopicTab;
  setTopicDetailTab: (tab: TopicTab) => void;
  
  // Session sub-tab within Topic's Sessions tab
  topicSessionSubTab: SessionTab;
  setTopicSessionSubTab: (tab: SessionTab) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [sessionDetailTab, setSessionDetailTab] = useState<SessionTab>('details');
  const [topicDetailTab, setTopicDetailTab] = useState<TopicTab>('overview');
  const [topicSessionSubTab, setTopicSessionSubTab] = useState<SessionTab>('details');

  return (
    <TabContext.Provider value={{
      sessionDetailTab,
      setSessionDetailTab,
      topicDetailTab,
      setTopicDetailTab,
      topicSessionSubTab,
      setTopicSessionSubTab,
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
