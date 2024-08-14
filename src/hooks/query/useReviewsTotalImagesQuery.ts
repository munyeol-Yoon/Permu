import { getReviewsImagesById } from '@/api/review';
import { useQuery } from '@tanstack/react-query';
const useReviewsTotalImagesQuery = ({ productId, limit }: { productId: string; limit: number }) => {
  return useQuery({
    queryKey: ['ReviewsImages', productId, limit],
    queryFn: async () => await getReviewsImagesById({ productId, limit }),
    enabled: !!productId
  });
};

export default useReviewsTotalImagesQuery;
