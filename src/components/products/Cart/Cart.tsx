'use client';

import useCartsMutation from '@/hooks/mutation/useCartsMutation';
import useCartsQuery from '@/hooks/query/useCartsQuery';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const Cart = () => {
  const router = useRouter();
  const { productId } = useParams<{ productId: string }>();
  const userId = 'c7b26340-92fc-4dc3-91ec-5151091251f2';

  const { data: carts } = useCartsQuery(userId);

  const { addMutation, patchMutation } = useCartsMutation();
  const handlePostCart = () => {
    if (confirm('장바구니에 넣으시겠습니까 ?')) {
      const matchCartProduct = carts?.data.find((cart: Cart) => cart.productId === Number(productId));
      if (matchCartProduct)
        patchMutation.mutate({ productId: Number(productId), userId, cal: true, count: matchCartProduct.count });
      else addMutation.mutate({ productId: Number(productId), userId });

      //성공 메시지를 받아야 함!!!
      if (confirm('장바구니에 담기를 성공했습니다 장바구니로 가시겠습니까?')) {
        router.push('/cart');
      }
    }
  };
  return (
    <>
      <button onClick={handlePostCart}>장바구니 넣기</button>
      <Link href="/order/delivery">바로 구매하기</Link>
    </>
  );
};

export default Cart;
