import { getCartsByUser } from '@/api/cart';
import { useQuery } from '@tanstack/react-query';
import useAuthQuery from './useAuthQuery';

const useCartsQuery = () => {
  const { data: loggedUser } = useAuthQuery();

  return useQuery({
    queryKey: ['Carts', loggedUser?.id],
    queryFn: () => getCartsByUser(loggedUser?.id ?? ''),
    enabled: !!loggedUser
  });
};

export default useCartsQuery;
