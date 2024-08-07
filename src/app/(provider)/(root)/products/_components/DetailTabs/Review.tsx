'use client';

import { useReviewsQuery } from '@/hooks/query';
import { Params } from '@/types/products';
import ArrowRRoundSVG from '@@/public/arrow/arrow-round-right.svg';
import StarFillSVG from '@@/public/star/star-fill-icon.svg';
import StarSVG from '@@/public/star/star-icon.svg';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
//const filterNavbar = ['최신순', '오래된 순', '별점 높은순'];
const ReviewPage = () => {
  const router = useRouter();
  const { productId } = useParams<Params['params']>();
  const { data: reviews } = useReviewsQuery(productId);
  const reviewsImages = reviews?.map((review) => review.ImagesURL);
  // const handleFilter = (value: string) => {
  //   alert(value);
  // };

  return (
    <div className="p-5-2 ">
      <div className="flex-row-10 mb-3">
        <span className="text-xl">전체 후기 사진</span>
        <span className="text-xl text-[#0348FF]">{reviewsImages?.flat().length}</span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {reviewsImages
          ?.flat()
          .slice(0, 7)
          .map((reviewImage, index) => (
            <Image
              key={index}
              src={reviewImage}
              alt="리뷰 이미지"
              width={300}
              height={300}
              className="w-[132px] h-[132px] object-cover"
            />
          ))}

        <div
          className="flex flex-col justify-center items-center hover:cursor-pointer w-[132px] h-[132px]"
          onClick={() => router.push(`/products/${productId}/review/images`)}
        >
          <ArrowRRoundSVG />
          <span className="text-gray-500">전체 보기</span>
        </div>
      </div>

      <div className="p-5-2">
        <span className="text-xl font-semibold">전체 리뷰</span>
        {/* <div className="h-[64px] flex items-center">
          {filterNavbar.map((item, index) => (
            <span key={index} className="hover:cursor-pointer" onClick={() => handleFilter(item)}>
              {item}
              {index < filterNavbar.length - 1 && ' | '}
            </span>
          ))}
        </div> */}

        {reviews?.map((review) => (
          <div key={review.reviewId}>
            <div className="grid grid-cols-[50px_1fr] grid-rows-2 gap-1">
              <Image
                src={'https://d2gfz7wkiigkmv.cloudfront.net/pickin/2/1/2/lWRbWznFQ9ORteqoMeRtoQ'}
                alt={'이미지'}
                width={300}
                height={300}
                className="row-span-2 rounded-full"
              />
              <span>{review.User.name}</span>
              <span className="text-sm">{review.Products.notes?.join(' | ')}</span>
            </div>
            <div className="min-h-[213px] flex-col-10">
              <div className="flex flex-row items-center">
                {Array.from({ length: review.score }, (_, index) => (
                  <StarFillSVG key={`filled-${index}`} />
                ))}
                {Array.from({ length: 5 - review.score }, (_, index) => (
                  <StarSVG key={`empty-${index}`} />
                ))}
                <span className="text-xs">{review.createdBy}</span>
              </div>
              <div className="flex-row-10">
                {review.ImagesURL.map((imageURL, index) => (
                  <Image
                    key={index}
                    src={imageURL}
                    alt={'이미지'}
                    width={300}
                    height={300}
                    className="w-[132px] h-[132px] object-cover"
                  />
                ))}
              </div>
              <p>{review.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
