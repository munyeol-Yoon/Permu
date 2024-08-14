import { getReviewsById } from '@/api/review';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

type ReviewFactorType = {
  page: number;
  productId: string;
  perCount: number;
  target: string;
  condition: boolean;
};
const useReviewsQuery = ({ page, productId, perCount, target, condition }: ReviewFactorType) => {
  return useQuery({
    queryKey: ['Reviews', productId, page, target, condition],
    queryFn: async () => await getReviewsById({ productId, page, perCount, target, condition }),
    enabled: !!productId,
    placeholderData: keepPreviousData
  });
};

export default useReviewsQuery;
