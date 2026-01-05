import { createContext, useContext, useState, ReactNode } from 'react';
import { Topic, topics as initialTopics } from '@/data/topics';

interface TopicContextType {
  topics: Topic[];
  updateTopicWallpaper: (topicId: string, wallpaper: Topic['wallpaper']) => void;
  getTopicById: (topicId: string) => Topic | undefined;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

const STORAGE_KEY = 'hedy-topic-wallpapers';

export function TopicProvider({ children }: { children: ReactNode }) {
  const [topics, setTopics] = useState<Topic[]>(() => {
    // Load saved wallpapers from localStorage
    const savedWallpapers = localStorage.getItem(STORAGE_KEY);
    if (savedWallpapers) {
      const wallpaperMap: Record<string, Topic['wallpaper']> = JSON.parse(savedWallpapers);
      return initialTopics.map(topic => ({
        ...topic,
        wallpaper: wallpaperMap[topic.id] || topic.wallpaper,
      }));
    }
    return initialTopics;
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

  const getTopicById = (topicId: string) => {
    return topics.find(t => t.id === topicId);
  };

  return (
    <TopicContext.Provider value={{ topics, updateTopicWallpaper, getTopicById }}>
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
