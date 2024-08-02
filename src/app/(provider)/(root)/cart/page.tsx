'use client';

import { useCartsQuery } from '@/hooks/query';
import { CartDrawer, CartEmpty, CartList, CartSelector } from './_components';

const CartPage = () => {
  const { data: cartList } = useCartsQuery();

  if (!cartList) {
    return <CartEmpty />;
  }

  return (
    <div className="max-w-[600px] flex flex-col h-full">
      <CartSelector />
      <CartList />
      <CartDrawer />
    </div>
  );
};

export default CartPage;
