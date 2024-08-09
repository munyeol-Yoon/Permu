import { deleteWishByUser, postWishByUser } from '@/api/wish';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { TWish } from '@/types/products';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type TWishMutation = {
  getLikes: { data: TWish[]; userLike: boolean };
  productId: number;
};
const useWishesMutation = ({ getLikes, productId }: TWishMutation) => {
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
      const previousWishes = queryClient.getQueryData<{ data: TWish[] }>(['Wishes', productId]);

      queryClient.setQueryData(['Wishes', productId], () => {
        return !getLikes?.userLike
          ? { data: [...(previousWishes?.data || []), { productId, userId: loggedUser?.id }], userLike: true }
          : {
              data: previousWishes?.data?.filter((like: TWish) => !(like.userId === `${loggedUser?.id}`)) || [],
              userLike: false
            };
      });

      return { previousWishes };
    },
    onSuccess: () => {
      const queryKeys = ['wish', 'product', 'recent', 'brand', 'order'];
      queryKeys.forEach((key) => {
        queryClient.refetchQueries({ queryKey: ['Products', key, loggedUser?.id] });
      });
    },
    onError: (err, addLike, context) => {
      queryClient.setQueryData(['Wishes', productId], context?.previousWishes);
    }
  });

  return addMutation;
};

export default useWishesMutation;
