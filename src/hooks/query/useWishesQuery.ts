import { getWishById } from '@/api/wish';
import { TWish } from '@/types/products';
import { useQuery } from '@tanstack/react-query';
import useAuthQuery from './useAuthQuery';

const useWishesQuery = (productId: TWish['productId']) => {
  const { data: loggedUser } = useAuthQuery();
  return useQuery({
    queryKey: ['Wishes', productId, loggedUser?.id],
    queryFn: async () => await getWishById({ productId, userId: loggedUser?.id })
  });
};

export default useWishesQuery;
