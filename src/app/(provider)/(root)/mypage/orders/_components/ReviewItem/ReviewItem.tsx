import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import useAlert from '@/hooks/useAlert';
import FullStar from '@@/public/star/star-fill-icon.svg';
import EmptyStar from '@@/public/star/star-icon.svg';
import ThumbsUp from '@@/public/thumbsUp.svg';
import Image from 'next/image';
import OrderItem from '../OrderItem';

interface ReviewItemProps {
  review: {
    Brands: {
      krName: string;
    };
    content: string;
    contentImgURL: string;
    countStar: number;
    date: string;
    option: string;
    reviewId: number;
    thumbNailURL: string;
    title: string;
  };
}

const renderStars = (count: number) => {
  const fullStars = Array(count).fill(<FullStar key="full" className="" />);
  const emptyStars = Array(5 - count).fill(<EmptyStar key="empty" className="" />);
  return [...fullStars, ...emptyStars];
};

const ReviewItem = ({ review }: ReviewItemProps) => {
  const { showInfoAlert } = useAlert();
  const handleClick = () => showInfoAlert('준비중입니다!');
  const { title, content, date, contentImgURL, countStar, ...props } = review;
  return (
    <AccordionItem value={crypto.randomUUID()}>
      <AccordionTrigger className="text-xl">{date}</AccordionTrigger>

      <AccordionContent>
        <OrderItem title={title} {...props} />

        <div className="flex justify-between items-center">
          <p className="flex items-center text-sm gap-x-2 my-[12px]">
            <span className="flex gap-x-1">{renderStars(countStar)}</span>
            <span>{date}</span>
          </p>
          <p className="flex items-center gap-x-2">
            <ThumbsUp />
            1명에게 도움이 되었습니다.
          </p>
        </div>

        <div className="grid grid-cols-[1fr_135px] gap-4 mt-[14px]">
          <p className="text-base">{content}</p>
          {contentImgURL && (
            <div className="w-[135px] h-[135px] aspect-square relative">
              <Image src={contentImgURL} alt={title} className="object-cover" fill />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-x-2">
          <Button variant="outline" onClick={handleClick}>
            수정
          </Button>
          <Button variant="outline" onClick={handleClick}>
            삭제
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ReviewItem;
