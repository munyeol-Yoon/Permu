import DefaultInput from '@/components/Input/Input';
import FilterLabel from './FilterLabel';

const FilterPricePoint = () => {
  return (
    <div className="filter-option">
      <FilterLabel>가격대</FilterLabel>
      <div className="mt-1 flex items-center space-x-2 px-[10px]">
        <DefaultInput
          className="rounded-[4px] bg-[#b3b3b320] w-[220px] h-[46px] px-2 py-[10px] text-[15px]"
          placeholder="1,000"
          type="number"
        />
        <span className="text-gray-500 text-[15px] font-normal">~</span>
        <DefaultInput
          className="rounded-[4px] bg-[#b3b3b320] w-[220px] h-[46px] px-2 py-[10px] text-[15px]"
          placeholder="200,000,000"
          type="number"
        />
        <button className="w-[83px] h-[46px] px-4 py-2 bg-[#b3b3b3] text-white rounded-md">적용</button>
      </div>
    </div>
  );
};

export default FilterPricePoint;
