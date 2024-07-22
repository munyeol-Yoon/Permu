import { deleteAllCartByUser, deleteCartByUser, patchCartByUser, postCartByUser } from '@/api/api.cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCartsMutation = () => {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: async ({ productId, userId }: { productId: string; userId: string }) => {
      await postCartByUser(productId, userId);
    },
    onSuccess: (data, variable) => {
      queryClient.refetchQueries({ queryKey: ['Carts', variable.userId] });
    },
    onError: () => {}
  });
  const patchMutation = useMutation({
    mutationFn: async ({ productId, userId, count }: { productId: string; userId: string; count: number }) => {
      await patchCartByUser(productId, userId, count);
    },
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['Carts', variable.userId] });
    }
  });
  const deleteAllMutation = useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      await deleteAllCartByUser(userId);
    },
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['Carts', variable.userId] });
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async ({ productId, userId }: { productId: string; userId: string }) => {
      await deleteCartByUser(productId, userId);
    },
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['Carts', variable.userId] });
    }
  });
  return { addMutation, patchMutation, deleteAllMutation, deleteMutation };
};

export default useCartsMutation;
