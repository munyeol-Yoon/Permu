import { ReviewType } from '@/types/review';

type ReviewPromiseType = {
  data: ReviewType[];
  totalCount: number;
};
export const getReviewsById = async ({
  productId,
  page,
  perCount
}: {
  productId: string;
  page: number;
  perCount: number;
}): Promise<ReviewPromiseType> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews?productId=${productId}&page=${page}&perCount=${perCount}`
  );
  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};
