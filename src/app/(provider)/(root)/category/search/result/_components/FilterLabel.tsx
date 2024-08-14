import { PropsWithChildren } from 'react';

const FilterLabel = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-end h-[64px] px-[10px] py-[10px] gap-[10px]">
      <label className="block text-[16px] font-bold text-gray-700">{children}</label>
    </div>
  );
};

export default FilterLabel;
