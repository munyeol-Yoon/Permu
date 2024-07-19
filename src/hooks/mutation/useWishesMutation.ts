import supabase from '@/api/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type TWish =
  | {
      data: { productId: string; userId: string }[] | null;
      userLike: boolean;
    }
  | undefined;

const handleAddLike = async (getLikes: TWish, productId: string, userId: string): Promise<void> => {
  if (!getLikes?.userLike) {
    const { error } = await supabase.from('Wishes').insert({ productId, userId });
    if (error) throw error;
  } else {
    const { error } = await supabase.from('Wishes').delete().eq('userId', userId).eq('productId', productId);
    if (error) throw error;
  }
};

const useWishesMutation = (getLikes: TWish, productId: string, userId: string) => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: () => handleAddLike(getLikes, productId, userId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['Wishes', productId] });
      const previousWishes = queryClient.getQueryData<TWish>(['Wishes', productId]);

      queryClient.setQueryData(['Wishes', productId], () => {
        return !getLikes?.userLike
          ? { data: [...(previousWishes?.data || []), { productId, userId }], userLike: true }
          : {
              data: previousWishes?.data?.filter((like) => !(like.userId === userId)) || [],
              userLike: false
            };
      });

      return { previousWishes };
    },
    onError: (err, addLike, context) => {
      queryClient.setQueryData(['Wishes', productId], context?.previousWishes);
    }
  });

  return addMutation;
};

export default useWishesMutation;
