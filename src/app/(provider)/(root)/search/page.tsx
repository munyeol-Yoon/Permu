'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useSearchQuery from '@/hooks/query/useSearchQuery';
import useRecentSearchTerms from '@/hooks/useRecentSearchTerms';
import { useEffect, useState } from 'react';

const SearchPage = () => {
  const [search, setSearch] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const { data, error, isLoading, refetch } = useSearchQuery(search, isEnabled);
  const { recentSearchTerms, saveSearchTerm } = useRecentSearchTerms();

  // TODO : 디바운싱 필요

  useEffect(() => {
    if (isEnabled) {
      refetch();
      setIsEnabled(false);
    }
  }, [isEnabled, refetch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    saveSearchTerm(search);
    setIsEnabled(true);
  };

  console.log(data);

  return (
    <div>
      <section className="flex justify-between items-center mb-4">
        <Button>{'<'}</Button>
        <h2 className="flew-grow text-center">검색</h2>
        <div className="w-10"></div>
      </section>
      <section className="flex justify-center items-center">
        <Input onChange={handleInputChange} value={search} />
        <Button onClick={handleSearchClick}>검색</Button>
      </section>
      <section>
        <h2>최근 검색어</h2>
        <ul>
          {recentSearchTerms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </section>
      <section>인기 검색어</section>
      <section>검색 결과 리스트</section>
    </div>
  );
};

export default SearchPage;
