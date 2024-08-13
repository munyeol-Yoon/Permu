import { getReviewsById } from '@/api/review';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
const useReviewsQuery = ({ page, productId, perCount }: { page: number; productId: string; perCount: number }) => {
  return useQuery({
    queryKey: ['Reviews', productId, page],
    queryFn: async () => await getReviewsById({ productId, page, perCount }),
    enabled: !!productId,
    placeholderData: keepPreviousData
  });
};

export default useReviewsQuery;
