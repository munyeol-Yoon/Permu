'use client';

import DefaultInput from '@/components/Input/Input';
import { useEffect, useState } from 'react';
import FilterLabel from './FilterLabel';

interface FilterPricePointProps {
  priceRange: [number, number];
  handlePriceRangeChange: (priceRange: [number, number]) => void;
}

const FilterPricePoint = ({ priceRange, handlePriceRangeChange }: FilterPricePointProps) => {
  const [minPrice, setMinPrice] = useState<number>(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState<number>(priceRange[1]);

  useEffect(() => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
  }, [priceRange]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
  };

  const handleApplyClick = () => {
    handlePriceRangeChange([minPrice, maxPrice]);
  };

  return (
    <div className="filter-option">
      <FilterLabel>가격대</FilterLabel>
      <div className="mt-1 flex items-center space-x-2 px-[10px]">
        <DefaultInput
          className="rounded-[4px] bg-[#b3b3b320] w-[220px] h-[46px] px-2 py-[10px] text-[15px]"
          placeholder="1,000"
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <span className="text-gray-500 text-[15px] font-normal">~</span>
        <DefaultInput
          className="rounded-[4px] bg-[#b3b3b320] w-[220px] h-[46px] px-2 py-[10px] text-[15px]"
          placeholder="200,000,000"
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
        <button
          className="w-[83px] h-[46px] px-4 py-2 bg-[#b3b3b3] text-white rounded-md hover:bg-[#0348FF] active:bg-[#023BCC] active:text-white"
          onClick={handleApplyClick}
        >
          적용
        </button>
      </div>
    </div>
  );
};

export default FilterPricePoint;
