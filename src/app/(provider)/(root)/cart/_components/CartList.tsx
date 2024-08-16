'use client';

import { CartItem as CartItemType } from '@/types/cart';
import CartItem from './CartItem';

interface CartListProps {
  cartList: CartItemType[];
  updateCartItem: (newCartItem: CartItemType) => void;
  deleteCartItem: (productId: number) => void;
}

const CartList = ({ cartList, deleteCartItem, updateCartItem }: CartListProps) => {
  return (
    <ul className="h-full bg-white flex flex-col gap-5 pb-[148px]">
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
