import { getCartsByUser } from '@/api/api.cart';
import { useQuery } from '@tanstack/react-query';

const useCartsQuery = (userId: string) => {
  const result = useQuery({
    queryKey: ['Carts', userId],
    queryFn: async () => {
      const data = await getCartsByUser(userId);
      return { data };
    }
  });
  return result;
};

export default useCartsQuery;
