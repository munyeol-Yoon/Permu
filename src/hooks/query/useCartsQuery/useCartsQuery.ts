import { getCartsByUser } from '@/api/cart';
import { useQuery } from '@tanstack/react-query';

const useCartsQuery = (userId: string | null) => {
  return useQuery({
    queryKey: ['Carts', userId],
    queryFn: () => {
      if (userId) return getCartsByUser(userId);
      else return JSON.parse(localStorage.getItem('carts') || '[]');
    }
  });
};

export default useCartsQuery;
