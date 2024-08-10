import reviews from '@@/src/mockup/review.json';
import { useQuery } from '@tanstack/react-query';
const useReviewsQuery = (productId: string) => {
  return useQuery({
    queryKey: ['Reviews', productId],
    queryFn: async () => {
      return reviews.filter((review) => review.productId === Number(productId));
    }
  });
};

export default useReviewsQuery;
