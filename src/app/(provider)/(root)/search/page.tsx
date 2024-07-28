'use client';

import { getRelatedSearchProducts } from '@/api/product';
import { useSearchQuery } from '@/hooks/query';
import useRecentSearchTerms from '@/hooks/useRecentSearchTerms';
import SearchButtonSVG from '@@/public/searchButton.svg';
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
        setRelatedSearches(relatedData.data || []);
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

  const handleClearClick = () => {
    setSearch('');
    debouncedSearch.cancel();
  };

  return (
    <div>
      <section className="flex justify-center items-center self-stretch">
        {/* <Input onChange={handleInputChange} value={search} className="flex justify-between items-center" />
        <Button onClick={handleSearchClick}>검색</Button> */}
        <div className="relative w-full ml-11 mr-11">
          <input
            type="text"
            placeholder="여름 시즌 추천템 20% 할인"
            className="rounded-[4px] bg-[#b3b3b320] w-full px-2.5 py-0 pr-[60px] h-[42px]"
            onChange={handleInputChange}
            value={search}
          />
          {search && (
            <button
              onClick={handleClearClick}
              className="absolute right-[50px] top-1/2 transform -translate-y-1/2 px-2.5 py-1 rounded-full w-6 h-6 text-white bg-gray-400 flex items-center justify-center"
            >
              X
            </button>
          )}
          <button onClick={handleSearchClick} className="absolute right-0 top-0 bottom-0 px-3 py-1">
            <SearchButtonSVG />
          </button>
        </div>
      </section>
      <section className="flex justify-between items-center self-stretch h-[64px] px-[50px] py-0">
        <h2>최근 검색어</h2>
        <h2 className="text-gray-300">모두 삭제</h2>
      </section>
      {recentSearchTerms.length > 0 ? (
        <section className="flex flex-wrap justify-between items-center self-stretch h-[56px] px-[50px] py-0 gap-[8px]">
          <ul className="flex flex-wrap gap-[10px]">
            {recentSearchTerms.map((term, index) => (
              <li
                key={index}
                className="flex h-[32px] py-0 px-[16px] justify-center items-center gap-[10px] rounded-sm border border-gray-300 bg-white text-gray-400"
              >
                <span>{term}</span>
                <button onClick={() => handleDeleteClick(term)}>X</button>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        ''
      )}
      <section>
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
