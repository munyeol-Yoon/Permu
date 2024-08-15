import ArrowButtonSVG from '@@/public/arrow/arrow-bottom.svg';
import { PropsWithChildren } from 'react';

interface FilterNavMenuType {
  onClick: () => void;
}

const FilterNavMenu = ({ children, onClick }: PropsWithChildren<FilterNavMenuType>) => {
  return (
    <button
      onClick={onClick}
      className="h-[32px] py-0 px-[16px] rounded-[40px] border-[#b3b3b3] bg-white flex justify-between items-center mr-4"
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
