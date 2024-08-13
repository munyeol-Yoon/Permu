import { getReviewsById } from '@/api/review';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
const useReviewsQuery = ({ page, productId }: { page: number; productId: string }) => {
  return useQuery({
    queryKey: ['Reviews', productId, page],
    queryFn: async () => await getReviewsById({ page, productId }),
    enabled: !!productId,
    placeholderData: keepPreviousData
  });
};

export default useReviewsQuery;
