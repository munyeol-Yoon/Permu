import { deleteWishByUser, postWishByUser } from '@/api/wish';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type TWish = {
  data: { productId: number; userId: string }[] | undefined;
  userLike: boolean;
};

const useWishesMutation = ({ getLikes, productId }: { getLikes: TWish; productId: number }) => {
  const queryClient = useQueryClient();
  const { loggedUser } = useAuth();
  const addMutation = useMutation({
    mutationFn: async () => {
      if (!loggedUser) return;
      if (!getLikes?.userLike) {
        await postWishByUser({ productId, userId: loggedUser.id });
      } else {
        await deleteWishByUser({ productId, userId: loggedUser.id });
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['Wishes', productId] });
      const previousWishes = queryClient.getQueryData<TWish>(['Wishes', productId]);

      queryClient.setQueryData(['Wishes', productId], () => {
        return !getLikes?.userLike
          ? { data: [...(previousWishes?.data || []), { productId, userId: loggedUser?.id }], userLike: true }
          : {
              data: previousWishes?.data?.filter((like) => !(like.userId === `${loggedUser?.id}`)) || [],
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
