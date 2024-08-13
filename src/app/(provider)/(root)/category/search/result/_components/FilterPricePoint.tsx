'use client';

import DefaultInput from '@/components/Input/Input';
import { useState } from 'react';
import FilterLabel from './FilterLabel';

interface FilterPricePointProps {
  handlePriceRangeChange: (priceRange: [number, number]) => void;
}

const FilterPricePoint = ({ handlePriceRangeChange }: FilterPricePointProps) => {
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value === '' ? '' : Number(e.target.value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value === '' ? '' : Number(e.target.value));
  };

  const handleApplyClick = () => {
    if (minPrice !== '' && maxPrice !== '') {
      handlePriceRangeChange([minPrice, maxPrice]);
    }
  };

  return (
    <div className="filter-option">
      <FilterLabel>가격대</FilterLabel>
      <div className="mt-1 flex items-center space-x-2 px-[10px]">
        <DefaultInput
          className="rounded-[4px] bg-[#b3b3b320] w-[220px] h-[46px] px-2 py-[10px] text-[15px]"
          placeholder="1,000"
          type="number"
          value={minPrice === '' ? '' : minPrice}
          onChange={handleMinPriceChange}
        />
        <span className="text-gray-500 text-[15px] font-normal">~</span>
        <DefaultInput
          className="rounded-[4px] bg-[#b3b3b320] w-[220px] h-[46px] px-2 py-[10px] text-[15px]"
          placeholder="200,000,000"
          type="number"
          value={maxPrice === '' ? '' : maxPrice}
          onChange={handleMaxPriceChange}
        />
        <button className="w-[83px] h-[46px] px-4 py-2 bg-[#b3b3b3] text-white rounded-md" onClick={handleApplyClick}>
          적용
        </button>
      </div>
    </div>
  );
};

export default FilterPricePoint;
