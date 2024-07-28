import { getCartsByUser } from '@/api/cart';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useQuery } from '@tanstack/react-query';

const useCartsQuery = () => {
  const { loggedUser } = useAuth();
  const userId = loggedUser?.id;
  return useQuery({
    queryKey: ['Carts', userId],
    queryFn: () => getCartsByUser(userId ?? '')
  });
};

export default useCartsQuery;
