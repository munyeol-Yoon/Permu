'use client';
import Navbar from '@/components/Navbar';
import { useReviewsQuery } from '@/hooks/query';
import { Params } from '@/types/products';
import Image from 'next/image';
import { useParams } from 'next/navigation';
const ReviewImagesPage = () => {
  const { productId } = useParams<Params['params']>();
  const { data: reviews } = useReviewsQuery(productId);
  const reviewsImages = reviews?.map((review) => review.ImagesURL);
  return (
    <div className="relative max-w-[600px] flex flex-col h-full">
      <Navbar title="전체후기사진 모아보기" isHome />

      <div className="grid grid-cols-3 gap-1">
        {reviewsImages
          ?.flat()
          .slice(0, 7)
          .map((reviewImage, index) => (
            <div className="aspect-square relative">
              <Image
                key={index}
                src={reviewImage}
                alt="리뷰 이미지"
                fill
                className="w-[200px] h-[200px] object-cover absolute"
                unoptimized
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReviewImagesPage;
