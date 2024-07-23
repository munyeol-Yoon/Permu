import { getWishesByUser } from '@/api/wish';
import { useQuery } from '@tanstack/react-query';

const useWishesQuery = ({ productId, userId }: { productId: number; userId: string }) => {
  const result = useQuery({
    queryKey: ['Wishes', productId],
    queryFn: async () => {
      const data = await getWishesByUser(productId, userId);
      const userLike = !!data?.find((like: Wish) => like.userId === userId);
      return { data, userLike };
    }
  });
  return result;
};

export default useWishesQuery;
