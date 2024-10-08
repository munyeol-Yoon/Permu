import { useEffect, useState } from 'react';

type UseRecentSearchTerms = {
  recentSearchTerms: string[];
  saveSearchTerm: (term: string) => void;
  deleteSearchTerm: (term: string) => void;
  clearAllSearchTerms: () => void;
};

const useRecentSearchTerms = (): UseRecentSearchTerms => {
  const [recentSearchTerms, setRecentSearchTerms] = useState<string[]>([]);

  useEffect(() => {
    const storeTerms = JSON.parse(localStorage.getItem('recentSearchTerms') || '[]');
    setRecentSearchTerms(storeTerms);
  }, []);

  const saveSearchTerm = (term: string) => {
    if (term.trim() === '') return;

    const updatedTerms = [term, ...recentSearchTerms.filter((target) => target !== term)].slice(0, 10);
    localStorage.setItem('recentSearchTerms', JSON.stringify(updatedTerms));
    setRecentSearchTerms(updatedTerms);
  };

  const deleteSearchTerm = (term: string) => {
    const updateTerms = recentSearchTerms.filter((target) => target !== term);
    localStorage.setItem('recentSearchTerms', JSON.stringify(updateTerms));
    setRecentSearchTerms(updateTerms);
  };

  const clearAllSearchTerms = () => {
    localStorage.removeItem('recentSearchTerms');
    setRecentSearchTerms([]);
  };

  return { recentSearchTerms, saveSearchTerm, deleteSearchTerm, clearAllSearchTerms };
};

export default useRecentSearchTerms;
