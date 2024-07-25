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
  const { recentSearchTerms, saveSearchTerm, deleteSearchTerm } = useRecentSearchTerms();

  // TODO : 디바운싱 필요
  // TODO : 인기 검색어
  // TODO : 검색창에 입력시 현재 화면이 가려지며 검색된 결과가 실시간으로 리스트로 표시되어야함. 이부분 논의 필요.
  // TODO : 검색 결과 페이지.

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

  const handleDeleteClick = (term: string) => {
    deleteSearchTerm(term);
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
            <li key={index}>
              <span>{term}</span>
              <Button onClick={() => handleDeleteClick(term)}>X</Button>
            </li>
          ))}
        </ul>
      </section>
      <section>인기 검색어</section>
      <section>검색 결과 리스트</section>
    </div>
  );
};

export default SearchPage;
