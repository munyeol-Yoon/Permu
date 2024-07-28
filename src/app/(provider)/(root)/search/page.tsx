'use client';

import { getRelatedSearchProducts } from '@/api/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchQuery } from '@/hooks/query';
import useRecentSearchTerms from '@/hooks/useRecentSearchTerms';
import { debounce } from 'lodash';
import Image from 'next/image';
import { useCallback, useState } from 'react';

const SearchPage = () => {
  const [search, setSearch] = useState<string>('');
  const [relatedSearches, setRelatedSearches] = useState<any[]>([]);
  const { data, error, isLoading, refetch } = useSearchQuery(search);
  const { recentSearchTerms, saveSearchTerm, deleteSearchTerm } = useRecentSearchTerms();

  // TODO : 인기 검색어 MVP 이후로 연기
  // TODO : 검색창에 입력시 현재 화면이 가려지며 검색된 결과가 실시간으로 리스트로 표시되어야함.
  // TODO : UI 작업
  // TODO : 검색 결과 페이지.

  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      console.log(`API 호출 : ${searchTerm}`);
      console.log(data);

      try {
        const relatedData = await getRelatedSearchProducts(searchTerm);
        setRelatedSearches(relatedData.data);
        console.log(relatedData.data);
      } catch (err) {
        console.error(err);
      }

      refetch();
    }, 1000),
    [refetch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSearchClick = () => {
    console.log(`검색 버튼 클릭 ${search}`);
    saveSearchTerm(search);
    refetch();
  };

  const handleDeleteClick = (term: string) => {
    deleteSearchTerm(term);
  };

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
      {/* <section>인기 검색어</section> 후순위 */}
      <section>
        <h2>관련 검색어 리스트</h2>
        {relatedSearches.map((item, index) => (
          <li key={index}>
            <span>{item.title}</span>
            <Image src={item.thumbNailURL} alt={item.title} width={50} height={50} />
          </li>
        ))}
      </section>
    </div>
  );
};

export default SearchPage;
