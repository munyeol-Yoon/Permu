import { getWishByUser } from '@/api/wish';
import { useQuery } from '@tanstack/react-query';

const useWishesQuery = ({ productId, userId }: { productId: number; userId: string | null }) => {
  return useQuery({
    queryKey: ['Wishes', productId],
    queryFn: async () => {
      const data = await getWishByUser({ productId, userId });
      const userLike = !!data?.find((like: Wish) => like.userId === `${userId}`);

      return { data, userLike };
    }
  });
};

export default useWishesQuery;
