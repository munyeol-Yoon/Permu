'use client';

import Navbar from '@/components/Navbar';
import useLocalCart from '@/hooks/useLocalCart';
import { CartAccordion, CartEmpty, CartList, CartSelector } from './_components';

const CartPage = () => {
  const { localCartList, deleteLocalCartItem: deleteCartItem, updateLocalCartItem: updateCartItem } = useLocalCart();

  if (!localCartList.length) {
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
      <CartSelector cartList={localCartList} deleteCartItem={deleteCartItem} updateCartItem={updateCartItem} />
      <CartList cartList={localCartList} deleteCartItem={deleteCartItem} updateCartItem={updateCartItem} />
      <CartAccordion cartList={localCartList} />
    </>
  );
};

export default CartPage;
