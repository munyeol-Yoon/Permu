import FilterButton from './FilterButton';
import FilterLabel from './FilterLabel';

interface FilterPriceTypeProps {
  selectedPriceType: 'high' | 'low' | 'all';
  onPriceTypeChange: (priceType: 'high' | 'low' | 'all') => void;
}

const FilterPriceType = ({ selectedPriceType, onPriceTypeChange }: FilterPriceTypeProps) => {
  return (
    <div className="filter-option">
      <FilterLabel>가격 유형</FilterLabel>
      <div className="mt-1 flex space-x-2 px-[10px]">
        <FilterButton
          onClick={() => onPriceTypeChange('high')}
          className={selectedPriceType === 'high' ? 'bg-[#0348FF] text-white' : 'bg-[#b3b3b320]'}
        >
          높은가격순
        </FilterButton>
        <FilterButton
          onClick={() => onPriceTypeChange('low')}
          className={selectedPriceType === 'low' ? 'bg-[#0348FF] text-white' : 'bg-[#b3b3b320]'}
        >
          낮은가격순
        </FilterButton>
        <FilterButton className="bg-[#d3d3d3] cursor-not-allowed text-[#B3B3B3]">무료교환반품</FilterButton>
      </div>
    </div>
  );
};

export default FilterPriceType;
