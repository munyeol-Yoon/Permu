import { ReviewType } from '@/types/review';
import OptionsSVG from '@@/public/options.svg';
import Image from 'next/image';

interface ReviewProps {
  review: ReviewType;
}
const ReviewSlideCard = ({ review }: ReviewProps) => {
  return (
    <div className="w-[320px]">
      <div className="relative">
        <Image src={review.ImageURL ?? ''} width={320} height={240} alt={review.title} />
        <button className="absolute top-[10px] right-[10px] bg-white rounded-full">
          <OptionsSVG className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col">
        <p className="font-semibold text-[10px] my-[5px]">{review.title}</p>
        <span className="text-[10px]">{review.content}</span>
      </div>
    </div>
  );
};

export default ReviewSlideCard;
