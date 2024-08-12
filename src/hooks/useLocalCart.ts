import { useCallback, useEffect, useState } from 'react';

export interface LocalCart {
  productId: number;
  productName: string;
  productBrandName: string;
  productVolume: string[];
  productCount: number;
  productPrice: number;
  productDiscountedPrice: number;
  productDiscountPercentage: number;
  productThumbnailURL: string;
  productSelected: boolean;
  productSelectedVolume: string;
}

const useLocalCart = () => {
  const [cartList, setCartList] = useState<LocalCart[]>([]);

  const addCartItem = useCallback((cartItem: LocalCart) => {
    const prevCartList = localStorage.getItem('cart');

    if (prevCartList) {
      const parsedPrevCartList = JSON.parse(prevCartList);
      localStorage.setItem('cart', JSON.stringify([...parsedPrevCartList, cartItem]));
    } else {
      localStorage.setItem('cart', JSON.stringify([cartItem]));
    }
  }, []);

  const deleteCartItem = useCallback((productId: number) => {
    const prevCartList = localStorage.getItem('cart');

    if (prevCartList) {
      const parsedPrevCartList = JSON.parse(prevCartList);
      const filteredCartList = parsedPrevCartList.filter((cartItem: LocalCart) => cartItem.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(filteredCartList));
      setCartList(filteredCartList);
    }
  }, []);

  const updateCartItem = useCallback((newCartItem: LocalCart) => {
    const prevCartList = localStorage.getItem('cart');

    if (prevCartList) {
      const parsedPrevCartList = JSON.parse(prevCartList);
      const updatedCartList = parsedPrevCartList.map((cartItem: LocalCart) =>
        cartItem.productId === newCartItem.productId ? newCartItem : cartItem
      );
      localStorage.setItem('cart', JSON.stringify(updatedCartList));
      setCartList(updatedCartList);
    }
  }, []);

  useEffect(() => {
    const prevCartList = localStorage.getItem('cart');
    if (prevCartList) {
      const parsedPrevCartList = JSON.parse(prevCartList);
      setCartList(parsedPrevCartList);
    }
  }, []);

  return { cartList, addCartItem, deleteCartItem, updateCartItem };
};

export default useLocalCart;
