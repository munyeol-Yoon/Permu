'use client';

import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/auth.context/auth.context';
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
  const { cartList, addCartItem } = useCart();
  const { loggedUser } = useAuth();

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

    return () => {
      if (cartList?.length) {
        const prevLocalCartList = localStorage.getItem('cart');

        const parsedLocalCartList = prevLocalCartList ? JSON.parse(prevLocalCartList) : [];
        const filteredCartList = parsedLocalCartList.filter(
          (cartItem: CartItem) =>
            !cartList.find((localCartItem: CartItem) => localCartItem.productId === cartItem.productId)
        );
        filteredCartList.forEach((cartItem: CartItem) =>
          addCartItem(cartItem.productId, loggedUser!.id, cartItem.productSelectedVolume)
        );
      }
    };
  }, [addCartItem, cartList, localCartList, loggedUser]);

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
