import { getCartsByUser } from '@/api/cart';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useQuery } from '@tanstack/react-query';

const useCartsQuery = () => {
  const { loggedUser, isLoggedIn } = useAuth();

  return useQuery({
    queryKey: ['Carts', loggedUser?.id],
    queryFn: () => getCartsByUser(loggedUser?.id ?? ''),
    enabled: isLoggedIn
  });
};

export default useCartsQuery;
