'use client';

import { useCategoryQuery } from '@/hooks/query';
import SearchButtonSVG from '@@/public/searchButton.svg';
import Link from 'next/link';

const CategoryPage = () => {
  const { data, isPending } = useCategoryQuery();

  if (isPending) {
    return (
      <div>
        <Link href={'/category/search'}>
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
        <section className="flex justify-center items-center self-stretch">Loading...</section>
      </div>
    );
  }

  const categories: RouteCategoriesByTitle = data;

  console.log(data);

  return (
    <div>
      <Link href={'/category/search'}>
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
      <section className="flex justify-center items-center self-stretch">
        {Object.keys(categories).map((categoryTitle) => (
          <div key={categoryTitle}>
            <h2>{categoryTitle}</h2>
            {categories[categoryTitle].map((group) => (
              <div key={group.mainTitle}>
                <h3>{group.mainTitle}</h3>
                {group.items.map((item) => (
                  <div key={item.categoryId}>
                    <p>{item.categorySubTitle ? item.categorySubTitle : '카테고리 준비중입니다.'}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};

export default CategoryPage;
