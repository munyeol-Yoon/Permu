'use client';

import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useCartsMutation } from '@/hooks/mutation';
import { useCartsQuery } from '@/hooks/query';
import useLocalCart from '@/hooks/useLocalCart';
import { CartItem } from '@/types/cart';
import { useCallback, useEffect, useMemo } from 'react';
import { CartAccordion, CartEmpty, CartList, CartSelector } from './_components';

const CartPage = () => {
  const {
    localCartList,
    setLocalCartList,
    deleteLocalCartItem: deleteCartItem,
    updateLocalCartItem: updateCartItem
  } = useLocalCart();
  const { loggedUser } = useAuth();
  const { data: cartList } = useCartsQuery();
  const { addMutation, patchMutation, deleteMutation } = useCartsMutation();

  const newCartItem = useMemo(() => {
    return localCartList.filter(
      (localCartItem) => !cartList?.find((cartItem) => localCartItem.productId === cartItem.productId)
    );
  }, [cartList, localCartList]);

  const updatedCartItem = useMemo(() => {
    return localCartList.filter((localCartItem) =>
      cartList?.find((cartItem) => {
        return (
          localCartItem.productId === cartItem.productId &&
          (localCartItem.productCount !== cartItem.productCount ||
            localCartItem.productSelectedVolume !== cartItem.productSelectedVolume ||
            localCartItem.productSelected !== cartItem.productSelected)
        );
      })
    );
  }, [cartList, localCartList]);

  const deletedCartItem = useMemo(() => {
    return cartList?.filter(
      (cartItem) => !localCartList.find((localCartItem) => localCartItem.productId === cartItem.productId)
    );
  }, [cartList, localCartList]);

  const syncCartData = useCallback(() => {
    if (loggedUser) {
      if (localCartList.length || cartList?.length) {
        if (newCartItem.length) {
          newCartItem.forEach((cartItem) => {
            addMutation.mutate({
              productId: cartItem.productId,
              userId: loggedUser.id,
              volume: cartItem.productSelectedVolume
            });
          });
        }

        if (updatedCartItem.length) {
          updatedCartItem.forEach((cartItem) => {
            patchMutation.mutate({
              productId: cartItem.productId,
              userId: loggedUser.id,
              count: cartItem.productCount,
              isSelected: cartItem.productSelected,
              volume: cartItem.productSelectedVolume
            });
          });
        }

        if (deletedCartItem?.length) {
          deletedCartItem.forEach((cartItem) => {
            deleteMutation.mutate({
              productId: cartItem.productId,
              userId: loggedUser.id
            });
          });
        }
      }
    }
  }, [
    addMutation,
    cartList,
    deleteMutation,
    deletedCartItem,
    localCartList,
    loggedUser,
    newCartItem,
    patchMutation,
    updatedCartItem
  ]);

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
      setLocalCartList(newCartList);
    } else {
      const prevCartList = localStorage.getItem('cart');
      if (prevCartList) {
        const parsedPrevCartList = JSON.parse(prevCartList);
        setLocalCartList(parsedPrevCartList);
      }
    }
  }, [cartList, setLocalCartList]);

  useEffect(() => {
    return () => {
      if (cartList?.length || localCartList.length) {
        syncCartData();
      }
    };
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
