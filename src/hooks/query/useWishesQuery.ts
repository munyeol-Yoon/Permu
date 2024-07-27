import { getWishById } from '@/api/wish';
import { TWishId } from '@/types/products';
import { useQuery } from '@tanstack/react-query';

const useWishesQuery = ({ productId }: TWishId) => {
  return useQuery({
    queryKey: ['Wishes', productId],
    queryFn: async () => {
      const data = await getWishById({ productId });

      return { data };
    },
    enabled: !!productId
  });
};

export default useWishesQuery;
