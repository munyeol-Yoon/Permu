import { useCartsMutation } from './mutation';
import { useCartsQuery } from './query';

const useCart = () => {
  const { data: cartList } = useCartsQuery();

  const { addMutation, patchMutation, deleteMutation, deleteAllMutation } = useCartsMutation();

  const addCartItem = async (productId: number, userId: string) => {
    const { mutateAsync } = addMutation;
    await mutateAsync({ productId, userId });
  };

  const updateCartItemCount = async (productId: number, userId: string, count: number) => {
    const { mutateAsync } = patchMutation;
    await mutateAsync({ productId, userId, count });
  };

  const updateCartItemSelected = async (productId: number, userId: string, isSelected: boolean) => {
    const { mutateAsync } = patchMutation;
    await mutateAsync({ productId, userId, isSelected });
  };

  const deleteCartItem = async (productId: number, userId: string) => {
    const { mutateAsync } = deleteMutation;
    await mutateAsync({ productId, userId });
  };

  const deleteAllCartItem = async (userId: string) => {
    const { mutateAsync } = deleteAllMutation;
    await mutateAsync({ userId });
  };

  return { cartList, addCartItem, updateCartItemCount, updateCartItemSelected, deleteCartItem, deleteAllCartItem };
};

export default useCart;
