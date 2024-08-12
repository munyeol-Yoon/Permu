'use client';

import { LocalCart } from '@/hooks/useLocalCart';
import CartItem from './CartItem';

interface CartListProps {
  cartList: LocalCart[];
  updateCartItem: (newCartItem: LocalCart) => void;
  deleteCartItem: (productId: number) => void;
}

const CartList = ({ cartList, deleteCartItem, updateCartItem }: CartListProps) => {
  return (
    <ul className="flex flex-col gap-5">
      {cartList.map((cartItem) => (
        <CartItem
          key={cartItem.productId}
          cartItem={cartItem}
          updateCartItem={updateCartItem}
          deleteCartItem={deleteCartItem}
        />
      ))}
    </ul>
  );
};

export default CartList;
