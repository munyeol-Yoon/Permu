'use client';

import { useCartsQuery } from '@/hooks/query';
import CartEmpty from './CartEmpty';
import CartItem from './CartItem';

const CartList = () => {
  const { data: cartList } = useCartsQuery();

  if (cartList && !cartList.length) {
    return <CartEmpty />;
  }

  return (
    <ul className="flex flex-col gap-5">
      {cartList?.map((cartItem) => <CartItem key={cartItem.productId} cartItem={cartItem} />)}
    </ul>
  );
};

export default CartList;