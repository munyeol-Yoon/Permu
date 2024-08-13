import ArrowButtonSVG from '@@/public/arrow/arrow-bottom.svg';
import { PropsWithChildren } from 'react';

interface FilterNavMenuType {
  toggleFilterVisibility: () => void;
}

const FilterNavMenu = ({ children, toggleFilterVisibility }: PropsWithChildren<FilterNavMenuType>) => {
  return (
    <button
      onClick={toggleFilterVisibility}
      className="h-[32px] py-0 px-[16px] rounded-[40px] border-[#b3b3b3] bg-white flex justify-between items-center"
    >
      <p className="text-[14px]">{children}</p>
      <ArrowButtonSVG
        width="16px"
        height="7.111px"
        className="ml-[8px] flex items-center justify-center scale-150 pt-[1px]"
      />
    </button>
  );
};

export default FilterNavMenu;
