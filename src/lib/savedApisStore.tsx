import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useAppData } from '@/lib/data';

export interface SavedApi {
  id: string;
  api_name: string;
  api_url: string;
  description: string | null;
  auth_type: string;
  category: string | null;
  https: boolean;
  cors: string | null;
  saved_at: string;
}

const MOCK_SAVED: SavedApi[] = [
  {
    id: 'seed-1',
    api_name: 'REST Countries',
    api_url: 'https://restcountries.com',
    description: 'Get information about countries via a RESTful API.',
    auth_type: 'none',
    category: 'Countries',
    https: true,
    cors: 'yes',
    saved_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'seed-2',
    api_name: 'Dog CEO',
    api_url: 'https://dog.ceo/dog-api/',
    description: 'Vast collection of dog pictures, organized by breed.',
    auth_type: 'none',
    category: 'Animals',
    https: true,
    cors: 'yes',
    saved_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

interface SavedApisContextValue {
  savedApis: SavedApi[];
  isLoading: boolean;
  error: Error | null;
  isSaved: (apiUrl: string) => boolean;
  addSaved: (api: Omit<SavedApi, 'id' | 'saved_at'>) => void;
  removeSaved: (id: string) => void;
}

const SavedApisContext = createContext<SavedApisContextValue | null>(null);

export function SavedApisProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, error } = useAppData<SavedApi[]>({
    key: 'saved_apis',
    mock: MOCK_SAVED,
    fetchLive: async () => {
      throw new Error('not wired yet');
    },
  });

  const [savedApis, setSavedApis] = useState<SavedApi[]>(MOCK_SAVED);

  useEffect(() => {
    if (data) setSavedApis(data);
  }, [data]);

  const isSaved = (apiUrl: string) => savedApis.some((s) => s.api_url === apiUrl);

  const addSaved: SavedApisContextValue['addSaved'] = (api) => {
    setSavedApis((prev) => [
      { ...api, id: `local-${Date.now()}`, saved_at: new Date().toISOString() },
      ...prev,
    ]);
  };

  const removeSaved = (id: string) => {
    setSavedApis((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <SavedApisContext.Provider value={{ savedApis, isLoading, error: error as Error | null, isSaved, addSaved, removeSaved }}>
      {children}
    </SavedApisContext.Provider>
  );
}

export function useSavedApis() {
  const ctx = useContext(SavedApisContext);
  if (!ctx) throw new Error('useSavedApis must be used within SavedApisProvider');
  return ctx;
}
