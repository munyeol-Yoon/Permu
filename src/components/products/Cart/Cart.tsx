'use client';
import { Button } from '@/components/ui/button';
import useCartsMutation from '@/hooks/mutation/useCartsMutation';
import useCartsQuery from '@/hooks/query/useCartsQuery';
import { useParams, useRouter } from 'next/navigation';

const Cart = () => {
  const router = useRouter();
  const { productId } = useParams<{ productId: string }>();
  const userId = 'c7b26340-92fc-4dc3-91ec-5151091251f2';
  // const localCarts = JSON.parse(localStorage.getItem('carts') || '[]');
  const { data: carts } = useCartsQuery(userId);
  const displayedCarts = carts;
  // const displayedCarts = userId ? carts?.details : localCarts;

  const { addMutation, patchMutation } = useCartsMutation();

  const handlePostCart = async () => {
    if (confirm('장바구니에 넣으시겠습니까 ?')) {
      const matchCartProduct = displayedCarts?.find((cart: Cart) => cart.productId === Number(productId));

      if (matchCartProduct)
        if (userId)
          patchMutation.mutate({ productId: Number(productId), userId, cal: true, count: matchCartProduct.count });
        else {
          // const updatedCarts = displayedCarts.map((cart: Cart) => {
          //   if (cart.productId === Number(productId)) {
          //     return { ...cart, count: cart.count + 1 };
          //   }
          //   return cart;
          // });
          // localStorage.setItem('carts', JSON.stringify(updatedCarts));
        }
      else {
        if (userId) addMutation.mutate({ productId: Number(productId), userId });
        else {
          // const product = await fetchDetailProduct({ params: { productId } });
          // localStorage.setItem(
          //   'carts',
          //   JSON.stringify(
          //     displayedCarts.concat({
          //       productId: Number(productId),
          //       userId,
          //       count: 1,
          //       Products: product
          //     })
          //   )
          // );
        }
      }

      //성공 메시지를 받아야 함!!!
      if (confirm('장바구니에 담기를 성공했습니다 장바구니로 가시겠습니까?')) {
        router.push('/cart');
      }
    }
  };
  return (
    <Button variant="secondary" onClick={handlePostCart}>
      쇼핑백에 추가
    </Button>
  );
};

export default Cart;
