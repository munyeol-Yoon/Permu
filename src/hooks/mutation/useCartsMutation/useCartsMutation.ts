import { deleteAllCartByUser, deleteCartByUser, patchCartByUser, postCartByUser } from '@/api/cart';
import { getProductById } from '@/api/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCartsMutation = () => {
  const queryClient = useQueryClient();
  const localCarts = JSON.parse(localStorage.getItem('carts') || '[]');
  const addMutation = useMutation({
    mutationFn: async ({ productId, userId }: { productId: number; userId: string | null }) => {
      if (userId) {
        await postCartByUser(productId, userId);
      } else {
        const product = await getProductById({ params: { productId } });
        localStorage.setItem(
          'carts',
          JSON.stringify(
            localCarts.concat({
              productId,
              userId,
              count: 1,
              select: false,
              Products: product
            })
          )
        );
      }
    },
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
      userId: string | null;
      count: number;
      cal: boolean;
    }) => {
      if (userId) {
        if (cal) await patchCartByUser(productId, userId, count + 1);
        else await patchCartByUser(productId, userId, count - 1);
      } else {
        const updatedCarts = localCarts.map((cart: Cart) => {
          if (cart.productId === productId) {
            return { ...cart, count: cal ? count + 1 : count - 1 };
          }
          return cart;
        });

        localStorage.setItem('carts', JSON.stringify(updatedCarts));
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
    mutationFn: async ({ userId }: { userId: string | null }) => {
      if (userId) await deleteAllCartByUser(userId);
      else localStorage.removeItem('carts');
    },
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['Carts', variable.userId] });
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async ({ productId, userId }: { productId: number; userId: string | null }) => {
      if (userId) await deleteCartByUser(productId, userId);
      else
        localStorage.setItem('carts', JSON.stringify(localCarts.filter((cart: Cart) => cart.productId !== productId)));
    },
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['Carts', variable.userId] });
    }
  });
  return { addMutation, patchMutation, deleteAllMutation, deleteMutation };
};

export default useCartsMutation;
