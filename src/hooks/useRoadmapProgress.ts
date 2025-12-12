import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'dsa-roadmap-progress';

interface ProgressState {
  completedTopics: string[];
  lastUpdated: string;
}

export const useRoadmapProgress = () => {
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: ProgressState = JSON.parse(stored);
        setCompletedTopics(new Set(parsed.completedTopics));
      }
    } catch (error) {
      console.error('Failed to load roadmap progress:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever completedTopics changes
  useEffect(() => {
    if (!isLoaded) return;
    
    try {
      const state: ProgressState = {
        completedTopics: Array.from(completedTopics),
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save roadmap progress:', error);
    }
  }, [completedTopics, isLoaded]);

  const toggleComplete = useCallback((topicId: string) => {
    setCompletedTopics(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  }, []);

  const isCompleted = useCallback((topicId: string) => {
    return completedTopics.has(topicId);
  }, [completedTopics]);

  const getProgress = useCallback(() => {
    return {
      completed: completedTopics.size,
      total: 0, // Will be set by component that knows total
    };
  }, [completedTopics]);

  const resetProgress = useCallback(() => {
    setCompletedTopics(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    completedTopics,
    toggleComplete,
    isCompleted,
    getProgress,
    resetProgress,
    isLoaded,
  };
};
