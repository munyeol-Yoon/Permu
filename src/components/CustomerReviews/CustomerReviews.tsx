import { ReviewType } from '@/types/review';
import CategoryMore from '../CategoryMore';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import ReviewSlideCard from './ReviewSlideCard';

const reviews: ReviewType[] = [
  {
    reviewId: 0,
    ImageURL:
      'https://s3-alpha-sig.figma.com/img/9adb/fc7a/69f5bc921117d6beaf0d2c1214e94320?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UQOI1G6tWviueJA7ilaIhEfukl-yCfWsjHBMl0QZTYIIpoYLUvoY07uOyqWWiokjvPNtaaBNSpDHjWIVNrUwqXxSo96LgayF0o778XGPkZ7bz0hZOI9RwsC0Ta4OrtFTfu~GU3cYp997tf7BwGrTMFS6OrcdhKWvMyF5vxC0NE~q5m4V7WpJ-~Ef3ZlIIcEIcpI~Rkkt4kiTScd5QA8HqTnVHEADDomqOcem8LVIUjHMAIDdkYw~fWmUdIF-mrdJHiuQ9OZhWuP32Dj1949bDJd1DnvM0kdSXwhfvpCeni9cF7Hr1OIX7T6JRhIGXzmqTB-gZn13ViJAhuK4W7Fhhw__',
    title: '리뷰 타이틀',
    content:
      '리뷰 내용 정의할 수 없는 여성스러움을 표현하는 미지의 꽃다발... 플로랄 에센스에 높은 비율의 알데하이드를 혼합한 향수입니다'
  },
  {
    reviewId: 1,
    ImageURL:
      'https://s3-alpha-sig.figma.com/img/f969/a16f/d0ccad57fc5b624c3352ceb59e41ba12?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IDcVdtNy8viEddGBxA6W9HhhbXlhUYMbTy9bx0GxKHJytqrVZ-XCK7gSBsoco-OAD5kA0CEpEbcIycGIkTmFTxiqVHnfOZYgAtsnPsSKAXD9BkhNqVuVHdk0EkHor5Yre77SaxBcP0wwFSJIZHHoxKAk-k9GecavA439eUZ6LKeFk75X3T2SKPPKwdgckOSTr3RGv8RPQZVE37D24x4X6TJ444kfwuEQAEDvY1uxZa1ThRnzvcFAvSq0EoZnRfZOXf2jlcQDI6Gi2oLdOh65Z1~8ETlY2l-ADz4P9z1ki9bN0a-7~WsRy14JO5TLMmoRLuThmJG7e5lQML2cXkGQcA__',
    title: '리뷰 타이틀',
    content:
      '리뷰 내용 정의할 수 없는 여성스러움을 표현하는 미지의 꽃다발... 플로랄 에센스에 높은 비율의 알데하이드를 혼합한 향수입니다'
  }
];
const CustomerReviews = () => {
  return (
    <div className="w-full mt-[60px] mb-4 p-5-2 overflow-hidden">
      <CategoryMore title="MD pick - 이달의 제품 추천 리뷰" />
      <div className="flex">
        <Carousel>
          <CarouselContent>
            {reviews.map((review) => (
              <CarouselItem key={review.reviewId} className="basis-1/2">
                <ReviewSlideCard review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CustomerReviews;
