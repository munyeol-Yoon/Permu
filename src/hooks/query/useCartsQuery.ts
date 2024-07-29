import { getCartsByUser } from '@/api/cart';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useQuery } from '@tanstack/react-query';

const useCartsQuery = () => {
  const { loggedUser } = useAuth();

  return useQuery({
    queryKey: ['Carts', loggedUser?.id],
    queryFn: () => getCartsByUser(loggedUser?.id ?? '')
  });
};

export default useCartsQuery;
