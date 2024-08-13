import { ReviewType } from '@/types/review';

type ReviewPromiseType = {
  data: ReviewType[];
  count: number;
};
export const getReviewsById = async ({
  productId,
  page
}: {
  productId: string;
  page: number;
}): Promise<ReviewPromiseType> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews?productId=${productId}&page=${page}`);
  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};
