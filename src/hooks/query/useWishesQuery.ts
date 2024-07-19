import supabase from '@/api/supabase';
import { useQuery } from '@tanstack/react-query';

const useWishesQuery = (productId: string, userId: string) => {
  const result = useQuery({
    queryKey: ['Wishes', productId],
    queryFn: async () => {
      const { data, error } = await supabase.from('Wishes').select('*').eq('productId', productId);
      const userLike = !!data?.find((like) => like.userId === userId);
      if (error) console.error(error);
      return { data, userLike };
    }
  });
  return result;
};

export default useWishesQuery;
