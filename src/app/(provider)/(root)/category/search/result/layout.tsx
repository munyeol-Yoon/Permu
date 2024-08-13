'use client';

import { PropsWithChildren, useState } from 'react';
import { FilterNavMenu, ResultFilter } from './_components';

const ResultLayout = ({ children }: PropsWithChildren) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <>
      <div className="relative flex items-center justify-between p-4 bg-gray-100">
        <FilterNavMenu toggleFilterVisibility={toggleFilterVisibility}>가격</FilterNavMenu>

        {isFilterVisible && (
          <>
            <div className="absolute top-full left-0 w-full max-w-[600px] bg-white rounded-lg shadow-lg z-50">
              <ResultFilter />
            </div>

            <div className="absolute top-[calc(100%+20px)] left-0 w-full max-w-[600px] h-[4px] bg-white z-50"></div>
          </>
        )}
      </div>
      <div>{children}</div>
    </>
  );
};

export default ResultLayout;
