import Image from "next/image";
import arrow from "./../../../../../../public/main_category_arrow.svg";

export interface CategoryMoreProps {
    title: string;
}

function CategoryMore({title}: CategoryMoreProps) {
  return (
    <div className="flex justify-between items-center mb-[16px]">
      <h2 className="text-xl">{title}</h2>

      <button className="flex items-center">
        <span className="text-xs">더보기</span>
        <Image className="ml-3" src={arrow} width={9} height={4} alt="arrow" />
      </button>
    </div>
  );
}

export default CategoryMore;
