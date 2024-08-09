import { getWishById } from '@/api/wish';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { TWishId } from '@/types/products';
import { useQuery } from '@tanstack/react-query';

const useWishesQuery = ({ productId }: TWishId) => {
  const { loggedUser } = useAuth();
  return useQuery({
    queryKey: ['Wishes', productId, loggedUser?.id],
    queryFn: async () => await getWishById({ productId, userId: loggedUser?.id })
  });
};

export default useWishesQuery;
