import { patchCartByUser, postCartByUser } from '@/api/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCartsMutation = () => {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: async ({
      productId,
      userId,
      cal,
      count
    }: {
      productId: string;
      userId: string;
      cal: boolean | null;
      count: number;
    }) => {
      if (cal == null) await postCartByUser(productId, userId, count);
      else await patchCartByUser(productId, userId, count);
    },
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['Carts', variable.userId] });
    },
    onError: () => {}
  });
  return addMutation;
};

export default useCartsMutation;
