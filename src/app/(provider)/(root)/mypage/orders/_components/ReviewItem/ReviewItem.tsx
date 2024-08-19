import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { UserReview } from '@/hooks/query/mypage/useUserReviewsQuery';
import FillStar from '@@/public/star/star-fill-icon.svg';
import EmptyStar from '@@/public/star/star-icon.svg';
import dayjs from 'dayjs';
import { ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import OrderItem from '../OrderItem';

interface ReviewItemProps {
  review: UserReview;
}

const renderStars = (count: number) => {
  const fullStars = Array(count)
    .fill(null)
    .map((_, index) => <FillStar key={`full-${index}`} />);
  const emptyStars = Array(5 - count)
    .fill(null)
    .map((_, index) => <EmptyStar key={`empty-${index}`} />);
  return [...fullStars, ...emptyStars];
};

const ReviewItem = ({ review }: ReviewItemProps) => {
  const { Products, score, content, imagesURL, createdAt, productId, ...props } = review;
  const formattedDate = dayjs(createdAt).format('YYYY.MM.DD');

  return (
    <AccordionItem value={crypto.randomUUID()}>
      <AccordionTrigger className="text-xl">
        <h3>{formattedDate}</h3>
      </AccordionTrigger>

      <AccordionContent>
        <OrderItem product={Products} />

        <Link href={`/products/${productId}`}>
          <div className="flex justify-between items-center">
            <p className="flex items-center text-sm gap-x-2 my-[12px]">
              <span className="flex gap-x-1 items-center">{renderStars(score || 0)}</span>
              <span>{formattedDate}</span>
            </p>
            <p className="flex items-center gap-x-2">
              <ThumbsUp />
              1명에게 도움이 되었습니다.
            </p>
          </div>

          <div className="grid grid-cols-[1fr_135px] gap-4 mt-[14px]">
            <p className="text-base">{content}</p>
            {Array.isArray(imagesURL) && imagesURL.length > 0 && typeof imagesURL[0] === 'string' && (
              <div className="w-[135px] h-[135px] aspect-square relative">
                <Image
                  src={imagesURL[0]}
                  alt="리뷰이미지"
                  className="object-cover rounded shadow-lg"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 200px"
                />
              </div>
            )}
          </div>
        </Link>

        {/* <div className="flex justify-end gap-x-2">
          <Button variant="outline" onClick={handleClick}>
            수정
          </Button>
          <Button variant="outline" onClick={handleClick}>
            삭제
          </Button>
        </div> */}
      </AccordionContent>
    </AccordionItem>
  );
};

export default ReviewItem;
