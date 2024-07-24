import { deleteAllCartByUser, deleteCartByUser, patchCartByUser, postCartByUser } from '@/api/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCartsMutation = () => {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: async ({ productId, userId }: { productId: number; userId: string }) =>
      await postCartByUser(productId, userId),
    onSuccess: (data, variable) => {
      queryClient.refetchQueries({ queryKey: ['Carts', variable.userId] });
    },
    onError: () => {}
  });
  const patchMutation = useMutation({
    mutationFn: async ({
      productId,
      userId,
      count,
      cal
    }: {
      productId: number;
      userId: string;
      count: number;
      cal: boolean;
    }) => {
      if (userId) {
        if (cal) await patchCartByUser(productId, userId, count + 1);
        else await patchCartByUser(productId, userId, count - 1);
      }
    },
    onMutate: async (variable) => {
      await queryClient.cancelQueries({ queryKey: ['Carts', variable.userId] });
      const previousCarts = queryClient.getQueryData<Cart[]>(['Carts', variable.userId]);

      queryClient.setQueryData(['Carts', variable.userId], () => {
        const filteredOldCarts = previousCarts?.map((cart: Cart) => {
          return cart.productId === variable.productId
            ? { ...cart, count: variable.cal ? variable.count + 1 : variable.count - 1 }
            : cart;
        });
        return filteredOldCarts;
      });

      return { previousCarts };
    },
    onError: (err, addCart, context) => {
      queryClient.setQueryData(['Carts', addCart.userId], context?.previousCarts);
    }
  });
  const deleteAllMutation = useMutation({
    mutationFn: async ({ userId }: { userId: string }) => await deleteAllCartByUser(userId),
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['Carts', variable.userId] });
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async ({ productId, userId }: { productId: number; userId: string }) =>
      await deleteCartByUser(productId, userId),
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['Carts', variable.userId] });
    }
  });
  return { addMutation, patchMutation, deleteAllMutation, deleteMutation };
};

export default useCartsMutation;
