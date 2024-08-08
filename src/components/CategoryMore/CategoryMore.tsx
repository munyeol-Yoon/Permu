import HotSVG from '@@/public/sign/hot-icon.svg';
export interface CategoryMoreProps {
  title: string;
}

const CategoryMore = ({ title }: CategoryMoreProps) => {
  return (
    <div className="flex justify-between items-center mb-[16px]">
      <h2 className="text-xl font-bold flex items-center gap-1">
        {title} {title === '지금 가장 인기 있는 제품' && <HotSVG />}
      </h2>

      {/* <button className="flex items-center">
        <span className="text-xs">더보기</span>
        <ArrowSVG className="ml-3 w-[9px] h-1" />
      </button> */}
    </div>
  );
};

export default CategoryMore;
