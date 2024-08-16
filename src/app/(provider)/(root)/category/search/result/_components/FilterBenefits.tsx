import FilterButton from './FilterButton';
import FilterLabel from './FilterLabel';

interface FilterBenefitsProps {
  selectedBenefit: 'discount' | 'none';
  onBenefitChange: (benefit: 'discount' | 'none') => void;
}

const FilterBenefits = ({ selectedBenefit, onBenefitChange }: FilterBenefitsProps) => {
  return (
    <div className="filter-option">
      <FilterLabel>혜택 정보</FilterLabel>
      <div className="mt-1 flex space-x-2 px-[10px]">
        <FilterButton
          onClick={() => onBenefitChange('discount')}
          className={selectedBenefit === 'discount' ? 'bg-[#0348FF] text-white' : 'bg-[#b3b3b320]'}
        >
          할인상품
        </FilterButton>
        <FilterButton className="bg-[#d3d3d3] cursor-not-allowed text-[#B3B3B3]">무료배송</FilterButton>
        <FilterButton className="bg-[#d3d3d3] cursor-not-allowed text-[#B3B3B3]">무료교환반품</FilterButton>
      </div>
    </div>
  );
};

export default FilterBenefits;
