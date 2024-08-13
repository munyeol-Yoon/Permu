import FilterButton from './FilterButton';
import FilterLabel from './FilterLabel';

const FilterBenefits = () => {
  return (
    <div className="filter-option">
      <FilterLabel>혜택 정보</FilterLabel>
      <div className="mt-1 flex space-x-2 px-[10px]">
        <FilterButton>할인상품</FilterButton>
        <FilterButton>무료배송</FilterButton>
        <FilterButton>무료교환반품</FilterButton>
      </div>
    </div>
  );
};

export default FilterBenefits;
