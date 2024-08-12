'use client';

import Navbar from '@/components/Navbar';
import useLocalCart from '@/hooks/useLocalCart';
import { CartAccordion, CartEmpty, CartList, CartSelector } from './_components';

const CartPage = () => {
  const { cartList, deleteCartItem, updateCartItem } = useLocalCart();

  if (!cartList.length) {
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
      <CartSelector cartList={cartList} deleteCartItem={deleteCartItem} updateCartItem={updateCartItem} />
      <CartList cartList={cartList} deleteCartItem={deleteCartItem} updateCartItem={updateCartItem} />
      <CartAccordion />
    </>
  );
};

export default CartPage;
