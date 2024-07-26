import Image from 'next/image';
import BennerSlide from '@/components/BennerSlide';
import EventLinkCard from './_components/EventLinkCard';
import CategoryMore from './_components/CategoryMore';
import ProductCard from './_components/ProductCard';
import CategorySection from './_components/CategorySection/CategorySection';
import ReviewSlide from './_components/ReviewSlide/ReviewSlide';
import mockData from './../../../mockup/eventBenner.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const RootPage = () => {
  return (
    <main className="max-w-[600px] mx-auto my-0 h-full w-full overflow-hidden">
      {/* 슬라이드 */}
      <BennerSlide />

      <div className="px-[15px]">
        {/* 이벤트 링크 */}
        <div className="flex justify-between mt-8 mb-12">
          {mockData.map((item, idx) => (
            <EventLinkCard item={item} key={idx} />
          ))}
        </div>
        {/* 현재 판매중인 상품 */}
        <div className="flex flex-col">
          <CategoryMore title="현재 판매중인 상품" />

          <div className="flex items-center justify-between">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <ProductCard key={idx} />
              ))}
          </div>
        </div>
        {/* 카테고리1 */}
        <CategorySection title="인기 급상승 제품 - 향수" />

        {/* 카테고리2 */}
        <CategorySection title="인기 급상승 제품 - 디퓨저" />

        {/* 고객리뷰: */}
        <div className="w-full mt-[60px] mb-4">
          <CategoryMore title="실시간 고객 베스트 리뷰" />
          <div className="flex">
            <Carousel>
              <CarouselContent>
                {Array(2)
                  .fill(0)
                  .map((_, idx) => (
                    <CarouselItem key={idx} className="basis-1/2">
                      <ReviewSlide />
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RootPage;
