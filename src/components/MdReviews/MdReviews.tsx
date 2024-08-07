import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import MockReview from '@/mockup/mdPick.json';
import ReviewCard from '../ReviewCard';

const MdReviews = () => {
  return (
    <div className="flex flex-col px-5">
      <h3 className="text-xl font-bold my-4">MD pick - 이달의 제품 추천 리뷰</h3>
      <Carousel>
        <CarouselContent>
          {MockReview.map((review) => (
            <CarouselItem className="basis-2/3" key={review.reviewId}>
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MdReviews;
