import ArrowSVG from '@@/public/main_category_arrow.svg';

export interface CategoryMoreProps {
  title: string;
}

const CategoryMore = ({ title }: CategoryMoreProps) => {
  return (
    <div className="flex justify-between items-center mb-[16px]">
      <h2 className="text-xl">{title}</h2>

      <button className="flex items-center">
        <span className="text-xs">더보기</span>
        <ArrowSVG className="ml-3 w-[9px] h-1" />
      </button>
    </div>
  );
};

export default CategoryMore;
