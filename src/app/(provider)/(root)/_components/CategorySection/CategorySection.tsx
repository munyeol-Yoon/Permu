import Image from "next/image";
import CategoryMore from "../CategoryMore";
import CategoryProductCard from "../CategoryProductCard";
import { CategoryMoreProps } from "../CategoryMore/CategoryMore";

function CategorySection({title}: CategoryMoreProps) {
  return (
    <div className="flex flex-col mt-[46px]">
      <CategoryMore title={title} />

      <div className="w-full h-[300px] rounded mb-[16px]">
        <Image
          src="https://chapterone.kr/web/product/big/202106/37b7ab0e1de511618f54714cd77479bd.jpg"
          width={570}
          height={300}
          alt="인기 급상승 제품 이미지1"
          className="w-full h-[300px]"
        />
      </div>

      {/* 임시 */}
      <div className="flex">
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <CategoryProductCard key={idx} />
          ))}
      </div>
    </div>
  );
}

export default CategorySection;
