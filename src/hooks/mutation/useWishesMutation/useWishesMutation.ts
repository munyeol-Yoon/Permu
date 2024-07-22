import { deleteWishByUser, postWishByUser } from '@/api/api.wish';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type TWish =
  | {
      data: { productId: number; userId: string }[] | null;
      userLike: boolean;
    }
  | undefined;

const useWishesMutation = ({ getLikes, productId, userId }: { getLikes: TWish; productId: number; userId: string }) => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async () => {
      if (!getLikes?.userLike) {
        await postWishByUser(productId, userId);
      } else {
        await deleteWishByUser(productId, userId);
      }
    },
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
