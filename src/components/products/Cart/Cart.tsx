'use client';

import useCartsMutation from '@/hooks/mutation/useCartsMutation';
import useCartsQuery from '@/hooks/query/useCartsQuery';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Cart = () => {
  const { productId } = useParams<{ productId: string }>();
  const userId = 'c7b26340-92fc-4dc3-91ec-5151091251f2';

  const { data: carts } = useCartsQuery(userId);

  const { addMutation, patchMutation } = useCartsMutation();
  const handlePostCart = () => {
    if (confirm('장바구니에 넣으시겠습니까 ?')) {
      const matchCartProduct = carts?.data.find((cart: any) => cart.productId == productId);
      if (matchCartProduct) patchMutation.mutate({ productId, userId, count: matchCartProduct.count + 1 });
      else addMutation.mutate({ productId, userId });
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
