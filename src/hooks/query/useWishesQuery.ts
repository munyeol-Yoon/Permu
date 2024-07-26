import { getWishById } from '@/api/wish';
import { useQuery } from '@tanstack/react-query';

const useWishesQuery = ({ productId }: { productId: number }) => {
  return useQuery({
    queryKey: ['Wishes', productId],
    queryFn: async () => {
      const data = await getWishById({ productId });

      return { data };
    }
  });
};

export default useWishesQuery;
