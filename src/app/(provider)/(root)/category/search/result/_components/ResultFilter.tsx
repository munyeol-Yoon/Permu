import { Product } from '@/types/products';
import { useState } from 'react';
import { FilterCriteriaType } from '../page';
import FilterBenefits from './FilterBenefits';
import FilterLabel from './FilterLabel';
import FilterPricePoint from './FilterPricePoint';
import FilterPriceType from './FilterPriceType';

interface ResultFilterProps {
  data: Product[];
  setFilterCriteria: (criteria: FilterCriteriaType) => void;
  onClose: () => void;
}

const ResultFilter = ({ data, setFilterCriteria, onClose }: ResultFilterProps) => {
  const [selectedPriceType, setSelectedPriceType] = useState<'high' | 'low' | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 200000000]);
  const [selectedBenefit, setSelectedBenefit] = useState<'discount' | 'none'>('none');

  const handlePriceRangeChange = (newPriceRange: [number, number]) => {
    setPriceRange(newPriceRange);
  };

  const handlePriceTypeChange = (priceType: 'high' | 'low' | 'all') => {
    setSelectedPriceType(priceType);
  };

  const handleBenefitChange = (benefit: 'discount' | 'none') => {
    setSelectedBenefit(benefit);
  };

  const handleApplyClick = () => {
    setFilterCriteria({
      priceRange,
      priceType: selectedPriceType,
      benefit: selectedBenefit
    });
    onClose();
  };

  const handleResetClick = () => {
    setFilterCriteria({
      priceRange: [1000, 200000000],
      priceType: 'all',
      benefit: 'none'
    });
    setSelectedPriceType('all');
    setPriceRange([1000, 200000000]);
    setSelectedBenefit('none');
  };

  return (
    <div className="filter-container p-4 bg-white">
      <div className="flex flex-col space-y-4">
        <FilterPricePoint priceRange={priceRange} handlePriceRangeChange={handlePriceRangeChange} />
        <FilterPriceType selectedPriceType={selectedPriceType} onPriceTypeChange={handlePriceTypeChange} />
        <FilterBenefits selectedBenefit={selectedBenefit} onBenefitChange={handleBenefitChange} />
        <FilterLabel />
        <div className="w-full border-t border-gray-200" />
        <div className="flex justify-between mt-4 px-[10px]">
          <button
            className="border border-gray-400 text-gray-400 rounded px-4 py-2 w-[220px] h-[46px] mr-[10px]"
            onClick={handleResetClick}
          >
            초기화
          </button>
          <button className="bg-[#2c2c2c] text-white rounded px-4 py-2 w-[330px] h-[46px]" onClick={handleApplyClick}>
            {data.length}개의 상품 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultFilter;
