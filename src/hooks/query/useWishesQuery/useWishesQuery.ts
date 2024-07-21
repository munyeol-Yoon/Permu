import { getWishesByUser } from '@/api/product';
import { useQuery } from '@tanstack/react-query';

const useWishesQuery = (productId: string, userId: string) => {
  const result = useQuery({
    queryKey: ['Wishes', productId],
    queryFn: async () => {
      const data = await getWishesByUser(productId, userId);
      const userLike = !!data?.find(
        (like: { wishId: string; productId: string; userId: string }) => like.userId === userId
      );
      return { data, userLike };
    }
  });
  return result;
};

export default useWishesQuery;
