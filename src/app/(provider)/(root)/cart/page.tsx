'use client';

import Navbar from '@/components/Navbar';
import { useCartsQuery } from '@/hooks/query';
import { CartAccordion, CartEmpty, CartList, CartSelector } from './_components';

const CartPage = () => {
  const { data: cartList } = useCartsQuery();

  if (!cartList?.length) {
    return (
      <>
        <Navbar title="장바구니" isHome />
        <CartEmpty />
      </>
    );
  }

  return (
    <>
      <Navbar title="장바구니" isHome />
      <CartSelector />
      <CartList />
      <CartAccordion />
    </>
  );
};

export default CartPage;
