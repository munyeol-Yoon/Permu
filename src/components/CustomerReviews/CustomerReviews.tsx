import CategoryMore from '../CategoryMore';
import ReviewSlideCard from '../ReviewSlideCard';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

const CustomerReviews = () => {
  return (
    <div className="w-full mt-[60px] mb-4 p-5-2 overflow-hidden">
      <CategoryMore title="MD pick - 이달의 제품 추천 리뷰" />
      <div className="flex">
        <Carousel>
          <CarouselContent>
            {Array(2)
              .fill(0)
              .map((_, idx) => (
                <CarouselItem key={idx} className="basis-1/2">
                  <ReviewSlideCard />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CustomerReviews;
