import Image from 'next/image';
interface Review {
  reviewId: number;
  ImageURL: string;
  title: string;
  content: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="pr-4">
      <div className="w-full rounded overflow-hidden ">
        <div className="relative w-full h-[240px]">
          <Image src={review.ImageURL} layout="fill" alt="테스트" className="object-cover" loading="lazy" />
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-lg font-semibold">{review.title}</p>
          <p className="text-sm text-gray-600 mt-1">{review.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
