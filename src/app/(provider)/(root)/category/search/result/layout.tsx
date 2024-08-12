'use client';

import ArrowButtonSVG from '@@/public/arrow/arrow-bottom.svg';
import { PropsWithChildren, useState } from 'react';
import { ResultFilter } from './_components';

const ResultLayout = ({ children }: PropsWithChildren) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <>
      <div className="relative flex items-center justify-between p-4 bg-gray-100">
        <button
          onClick={toggleFilterVisibility}
          className="h-[32px] py-0 px-[16px] rounded-[40px] border-[#b3b3b3] bg-white flex justify-between items-center"
        >
          <p className="text-[14px]">전체</p>
          <ArrowButtonSVG
            width="16px"
            height="7.111px"
            className="ml-[8px] flex items-center justify-center scale-150 pt-[1px]"
          />
        </button>

        {isFilterVisible && (
          <>
            <div className="absolute top-full left-0 w-full max-w-[600px] bg-white p-6 rounded-lg shadow-lg mt-2 z-50">
              <ResultFilter />
            </div>

            <div className="absolute top-[calc(100%+20px)] left-0 w-full max-w-[600px] h-[4px] bg-white shadow-xl z-50"></div>
          </>
        )}
      </div>
      <div>{children}</div>
    </>
  );
};

export default ResultLayout;
