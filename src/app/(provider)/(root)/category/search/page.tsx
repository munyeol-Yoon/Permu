'use client';

import { CATEGORY_SEARCH_RESULT_PATHNAME } from '@/constant/pathname';
import useRelatedSearchQuery from '@/hooks/query/useRelatedSearchQuery';
import useRecentSearchTerms from '@/hooks/useRecentSearchTerms';
import RecentSearchSVG from '@@/public/recentSearchButton.svg';
import { debounce } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RecentSearch } from './_components';
import SearchInput from './_components/SearchInput';

const findSimilarKeywords = (searchTerm: string, allKeywords: string[]) => {
  const similarKeywords = allKeywords.filter((keyword) => {
    return keyword.includes(searchTerm) || searchTerm.includes(keyword);
  });
  return similarKeywords;
};

const SearchPage = () => {
  const [search, setSearch] = useState<string>('');
  const { data: relatedSearches = [], refetch } = useRelatedSearchQuery(search);
  const { recentSearchTerms, saveSearchTerm, deleteSearchTerm, clearAllSearchTerms } = useRecentSearchTerms();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // TODO : 인기 검색어 MVP 이후로 연기
  // TODO : 연관 키워드 지금 하드코딩이지만 네이버 광고 api 사용하면 될듯?
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

  const allKeywords = [
    '샤넬',
    '사냉',
    '사눌',
    '사람',
    '사랑',
    '샤라랑',
    '샤랄라',
    '디올',
    '디오',
    '디우',
    '에르메스',
    '루이비통'
  ];

  const similarKeywords = search ? findSimilarKeywords(search, allKeywords) : [];

  return (
    <div>
      <section className="flex justify-center items-center self-stretch">
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

      {search &&
        similarKeywords.map((keyword, index) => (
          <section
            key={index}
            className="flex justify-between items-center self-stretch h-[64px] px-[50px] py-0 border-b border-gray-300"
          >
            <Link href={`${CATEGORY_SEARCH_RESULT_PATHNAME}?query=${keyword}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 relative overflow-hidden rounded-full flex items-center justify-center bg-zinc-400">
                  <RecentSearchSVG className="w-6 h-6 object-cover" />
                </div>
                <div>
                  <span>{keyword}</span>
                  <div className="text-gray-500 text-sm">
                    <span>키워드</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        ))}

      {/* 비슷한 검색 -> 키워드 임시방편 */}
      {/* {search &&
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
          ))} */}
    </div>
  );
};

export default SearchPage;
