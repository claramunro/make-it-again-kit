import { createContext, useContext, useState, ReactNode } from 'react';
import { Topic, topics as initialTopics } from '@/data/topics';

interface TopicContextType {
  topics: Topic[];
  updateTopicWallpaper: (topicId: string, wallpaper: Topic['wallpaper']) => void;
  updateTopic: (topicId: string, updates: Partial<Pick<Topic, 'name' | 'description' | 'icon'>>) => void;
  getTopicById: (topicId: string) => Topic | undefined;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

const STORAGE_KEY = 'hedy-topic-wallpapers';
const TOPIC_UPDATES_KEY = 'hedy-topic-updates';

export function TopicProvider({ children }: { children: ReactNode }) {
  // Always use initialTopics directly to ensure we have all session data
  const [topics, setTopics] = useState<Topic[]>(() => {
    // Load saved wallpapers from localStorage and merge with current topics data
    const savedWallpapers = localStorage.getItem(STORAGE_KEY);
    const savedUpdates = localStorage.getItem(TOPIC_UPDATES_KEY);
    
    let wallpaperMap: Record<string, Topic['wallpaper']> = {};
    let updatesMap: Record<string, Partial<Pick<Topic, 'name' | 'description' | 'icon'>>> = {};
    
    if (savedWallpapers) {
      try {
        wallpaperMap = JSON.parse(savedWallpapers);
      } catch {
        // ignore
      }
    }
    
    if (savedUpdates) {
      try {
        updatesMap = JSON.parse(savedUpdates);
      } catch {
        // ignore
      }
    }
    
    return initialTopics.map(topic => ({
      ...topic,
      wallpaper: wallpaperMap[topic.id] || topic.wallpaper,
      ...(updatesMap[topic.id] || {}),
    }));
  });

  const updateTopicWallpaper = (topicId: string, wallpaper: Topic['wallpaper']) => {
    setTopics(prev => {
      const updated = prev.map(topic =>
        topic.id === topicId ? { ...topic, wallpaper } : topic
      );
      
      // Save to localStorage
      const wallpaperMap: Record<string, Topic['wallpaper']> = {};
      updated.forEach(t => {
        if (t.wallpaper) wallpaperMap[t.id] = t.wallpaper;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wallpaperMap));
      
      return updated;
    });
  };

  const updateTopic = (topicId: string, updates: Partial<Pick<Topic, 'name' | 'description' | 'icon'>>) => {
    setTopics(prev => {
      const updated = prev.map(topic =>
        topic.id === topicId ? { ...topic, ...updates } : topic
      );
      
      // Save updates to localStorage
      const savedUpdates = localStorage.getItem(TOPIC_UPDATES_KEY);
      let updatesMap: Record<string, Partial<Pick<Topic, 'name' | 'description' | 'icon'>>> = {};
      if (savedUpdates) {
        try {
          updatesMap = JSON.parse(savedUpdates);
        } catch {
          // ignore
        }
      }
      updatesMap[topicId] = { ...(updatesMap[topicId] || {}), ...updates };
      localStorage.setItem(TOPIC_UPDATES_KEY, JSON.stringify(updatesMap));
      
      return updated;
    });
  };

  const getTopicById = (topicId: string) => {
    return topics.find(t => t.id === topicId);
  };

  return (
    <TopicContext.Provider value={{ topics, updateTopicWallpaper, updateTopic, getTopicById }}>
      {children}
    </TopicContext.Provider>
  );
}

export function useTopics() {
  const context = useContext(TopicContext);
  if (context === undefined) {
    throw new Error('useTopics must be used within a TopicProvider');
  }
  return context;
}
