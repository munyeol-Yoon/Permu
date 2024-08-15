import { CartItem } from '@/types/cart';
import { useCallback, useEffect, useState } from 'react';
import { useCartsQuery } from './query';
import useAuthQuery from './query/useAuthQuery';

const useLocalCart = () => {
  const [localCartList, setLocalCartList] = useState<CartItem[]>([]);
  const { data: cartList } = useCartsQuery();
  const { data: userInfo } = useAuthQuery();

  const addLocalCartItem = useCallback((cartItem: CartItem) => {
    const prevCartList = localStorage.getItem('cart');

    if (prevCartList) {
      const parsedPrevCartList = JSON.parse(prevCartList);
      localStorage.setItem('cart', JSON.stringify([...parsedPrevCartList, cartItem]));
      setLocalCartList([...parsedPrevCartList, cartItem]);
    } else {
      localStorage.setItem('cart', JSON.stringify([cartItem]));
      setLocalCartList([cartItem]);
    }
  }, []);

  const deleteLocalCartItem = useCallback((productId: number) => {
    const prevCartList = localStorage.getItem('cart');

    if (prevCartList) {
      const parsedPrevCartList = JSON.parse(prevCartList);
      const filteredCartList = parsedPrevCartList.filter((cartItem: CartItem) => cartItem.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(filteredCartList));
      setLocalCartList(filteredCartList);
    }
  }, []);

  const updateLocalCartItem = useCallback((newCartItem: CartItem) => {
    const prevCartList = localStorage.getItem('cart');

    if (prevCartList) {
      const parsedPrevCartList = JSON.parse(prevCartList);
      const updatedCartList = parsedPrevCartList.map((cartItem: CartItem) =>
        cartItem.productId === newCartItem.productId ? newCartItem : cartItem
      );
      localStorage.setItem('cart', JSON.stringify(updatedCartList));
      setLocalCartList(updatedCartList);
    }
  }, []);

  useEffect(() => {
    const prevCartList = localStorage.getItem('cart');
    if (prevCartList) {
      const parsedPrevCartList = JSON.parse(prevCartList);
      setLocalCartList(parsedPrevCartList);
    } else if (userInfo && cartList?.length) {
      const prevLocalCartList = localStorage.getItem('cart');

      const parsedLocalCartList = prevLocalCartList ? JSON.parse(prevLocalCartList) : [];

      const filteredCartList = cartList.filter(
        (cartItem) =>
          !parsedLocalCartList.find((localCartItem: CartItem) => localCartItem.productId === cartItem.productId)
      );

      const newCartList = [...parsedLocalCartList, ...filteredCartList];

      localStorage.setItem('cart', JSON.stringify(newCartList));
      setLocalCartList(newCartList);
    }
  }, [cartList, userInfo]);

  return { localCartList, setLocalCartList, addLocalCartItem, deleteLocalCartItem, updateLocalCartItem };
};

export default useLocalCart;
