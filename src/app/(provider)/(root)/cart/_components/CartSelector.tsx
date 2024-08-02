'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/auth.context/auth.context';
import useCart from '@/hooks/useCart';
import { useMemo } from 'react';

const CartSelector = () => {
  const { loggedUser } = useAuth();
  const { cartList, updateCartItemSelected, deleteCartItem } = useCart();

  const isSelectedAll = useMemo(() => {
    return cartList?.every((cartItem) => cartItem.isSelected === true);
  }, [cartList]);

  const handleUpdateItemSelectAll = async () => {
    const notSelectedCartList = cartList?.filter((cartItem) => !cartItem.isSelected);
    const productIdList = notSelectedCartList?.map((cartItem) => cartItem.productId);
    await Promise.all(productIdList!.map((productId) => updateCartItemSelected(productId, loggedUser!.id, true)));
  };

  const handleDeleteSelectedItem = async () => {
    const selectedCartList = cartList?.filter((cartItem) => cartItem.isSelected);
    const productIdList = selectedCartList?.map((cartItem) => cartItem.productId);
    await Promise.all(productIdList!.map((productId) => deleteCartItem(productId, loggedUser!.id)));
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
