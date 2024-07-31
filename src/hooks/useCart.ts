import { useCallback } from 'react';
import { useCartsMutation } from './mutation';
import { useCartsQuery } from './query';

const useCart = () => {
  const { data: cartList } = useCartsQuery();

  const { addMutation, patchMutation, deleteMutation, deleteAllMutation } = useCartsMutation();

  const addCartItem = useCallback(
    async (productId: number, userId: string) => {
      const { mutateAsync } = addMutation;
      await mutateAsync({ productId, userId });
    },
    [addMutation]
  );

  const updateCartItemCount = useCallback(
    async (productId: number, userId: string, count: number) => {
      const { mutateAsync } = patchMutation;
      await mutateAsync({ productId, userId, count });
    },
    [patchMutation]
  );

  const updateCartItemSelected = useCallback(
    async (productId: number, userId: string, isSelected: boolean) => {
      const { mutateAsync } = patchMutation;
      await mutateAsync({ productId, userId, isSelected });
    },
    [patchMutation]
  );

  const deleteCartItem = useCallback(
    async (productId: number, userId: string) => {
      const { mutateAsync } = deleteMutation;
      await mutateAsync({ productId, userId });
    },
    [deleteMutation]
  );

  const deleteAllCartItem = useCallback(
    async (userId: string) => {
      const { mutateAsync } = deleteAllMutation;
      await mutateAsync({ userId });
    },
    [deleteAllMutation]
  );

  return { cartList, addCartItem, updateCartItemCount, updateCartItemSelected, deleteCartItem, deleteAllCartItem };
};

export default useCart;
