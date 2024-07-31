import Image from 'next/image';
import CategoryMore from '../../../../../components/CategoryMore';
import CategoryProductCard from '../CategoryProductCard';
import { CategoryMoreProps } from '../../../../../components/CategoryMore/CategoryMore';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const CategorySection = ({ title }: CategoryMoreProps) => {
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
        <Carousel>
          <CarouselContent className="w-full">
            {Array(4)
              .fill(0)
              .map((_, idx) => (
                <CarouselItem key={idx} className="basis-1/4">
                  <CategoryProductCard />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default CategorySection;
