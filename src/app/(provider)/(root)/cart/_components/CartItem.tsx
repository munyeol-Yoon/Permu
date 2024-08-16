'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CartItem as CartItemType } from '@/types/cart';
import Image from 'next/image';
import { useState } from 'react';

interface CartItemProps {
  cartItem: CartItemType;
  updateCartItem: (newCartItem: CartItemType) => void;
  deleteCartItem: (productId: number) => void;
}

const CartItem = ({ cartItem, updateCartItem, deleteCartItem }: CartItemProps) => {
  const {
    productBrandName,
    productCount,
    productDiscountPercentage,
    productDiscountedPrice,
    productId,
    productName,
    productPrice,
    productSelected,
    productSelectedVolume,
    productThumbnailURL,
    productVolume
  } = cartItem;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [container, setContainer] = useState<null | Element>(null);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleUpdateItemCountIncrease = () => {
    updateCartItem({ ...cartItem, productCount: productCount + 1 });
    // updateCartItemCount(productId, loggedUser!.id, productCount + 1);
  };

  const handleUpdateItemCountDecrease = () => {
    if (productCount < 2) return;
    updateCartItem({ ...cartItem, productCount: productCount - 1 });
    // updateCartItemCount(productId, loggedUser!.id, productCount - 1);
  };

  const handleUpdateItemVolume = (volume: string) => {
    if (volume === productSelectedVolume) return;

    updateCartItem({ ...cartItem, productSelectedVolume: volume });
    // updateCartItemVolume(productId, loggedUser!.id, volume);
  };

  const handleUpdateItemSelected = () => {
    updateCartItem({ ...cartItem, productSelected: !productSelected });
  };

  const handleDeleteItem = () => {
    deleteCartItem(productId);
  };

  return (
    <li className="flex items-center px-5" ref={setContainer}>
      <Checkbox
        checked={productSelected}
        onClick={handleUpdateItemSelected}
        className="w-6 h-6 rounded-full data-[state=checked]:bg-[#0348FF] data-[state=checked]:text-white"
      />
      <div className="relative aspect-square max-w-[100px] h-[120px] mx-[33px]">
        <Image src={productThumbnailURL} fill alt="" className="absolute" />
      </div>
      <div className="flex flex-col px-2.5 w-full">
        <div className="flex justify-between items-center">
          <p className="text-xs mb-1">{productBrandName}</p>
          <button onClick={handleDeleteItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
              <path d="M13 0.500001L1 12.5M13 12.5L1 0.5" stroke="#231815" />
            </svg>
          </button>
        </div>
        <p className="font-semibold mb-2.5">{productName}</p>
        <p className="text-xs text-[#B3B3B3] mb-1.5">
          옵션 : {productSelectedVolume}ml, {productCount}개
        </p>
        <div className="flex justify-between items-center w-full">
          <Button
            onClick={handleDialogOpen}
            variant="outline"
            className="text-xs border-black rounded-none px-2.5 py-1.5 h-auto m-0"
          >
            옵션 변경
          </Button>
          <div className="relative flex items-center gap-[18px]">
            {!!productDiscountPercentage && (
              <>
                <p className="absolute -top-4 right-0 text-xs text-[#B3B3B3] line-through">
                  {productPrice.toLocaleString()}원
                </p>
                <p className="text-[10px] text-[#0348FF]">SALE {productDiscountPercentage}%</p>
              </>
            )}
            <p className="font-bold">
              {productDiscountedPrice ? productDiscountedPrice.toLocaleString() : productPrice.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
      <Dialog open={isDialogOpen}>
        <DialogContent
          container={container}
          className="flex flex-col items-center gap-[29px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] pt-[54px] px-5 pb-2 sm:rounded-none"
        >
          <DialogTitle className="hidden" />
          <p className="text-[20px]">변경할 옵션을 선택해주세요</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between items-center px-5 py-[18.5px] border border-[#B3B3B3] w-full max-h-[60px] text-start text-[20px] text-[#B3B3B3] rounded-sm">
              <p>{productSelectedVolume}</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
                <path d="M1 0.445312L8.99998 7.55642L17 0.445313" stroke="#B3B3B3" strokeMiterlimit="10" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {productVolume.map((size: any) => (
                <DropdownMenuCheckboxItem
                  onClick={() => handleUpdateItemVolume(size)}
                  checked={productSelectedVolume === size}
                  key={size}
                >
                  {size}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center justify-start gap-2 w-full">
            <button onClick={handleUpdateItemCountDecrease} className="bg-[#B3B3B3] p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M0 8H16" stroke="white" />
              </svg>
            </button>
            <p>{productCount}</p>
            <button onClick={handleUpdateItemCountIncrease} className="bg-[#B3B3B3] p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M0 8H16M8 0L8 16" stroke="black" />
              </svg>
            </button>
          </div>
          <div className="flex justify-between items-center gap-2.5 w-full my-2">
            <Button onClick={handleDialogClose} variant="outline" className="w-full rounded-sm m-0 h-[46px]">
              취소
            </Button>
            <Button onClick={handleDialogClose} className="w-full rounded-sm m-0 h-[46px]">
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </li>
  );
};

export default CartItem;
