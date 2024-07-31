'use client';

import { useCategoryQuery } from '@/hooks/query';
import SearchButtonSVG from '@@/public/searchButton.svg';
import Link from 'next/link';

const CategoryPage = () => {
  const { data } = useCategoryQuery();

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
    </div>
  );
};

export default CategoryPage;
