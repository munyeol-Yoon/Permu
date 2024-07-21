import { getWishesByUser } from '@/api/product';
import { useQuery } from '@tanstack/react-query';

const useWishesQuery = (productId: string, userId: string) => {
  const result = useQuery({
    queryKey: ['Wishes', productId, userId],
    queryFn: async () => await getWishesByUser(productId, userId)
  });
  return result;
};

export default useWishesQuery;
