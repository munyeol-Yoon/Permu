'use client';

import { getRelatedSearchProducts } from '@/api/product';
import SearchInput from '@/components/SearchPage/SearchInput';
import { useSearchQuery } from '@/hooks/query';
import useRecentSearchTerms from '@/hooks/useRecentSearchTerms';
import { debounce } from 'lodash';
import Image from 'next/image';
import { useCallback, useState } from 'react';

const SearchPage = () => {
  const [search, setSearch] = useState<string>('');
  const [relatedSearches, setRelatedSearches] = useState<any[]>([]);
  const { data, error, isLoading, refetch } = useSearchQuery(search);
  const { recentSearchTerms, saveSearchTerm, deleteSearchTerm, clearAllSearchTerms } = useRecentSearchTerms();

  // TODO : 인기 검색어 MVP 이후로 연기
  // TODO : 검색창에 입력시 현재 화면이 가려지며 검색된 결과가 실시간으로 리스트로 표시되어야함.
  // TODO : UI 작업
  // TODO : 컴포넌트 분리 작업 필요
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
        />
      </section>
      <section className="flex justify-between items-center self-stretch h-[64px] px-[50px] py-0">
        <h2>최근 검색어</h2>
        <h2 onClick={handleClearAllTermsClick} className="text-gray-300 cursor-pointer">
          모두 삭제
        </h2>
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

      {/* 
      상단 정확히 일치하는 제품 -> 바로가기가 있어야함

      중단 검색결과가 포함되어 있는 카테고리 -> 바로가기 X
       */}

      {/* 정확히 일치하는 제품 */}
      {/* TODO: 제품이 너무 많은데 제한이 있어야 하지 않을까? */}
      {relatedSearches
        .filter((item) => item.Categories.length === 0)
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
            <div>
              <button className="text-gray-300">바로가기</button>
            </div>
          </section>
        ))}

      {/* 검색결과가 포함되어 있는 카테고리 */}
      {/* TODO: 카테고리 링크가 나오는 부분도 여러개가 나와야 하는 걸까? */}
      {relatedSearches
        .filter((item) => item.Categories.length > 0)
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
                <div className="text-gray-500">
                  {/* 관련 카테고리 */}
                  {/* TODO: 코드(100) 로 오는 카테고리 이름을 어떻게 관리할까? */}
                  {item.Categories.map((category: Categories, catIndex: number) => (
                    <span key={category.categoryId}>
                      {category.categoryName}
                      {category.CategoryDetail.length > 0 && ' > '}
                      {category.CategoryDetail.map((detail, detailIndex) => (
                        <span key={detail.categoryDetailId}>
                          {detail.name}
                          {detailIndex < category.CategoryDetail.length - 1 && ' > '}
                        </span>
                      ))}
                      {catIndex < item.Categories.length - 1 && ' > '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
    </div>
  );
};

export default SearchPage;
