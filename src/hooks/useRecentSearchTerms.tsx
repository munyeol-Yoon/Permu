import { useEffect, useState } from 'react';

type UseRecentSearchTerms = {
  recentSearchTerms: string[];
  saveSearchTerm: (term: string) => void;
  deleteSearchTerm: (term: string) => void;
};

const useRecentSearchTerms = (): UseRecentSearchTerms => {
  const [recentSearchTerms, setRecentSearchTerms] = useState<string[]>([]);

  useEffect(() => {
    const storeTerms = JSON.parse(localStorage.getItem('recentSearchTerms') || '[]');
    setRecentSearchTerms(storeTerms);
  }, []);

  const saveSearchTerm = (term: string) => {
    const updatedTerms = [term, ...recentSearchTerms.filter((target) => target !== term)].slice(0, 10);
    localStorage.setItem('recentSearchTerms', JSON.stringify(updatedTerms));
    setRecentSearchTerms(updatedTerms);
  };

  const deleteSearchTerm = (term: string) => {
    const updateTerms = recentSearchTerms.filter((target) => target !== term);
    localStorage.setItem('recentSearchTerms', JSON.stringify(updateTerms));
    setRecentSearchTerms(updateTerms);
  };

  return { recentSearchTerms, saveSearchTerm, deleteSearchTerm };
};

export default useRecentSearchTerms;
