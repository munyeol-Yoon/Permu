import { PropsWithChildren } from 'react';

const FilterButton = ({ children }: PropsWithChildren) => {
  return (
    <button className="flex flex-1 justify-center items-center px-4 py-2 rounded-md h-[46px] text-[15px] whitespace-nowrap bg-[#b3b3b320]">
      {children}
    </button>
  );
};

export default FilterButton;
