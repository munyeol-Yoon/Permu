'use client';

import Navbar from '@/components/Navbar';
import useCart from '@/hooks/useCart';
import useLocalCart from '@/hooks/useLocalCart';
import { CartItem } from '@/types/cart';
import { useEffect } from 'react';
import { CartAccordion, CartEmpty, CartList, CartSelector } from './_components';

const CartPage = () => {
  const {
    localCartList,

    deleteLocalCartItem: deleteCartItem,
    updateLocalCartItem: updateCartItem
  } = useLocalCart();
  const { cartList } = useCart();

  useEffect(() => {
    if (cartList?.length) {
      const prevLocalCartList = localStorage.getItem('cart');

      const parsedLocalCartList = prevLocalCartList ? JSON.parse(prevLocalCartList) : [];

      const filteredCartList = cartList.filter(
        (cartItem) =>
          !parsedLocalCartList.find((localCartItem: CartItem) => localCartItem.productId === cartItem.productId)
      );

      const newCartList = [...parsedLocalCartList, ...filteredCartList];

      localStorage.setItem('cart', JSON.stringify(newCartList));
    }
  }, [cartList, localCartList]);

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
