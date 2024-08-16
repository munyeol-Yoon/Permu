import { deleteWishByUser, postWishByUser } from '@/api/wish';
import { TWish } from '@/types/products';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthQuery from '../query/useAuthQuery';

type TWishMutation = {
  data: TWish | undefined | null;
  productId: number;
};
const useWishesMutation = ({ data, productId }: TWishMutation) => {
  const queryClient = useQueryClient();
  const { data: loggedUser } = useAuthQuery();
  const addMutation = useMutation({
    mutationFn: async () => {
      if (!loggedUser) return;
      if (!data) {
        await postWishByUser({ productId, userId: loggedUser.id });
      } else {
        await deleteWishByUser({ productId, userId: loggedUser.id });
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['Wishes', productId, loggedUser?.id] });
      const previousWishes = queryClient.getQueryData<{ success: boolean; data: TWish; count: number }>([
        'Wishes',
        productId,
        loggedUser?.id
      ]);

      const isLiked = data !== null;
      queryClient.setQueryData(
        ['Wishes', productId, loggedUser?.id],
        (old: { success: boolean; data: TWish | undefined | null; count: number }) => {
          if (!old) return { success: true, data: null, count: 0 };
          return isLiked
            ? { success: true, data: null, count: old.count - 1 } // 좋아요를 취소
            : { success: true, data: { productId, userId: loggedUser?.id }, count: old.count + 1 }; // 좋아요 추가
        }
      );
      return { previousWishes };
    },
    onSettled: () => {
      const queryKeys = ['wish', 'product', 'recent', 'brand', 'order'];
      queryKeys.forEach((key) => {
        queryClient.refetchQueries({ queryKey: ['Products', key, loggedUser?.id] });
      });
    },
    onError: (err, addLike, context) => {
      queryClient.setQueryData(['Wishes', productId, loggedUser?.id], context?.previousWishes);
    }
  });

  return addMutation;
};

export default useWishesMutation;
