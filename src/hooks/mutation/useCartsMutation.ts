import { deleteAllCartByUser, deleteCartByUser, patchCartByUser, postCartByUser } from '@/api/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCartsMutation = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async ({ productId, volume, userId }: { productId: number; volume: string; userId: string }) =>
      await postCartByUser(productId, volume, userId),
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['Carts', variable.userId] });
      queryClient.invalidateQueries({ queryKey: ['orderInfo', variable.userId] });
    }
  });

  const patchMutation = useMutation({
    mutationFn: async ({
      productId,
      userId,
      count,
      volume,
      isSelected
    }: {
      productId: number;
      userId: string;
      count?: number;
      volume?: string;
      isSelected?: boolean;
    }) => await patchCartByUser({ userId, productId, count, isSelected, volume }),
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['Carts', variable.userId] });
      queryClient.invalidateQueries({ queryKey: ['orderInfo', variable.userId] });
    }
    // patchCartByUser({ productId, userId, count: cal ? count + 1 : count - 1 }),
    // onMutate: async (variable) => {
    //   await queryClient.cancelQueries({ queryKey: ['Carts', variable.userId] });
    //   const previousCarts = queryClient.getQueryData<any[]>(['Carts', variable.userId]);

    //   queryClient.setQueryData(['Carts', variable.userId], () => {
    //     const filteredOldCarts = previousCarts?.map((cart: any) => {
    //       return cart.productId === variable.productId
    //         ? { ...cart, count: variable.cal ? variable.count + 1 : variable.count - 1 }
    //         : cart;
    //     });
    //     return filteredOldCarts;
    //   });
    //   return { previousCarts };
    // },
    // onError: (err, addCart, context) => {
    //   queryClient.setQueryData(['Carts', addCart.userId], context?.previousCarts);
    // }
  });

  const deleteAllMutation = useMutation({
    mutationFn: async ({ userId }: { userId: string }) => await deleteAllCartByUser(userId),
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['Carts', variable.userId] });
      queryClient.invalidateQueries({ queryKey: ['orderInfo', variable.userId] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ productId, userId }: { productId: number; userId: string }) =>
      await deleteCartByUser(productId, userId),
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['Carts', variable.userId] });
      queryClient.invalidateQueries({ queryKey: ['orderInfo', variable.userId] });
    }
  });
  return { addMutation, patchMutation, deleteAllMutation, deleteMutation };
};

export default useCartsMutation;
