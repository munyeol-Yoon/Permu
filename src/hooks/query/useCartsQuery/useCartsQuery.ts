import { getCartsByUser } from '@/api/cart';
import { useQuery } from '@tanstack/react-query';

const useCartsQuery = (userId: string) => {
  return useQuery({
    queryKey: ['Carts', userId],
    queryFn: () => getCartsByUser(userId)
  });
};

export default useCartsQuery;
