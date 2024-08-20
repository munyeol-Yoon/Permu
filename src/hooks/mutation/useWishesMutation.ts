import { deleteWishByUser, postWishByUser } from '@/api/wish';
import { Product, TWish } from '@/types/products';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthQuery from '../query/useAuthQuery';

type TWishMutation = {
  data: TWish | undefined | null;
  productId: number;
};

const useWishesMutation = ({ data, productId }: TWishMutation) => {
  const queryClient = useQueryClient();
  const { data: loggedUser } = useAuthQuery();
  const queryKeys = ['wish', 'product', 'recent', 'brand', 'order'];

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
      const isLiked = data !== null;

      await queryClient.cancelQueries({ queryKey: ['Wishes', productId, loggedUser?.id] });
      const previousWishes = queryClient.getQueryData<{ success: boolean; data: TWish; count: number }>([
        'Wishes',
        productId,
        loggedUser?.id
      ]);

      let previousProductsWish: Product[] | undefined = [];

      queryKeys.forEach((key) => {
        queryClient.cancelQueries({ queryKey: ['Products', key, loggedUser?.id] });

        const productsWishData = queryClient.getQueryData<Product[]>(['Products', key, loggedUser?.id]);

        if (productsWishData) {
          previousProductsWish = productsWishData;
        }

        queryClient.setQueryData(['Products', key, loggedUser?.id], (old: Product[]) => {
          if (!old) return old;

          const updatedProducts = old.map((product: Product) => {
            if (product.productId === productId) {
              return {
                ...product,
                Wish: isLiked ? null : { productId, userId: loggedUser?.id }
              };
            }
            return product;
          });

          return updatedProducts;
        });
      });

      queryClient.setQueryData(
        ['Wishes', productId, loggedUser?.id],
        (old: { success: boolean; data: TWish | undefined | null; count: number }) => {
          if (!old) return { success: true, data: null, count: 0 };
          return isLiked
            ? { success: true, data: null, count: old.count - 1 }
            : { success: true, data: { productId, userId: loggedUser?.id }, count: old.count + 1 };
        }
      );

      return { previousWishes, previousProductsWish };
    },
    onError: (err, addLike, context) => {
      queryClient.setQueryData(['Wishes', productId, loggedUser?.id], context?.previousWishes);

      queryKeys.forEach((key) => {
        queryClient.setQueryData(['Products', key, loggedUser?.id], context?.previousProductsWish);
      });
    }
  });

  return addMutation;
};

export default useWishesMutation;
