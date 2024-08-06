'use client';

import RecentSearch from '@/components/SearchPage/RecentSearch';
import SearchInput from '@/components/SearchPage/SearchInput';
import { CATEGORY_SEARCH_RESULT_PATHNAME } from '@/constant/pathname';
import useRelatedSearchQuery from '@/hooks/query/useRelatedSearchQuery';
import useRecentSearchTerms from '@/hooks/useRecentSearchTerms';
import { debounce } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const SearchPage = () => {
  const [search, setSearch] = useState<string>('');
  const { data: relatedSearches = [], refetch } = useRelatedSearchQuery(search);
  const { recentSearchTerms, saveSearchTerm, deleteSearchTerm, clearAllSearchTerms } = useRecentSearchTerms();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // TODO : 인기 검색어 MVP 이후로 연기
  // TODO : 연관 키워드 MVP 이후로 연기
  // TODO : UI 작업
  // TODO : 컴포넌트 분리 작업 필요
  // TODO : 검색 결과 페이지.

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      refetch();
    }, 1000),
    [refetch]
  );

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    console.log(`검색 버튼 클릭 ${search}`);
    saveSearchTerm(search);
  };

  const handleDeleteClick = (term: string) => {
    deleteSearchTerm(term);
  };

  const handleClearClick = () => {
    setSearch('');
    debouncedSearch.cancel();
  };

  const handleClearAllTermsClick = () => {
    clearAllSearchTerms();
  };

  return (
    <div>
      <section className="flex justify-center items-center self-stretch">
        {/* <Input onChange={handleInputChange} value={search} className="flex justify-between items-center" />
        <Button onClick={handleSearchClick}>검색</Button> */}
        <SearchInput
          search={search}
          handleInputChange={handleInputChange}
          handleSearchClick={handleSearchClick}
          handleClearClick={handleClearClick}
          ref={searchInputRef}
        />
      </section>
      {!search && (
        <RecentSearch
          recentSearchTerms={recentSearchTerms}
          handleDeleteClick={handleDeleteClick}
          handleClearAllTermsClick={handleClearAllTermsClick}
        />
      )}

      {/* 
      상단 정확히 일치하는 제품 -> 바로가기가 있어야함

      중단 검색결과가 포함되어 있는 카테고리 -> 바로가기 X
       */}

      {/* 이름이 정확히 일치하는 제품 오직 하나만! */}
      {search &&
        relatedSearches
          .filter((item: RelatedSearchProduct) => item.title === search)
          .slice(0, 1)
          .map((item: RelatedSearchProduct, index) => (
            <section
              key={index}
              className="flex justify-between items-center self-stretch h-[64px] px-[50px] py-0 border-b border-gray-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative overflow-hidden rounded-full">
                  <Image src={item.thumbNailURL} alt={item.title} layout="fill" className="object-cover" />
                </div>
                <div>
                  <span>{item.title}</span>
                </div>
              </div>
              <div>
                <Link href={`/products/${item.productId}`}>
                  <button className="text-gray-300">바로가기</button>
                </Link>
              </div>
            </section>
          ))}

      {/* 검색결과가 포함되어 있는 카테고리 */}
      {search &&
        relatedSearches
          .filter((item: RelatedSearchProduct) => item.Categories)
          .slice(0, 1)
          .map((item: RelatedSearchProduct, index) => (
            <section
              key={index}
              className="flex justify-between items-center self-stretch h-[64px] px-[50px] py-0 border-b border-gray-300"
            >
              <Link href={`${CATEGORY_SEARCH_RESULT_PATHNAME}?categoryId=${item.Categories?.categoryId}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 relative overflow-hidden rounded-full">
                    <Image src={item.thumbNailURL} alt={item.title} layout="fill" className="object-cover" />
                  </div>
                  <div>
                    <span>{item.title}</span>
                    <div className="text-gray-500">
                      <span>
                        {item.Categories?.categoryTitle}
                        {item.Categories?.categorySubTitle && ' > ' + item.Categories.categorySubTitle}
                        {item.Categories?.categoryMainTitle && ' > ' + item.Categories.categoryMainTitle}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          ))}

      {/* 비슷한 검색 -> 키워드 임시방편 */}
      {search &&
        relatedSearches
          .filter((item) => item.Categories)
          .slice(1)
          .map((item, index) => (
            <section
              key={index}
              className="flex justify-between items-center self-stretch h-[64px] px-[50px] py-0 border-b border-gray-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative overflow-hidden rounded-full">
                  <Image src={item.thumbNailURL} alt={item.title} layout="fill" className="object-cover" />
                </div>
                <div>
                  <span>{item.title}</span>
                </div>
              </div>
            </section>
          ))}
    </div>
  );
};

export default SearchPage;
