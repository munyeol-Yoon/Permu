'use client';

import { Checkbox } from '@/components/ui/checkbox';
import useCart from '@/hooks/useCart';
import { useMemo } from 'react';

const CartSelector = () => {
  const { cartList } = useCart();

  const isSelectedAll = useMemo(() => {
    return cartList?.every((cartItem) => cartItem.isSelected === true);
  }, [cartList]);

  if (cartList && !cartList.length) return null;

  return (
    <div className="flex justify-between px-[50px] py-5 mb-[52px] border-b border-b-[#B3B3B3]">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={isSelectedAll}
          className="w-6 h-6 rounded-full data-[state=checked]:bg-[#0348FF] data-[state=checked]:text-white"
        />
        <p className="text-xl">전체 {cartList!.length}개</p>
      </div>
      <p className="text-xl text-[#B3B3B3]">선택 삭제</p>
    </div>
  );
};

export default CartSelector;
