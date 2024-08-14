import { ReviewType } from '@/types/review';

type ReviewPromiseType = {
  data: ReviewType[];
  totalCount: number;
};
type ReviewImagesPromiseType = {
  data: string[];
  totalCount: number;
};
export const getReviewsById = async ({
  productId,
  page,
  perCount,
  target,
  condition
}: {
  productId: string;
  page: number;
  perCount: number;
  target: string;
  condition: boolean;
}): Promise<ReviewPromiseType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews?productId=${productId}&page=${page}&perCount=${perCount}&target=${target}&condition=${condition}`
  );
  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};

export const getReviewsImagesById = async ({
  productId,
  limit
}: {
  productId: string;
  limit: number;
}): Promise<ReviewImagesPromiseType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/images?productId=${productId}&limit=${limit}`
  );
  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};
