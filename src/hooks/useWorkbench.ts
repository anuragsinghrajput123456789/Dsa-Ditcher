'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { IWorkbenchData, IAlgorithmStep, IAIReviewResponse } from '@/types';
import { api } from '@/lib/api';
import { toast } from 'sonner';

const LOCAL_STORAGE_KEY = 'algospark_workbench_data';

const defaultWorkbench: IWorkbenchData = {
  problemTitle: 'Two Sum (LeetCode #1)',
  problemDifficulty: 'Easy',
  problemDescription: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\nOnly one valid answer exists.',
  examples: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]',
  approachText: 'I will use a hashmap to store the complement of each number as I iterate through the array. For each element, I check if the target minus current element already exists in the map.',
  algorithmSteps: [
    { id: '1', stepNumber: 1, title: 'Initialize Map', explanation: 'Create an empty hashmap to store visited value -> index mappings.' },
    { id: '2', stepNumber: 2, title: 'Traverse Array', explanation: 'Loop through array elements using index i from 0 to n-1.' },
    { id: '3', stepNumber: 3, title: 'Compute Complement', explanation: 'Calculate complement = target - nums[i].' },
    { id: '4', stepNumber: 4, title: 'Check Map', explanation: 'If complement exists in map, return [map.get(complement), i].' },
    { id: '5', stepNumber: 5, title: 'Store Index', explanation: 'Store map[nums[i]] = i and continue loop.' },
  ],
  pseudocode: `START
    create map seen
    FOR i = 0 TO nums.length - 1
        complement = target - nums[i]
        IF complement IN seen THEN
            RETURN [seen[complement], i]
        END IF
        seen[nums[i]] = i
    END FOR
END`,
  diagramData: {
    nodes: [
      { id: 'n1', type: 'array', label: 'nums = [2, 7, 11, 15]', x: 60, y: 80, width: 260, height: 60 },
      { id: 'n2', type: 'hashmap', label: 'Map: { 2:0, 7:1 }', x: 360, y: 80, width: 220, height: 80 },
    ],
    lines: [
      { id: 'l1', from: 'n1', to: 'n2', label: 'Lookup Complement (9 - 7 = 2)' }
    ]
  },
  aiReview: null,
  complexityAnalysis: null,
  generatedCode: {
    language: 'javascript',
    code: '',
  },
};

export function useWorkbench() {
  const [data, setData] = useState<IWorkbenchData>(defaultWorkbench);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | 'idle'>('idle');
  const [activeTab, setActiveTab] = useState<string>('approach');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // History stack for Undo/Redo
  const historyRef = useRef<IWorkbenchData[]>([]);
  const historyIndexRef = useRef<number>(-1);

  const pushHistory = useCallback((newState: IWorkbenchData) => {
    const history = historyRef.current.slice(0, historyIndexRef.current + 1);
    history.push(JSON.parse(JSON.stringify(newState)));
    historyRef.current = history.slice(-20); // Keep max 20 states
    historyIndexRef.current = historyRef.current.length - 1;
  }, []);

  // Initial Load from API / localStorage
  useEffect(() => {
    const loadWorkbench = async () => {
      try {
        const fetched = await api.get<IWorkbenchData | null>('/api/workbench');
        if (fetched && fetched.problemTitle) {
          setData(fetched);
          pushHistory(fetched);
          setSaveStatus('saved');
          return;
        }
      } catch (e) {
        // Fallback to local storage for guests
      }

      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setData(parsed);
          pushHistory(parsed);
          setSaveStatus('saved');
          return;
        } catch (e) {
          // Ignore
        }
      }

      pushHistory(defaultWorkbench);
    };

    loadWorkbench();
  }, [pushHistory]);

  // Debounced Autosave Effect
  useEffect(() => {
    setSaveStatus('saving');
    const timer = setTimeout(async () => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        await api.post('/api/workbench', data).catch(() => {});
        setSaveStatus('saved');
      } catch (e) {
        setSaveStatus('error');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [data]);

  const updateData = useCallback((updater: Partial<IWorkbenchData> | ((prev: IWorkbenchData) => IWorkbenchData)) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const handleUndo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      const restored = historyRef.current[historyIndexRef.current];
      setData(JSON.parse(JSON.stringify(restored)));
      toast.info("Undo performed");
    }
  }, []);

  const handleRedo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      const restored = historyRef.current[historyIndexRef.current];
      setData(JSON.parse(JSON.stringify(restored)));
      toast.info("Redo performed");
    }
  }, []);

  const handleManualSave = useCallback(async () => {
    setSaveStatus('saving');
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      await api.post('/api/workbench', data);
      setSaveStatus('saved');
      toast.success("Workbench saved successfully!");
    } catch (e) {
      setSaveStatus('saved'); // Saved locally
      toast.success("Saved to local storage.");
    }
  }, [data]);

  const handleReset = useCallback(() => {
    setData(defaultWorkbench);
    pushHistory(defaultWorkbench);
    toast.info("Workbench reset to initial template.");
  }, [pushHistory]);

  return {
    data,
    updateData,
    saveStatus,
    activeTab,
    setActiveTab,
    isAiLoading,
    setIsAiLoading,
    handleUndo,
    handleRedo,
    handleManualSave,
    handleReset,
  };
}
export default useWorkbench;
