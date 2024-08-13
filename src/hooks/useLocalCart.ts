import { useAuth } from '@/contexts/auth.context/auth.context';
import { CartItem } from '@/types/cart';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useCart from './useCart';

const useLocalCart = () => {
  const { cartList, addCartItem } = useCart();
  const { loggedUser } = useAuth();

  const [localCartList, setLocalCartList] = useState<CartItem[]>([]);

  const newCartItemList = useMemo(() => {
    return localCartList.filter(
      (localCartItem: CartItem) =>
        !cartList?.find((cartItem: CartItem) => cartItem.productId === localCartItem.productId)
    );
  }, [cartList, localCartList]);

  const updatedCartItemList = useMemo(() => {}, []);

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
  }, [cartList]);

  return { localCartList, addLocalCartItem, deleteLocalCartItem, updateLocalCartItem };
};

export default useLocalCart;
