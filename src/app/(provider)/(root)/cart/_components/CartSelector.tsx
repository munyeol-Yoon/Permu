'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { CartItem } from '@/types/cart';
import { useMemo } from 'react';

interface CartSelectorProps {
  cartList: CartItem[];
  updateCartItem: (newCartItem: CartItem) => void;
  deleteCartItem: (productId: number) => void;
}

const CartSelector = ({ cartList, deleteCartItem, updateCartItem }: CartSelectorProps) => {
  const isSelectedAll = useMemo(() => {
    return cartList.every((cartItem) => cartItem.productSelected === true);
  }, [cartList]);

  const handleUpdateItemSelectAll = async () => {
    if (isSelectedAll) {
      cartList.forEach((cartItem) => updateCartItem({ ...cartItem, productSelected: false }));
    } else {
      cartList.forEach((cartItem) => updateCartItem({ ...cartItem, productSelected: true }));
    }
  };

  const handleDeleteSelectedItem = async () => {
    cartList.forEach((cartItem) => {
      if (cartItem.productSelected) {
        deleteCartItem(cartItem.productId);
      }
    });
  };

  return (
    <div className="flex justify-between px-[50px] py-5 mb-[52px] border-b border-b-[#B3B3B3]">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={isSelectedAll}
          onClick={handleUpdateItemSelectAll}
          className="w-6 h-6 rounded-full data-[state=checked]:bg-[#0348FF] data-[state=checked]:text-white"
        />
        <p className="text-xl">전체 {cartList?.length}개</p>
      </div>
      <button onClick={handleDeleteSelectedItem} className="text-xl text-[#B3B3B3]">
        선택 삭제
      </button>
    </div>
  );
};

export default CartSelector;
