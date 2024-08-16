'use client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import useAlert from '@/hooks/useAlert';
import useLocalCart from '@/hooks/useLocalCart';
import { Product } from '@/types/products';
import ArrowBSVG from '@@/public/arrow/arrow-bold-bottom.svg';
import CartSVG from '@@/public/cart-icon.svg';
import { cx } from 'class-variance-authority';
import { useState } from 'react';
import { Wish } from '.';
type PayingProps = { size: string[]; category: string; product: Product };

const Paying = ({ size, category, product }: PayingProps) => {
  const router = useRouter();
  const { showInfoAlert } = useAlert();
  const { addLocalCartItem, updateLocalCartItem, localCartList } = useLocalCart();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>('옵션 선택');

  const handlePostCart = async () => {
    if (confirm('장바구니에 넣으시겠습니까 ?')) {
      const duplicatedCartItem = localCartList.find((cartItem) => cartItem.productId === product.productId);
      if (duplicatedCartItem) {
        updateLocalCartItem({ ...duplicatedCartItem, productCount: duplicatedCartItem.productCount + 1 });
        setIsDialogOpen(true);
        return;
      }

      const cartItem = {
        productId: product.productId,
        productCount: 1,
        productDiscountedPrice: product.discountedPrice,
        productSelected: true,
        productSelectedVolume: selectedSize,
        productVolume: product.size,
        productBrandName: product.Brand.krName as string,
        productName: product.title as string,
        productDiscountPercentage: product.discount as number,
        productPrice: product.price as number,
        productThumbnailURL: product.thumbNailURL as string
      };

      addLocalCartItem(cartItem);
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSelectSize = (size: string): void => {
    setSelectedSize(selectedSize === size ? '옵션 선택' : size);
  };

  const handleSelectedMode = (): void => {
    setIsSelected((prev) => !prev);
  };
  const handleBuyNow = (): void => {
    if (selectedSize === '옵션 선택') {
      showInfoAlert('사이즈를 선택해주세요!');
      return;
    }

    localStorage.setItem('buy-now', JSON.stringify({ count: 1, volume: selectedSize, ...product }));
    router.push('/order');
  };

  return (
    <>
      {isSelected && <div className="fixed inset-0 bg-black/50 z-40" onClick={handleSelectedMode}></div>}
      <div className="p-5-2">
        <span>사이즈</span>
        <div className="flex-row-10">
          {size?.map((size, index: number) => (
            <Button
              className="rounded-2xl h-[32px] px-4 py-0"
              variant={selectedSize === size ? 'borderline' : 'defaultline'}
              key={index}
              onClick={() => handleSelectSize(size)}
            >
              {size}
              {category === '인센스' ? 'g' : 'mL'}
            </Button>
          ))}
        </div>
      </div>
      <div className="box-container">
        <Button size="xl" variant="defaultline" onClick={handlePostCart}>
          쇼핑백에 추가
        </Button>
        <Button size="xl" onClick={handleBuyNow}>
          바로 구매하기
        </Button>
      </div>

      <div
        className={cx('p-5-2 w-full max-w-[600px] fixed bottom-0 z-50 bg-white border-t-[1.5px] border-[#B3B3B3]', {
          'rounded-t-lg': isSelected,
          'rounded-none': !isSelected
        })}
      >
        {isSelected ? (
          <div className="z-50">
            <div className="flex-col-10 justify-center items-center">
              <ArrowBSVG className="hover:cursor-pointer" onClick={handleSelectedMode} />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex justify-between items-center p-5-2 border border-[#B3B3B3] w-full text-start text-xs text-[#B3B3B3]">
                  <span className="text-xl">{selectedSize}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
                    <path d="M1 0.445312L8.99998 7.55642L17 0.445313" stroke="#B3B3B3" strokeMiterlimit="10" />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {size?.map((size, index: number) => (
                    <DropdownMenuCheckboxItem
                      key={index}
                      onClick={() => handleSelectSize(size)}
                      className="w-full p-5-2 h-[40px] text-lg"
                    >
                      {size}
                      {category === '인센스' ? 'g' : 'mL'}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="box-container-p-none py-2">
              <Button size="xl" variant="defaultline" onClick={handlePostCart}>
                쇼핑백에 추가
              </Button>
              <Button size="xl" onClick={handleBuyNow}>
                바로 구매하기
              </Button>
            </div>
          </div>
        ) : (
          <div className="box-container-p-none">
            <Wish inner={false} />
            <Button size="xl" onClick={handleSelectedMode}>
              바로 구매하기
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen}>
        <DialogContent className="flex flex-col items-center gap-[29px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[400px] pt-[54px] px-5 pb-2 rounded">
          <DialogTitle className="hidden" />
          <CartSVG />
          <p className="text-[20px] text-center">
            상품이 장바구니에 담겼습니다.
            <br />
            바로 확인하시겠습니까?
          </p>

          <div className="flex justify-between items-center gap-2.5 w-full">
            <Button onClick={handleDialogClose} variant="defaultline" className="w-full h-[64px]">
              취소
            </Button>
            <Button onClick={() => router.push('/cart')} variant="default" className="w-full h-[64px]">
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Paying;
