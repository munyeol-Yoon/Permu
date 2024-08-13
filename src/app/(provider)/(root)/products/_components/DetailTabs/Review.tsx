'use client';

import Pagination from '@/components/Pagination';
import { useReviewsQuery } from '@/hooks/query';
import useAlert from '@/hooks/useAlert';
import { Params } from '@/types/products';
import ArrowRRoundSVG from '@@/public/arrow/arrow-round-right.svg';
import ProfileImg from '@@/public/profile/profile-sm.svg';
import StarFillSVG from '@@/public/star/star-fill-icon.svg';
import StarSVG from '@@/public/star/star-icon.svg';
import { cx } from 'class-variance-authority';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
const filterNavbar = ['최신순', '오래된 순', '별점 높은순'];

export const itemCountPerPage: number = 2;
export const pageCountPerPage: number = 5;
const ReviewPage = () => {
  const router = useRouter();
  const { showInfoAlert } = useAlert();
  const { productId } = useParams<Params['params']>();
  const [page, setPage] = useState<number>(0);
  const { data: reviews } = useReviewsQuery({ page, productId, perCount: itemCountPerPage });
  const reviewsImages = reviews?.data?.filter((review) => review.imagesURL).map((review) => review.imagesURL);

  const handleFilter = (value: string) => {
    showInfoAlert('준비중입니다');
  };

  return (
    <div className="p-5-2 ">
      <div className="flex-row-10 mb-3">
        <span className="text-xl">전체 후기 사진</span>
        <span className="text-xl text-[#0348FF]">{reviewsImages?.length}</span>
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
        <table className="h-[64px] flex items-center">
          <tr>
            {filterNavbar.map((item, index) => (
              <td
                key={index}
                className={cx({
                  'border-r-2': index < filterNavbar.length - 1
                })}
              >
                <span
                  className="hover:cursor-pointer px-[17px] pr-[18px] py-0 text-center"
                  onClick={() => handleFilter(item)}
                >
                  {item}
                </span>
              </td>
            ))}
          </tr>
        </table>

        {reviews?.data.map((review) => (
          <div className="flex flex-col gap-3" key={review.reviewId}>
            <div className="grid grid-cols-[60px_1fr] grid-rows-2 gap-x-3">
              <ProfileImg className="w-[60px] h-[60px] row-span-2 rounded-full" />

              <span className="font-bold">{review.User.name}</span>
              <span className="text-sm">{review.Product.notes.join(' | ')}</span>
            </div>
            <div className="min-h-[213px] flex-col-10">
              <div className="flex flex-row gap-2 items-center">
                <div className="flex">
                  {Array.from({ length: review.score ?? 0 }, (_, index) => (
                    <StarFillSVG key={`filled-${index}`} />
                  ))}
                  {Array.from({ length: 5 - (review.score ?? 0) }, (_, index) => (
                    <StarSVG key={`empty-${index}`} />
                  ))}
                </div>
                <span className="text-xs">{review.createdAt.slice(0, 10)}</span>
              </div>
              <div className="flex-row-10">
                {review.imagesURL?.map((imageURL, index) => (
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

        <div className="text-center">
          {(reviews?.data ?? []).length > 0 && (
            <Pagination
              maxPage={Math.ceil((reviews?.totalCount ?? 1) / itemCountPerPage)}
              itemCountPerPage={itemCountPerPage}
              pageCountPerPage={pageCountPerPage}
              clickListener={(page) => setPage(page - 1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
