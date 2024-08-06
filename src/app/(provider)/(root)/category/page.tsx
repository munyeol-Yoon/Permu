'use client';

import Loading from '@/components/Loading';
import Toggle from '@/components/Toggle';
import { Accordion } from '@/components/ui/accordion';
import { CATEGORY_SEARCH_PATHNAME, CATEGORY_SEARCH_RESULT_PATHNAME } from '@/constant/pathname';
import { useCategoryQuery } from '@/hooks/query';
import SearchButtonSVG from '@@/public/searchButton.svg';
import Link from 'next/link';

const CategoryPage = () => {
  const { data, isPending } = useCategoryQuery();

  if (isPending) return <Loading />;

  const categories: RouteCategoriesByTitle = data;

  return (
    <div>
      <Link href={CATEGORY_SEARCH_PATHNAME}>
        <section className="flex justify-center items-center self-stretch">
          <div className="relative w-full ml-11 mr-11">
            <input
              type="text"
              placeholder="여름 시즌 추천템 20% 할인"
              className="rounded-[4px] bg-[#b3b3b320] w-full px-2.5 py-0 pr-[60px] h-[42px] cursor-pointer"
            />

            <button className="absolute right-0 top-0 bottom-0 px-3 py-1">
              <SearchButtonSVG />
            </button>
          </div>
        </section>
      </Link>
      {/* 카테고리 부분 */}
      <section className="flex flex-col items-stretch self-stretch">
        {Object.keys(categories).map((categoryTitle) => (
          <div key={categoryTitle}>
            <div className="flex h-16 pt-[20px] pb-[20.21px] justify-center items-center self-stretch border-b border-b-[#B3B3B3]">
              <div className="flex w-[600px] px-[50px] items-center gap-[5px]">
                <h2 className="transform rotate-[0.362deg] text-[#231815] font-abhaya text-[30px] not-italic font-normal leading-[22.5px] tracking-[9px]">
                  {categoryTitle} -
                </h2>
              </div>
            </div>
            {categories[categoryTitle].map((group) => (
              <Accordion type="multiple" key={group.mainTitle}>
                <Toggle trigger={group.mainTitle} value={false} className="px-8">
                  <div>
                    {group.items.map((item) => (
                      <div key={item.categoryId}>
                        <Link href={`${CATEGORY_SEARCH_RESULT_PATHNAME}?categoryId=${item.categoryId}`}>
                          <div className="text-[#B3B3B3] hover:text-black">
                            - {item.categorySubTitle ? item.categorySubTitle : '카테고리 준비중입니다.'}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </Toggle>
              </Accordion>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default CategoryPage;
