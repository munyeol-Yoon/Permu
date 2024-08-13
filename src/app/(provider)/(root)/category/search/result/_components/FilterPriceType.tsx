import FilterButton from './FilterButton';
import FilterLabel from './FilterLabel';

const FilterPriceType = () => {
  return (
    <div className="filter-option">
      <FilterLabel>가격 유형</FilterLabel>
      <div className="mt-1 flex space-x-2 px-[10px]">
        <FilterButton>높은가격순</FilterButton>
        <FilterButton>낮은가격순</FilterButton>
        <FilterButton>무료교환반품</FilterButton>
      </div>
    </div>
  );
};

export default FilterPriceType;
