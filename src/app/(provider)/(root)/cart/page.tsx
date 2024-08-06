'use client';

import Navbar from '@/components/Navbar';
import { useCartsQuery } from '@/hooks/query';
import { CartAccordion, CartEmpty, CartList, CartSelector } from './_components';

const CartPage = () => {
  const { data: cartList } = useCartsQuery();

  if (!cartList) {
    return <CartEmpty />;
  }

  return (
    <div className="relative max-w-[600px] flex flex-col h-full">
      <Navbar title="장바구니" isHome />
      <CartSelector />
      <CartList />
      <CartAccordion />
    </div>
  );
};

export default CartPage;
