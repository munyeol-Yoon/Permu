'use client';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useCartsMutation } from '@/hooks/mutation';
import { useCartsQuery } from '@/hooks/query';
import useAlert from '@/hooks/useAlert';
import useLocalCart from '@/hooks/useLocalCart';
import { Params, Product } from '@/types/products';
import { useState } from 'react';
import Wish from '../Wish';

type PayingProps = { size: string[]; category: string; product: Product };

const Paying = ({ size, category, product }: PayingProps) => {
  const { productId } = useParams<Params['params']>();

  const router = useRouter();
  const { showInfoAlert } = useAlert();
  const { loggedUser } = useAuth();
  const { data: carts } = useCartsQuery();
  const { addMutation, patchMutation } = useCartsMutation();
  const { addCartItem } = useLocalCart();

  const [selectedSize, setSelectedSize] = useState<string>('옵션 선택');

  const handlePostCart = () => {
    if (confirm('장바구니에 넣으시겠습니까 ?')) {
      const cartItem = {
        productId: product.productId,
        productCount: 1,
        productDiscountedPrice: product.discountedPrice,
        productSelected: true,
        productSelectedVolume: selectedSize,
        productVolume: product.size,
        productBrandName: product.Brand.enName as string,
        productName: product.title as string,
        productDiscountPercentage: product.discount as number,
        productPrice: product.price as number,
        productThumbnailURL: product.thumbNailURL as string
      };
      addCartItem(cartItem);
    }
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(selectedSize === size ? '옵션 선택' : size);
  };

  const handleBuyNow = () => {
    if (selectedSize === '옵션 선택') {
      showInfoAlert('사이즈를 선택해주세요!');
      return;
    }

    localStorage.setItem('buy-now', JSON.stringify({ count: 1, volume: selectedSize, ...product }));
    router.push('/order');
  };

  return (
    <>
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
      <div className="flex-row-20 justify-between p-5-2 w-full">
        <Button className="w-full h-[64px]" variant="defaultline" onClick={handlePostCart}>
          쇼핑백에 추가
        </Button>
        <Button className="w-full h-[64px]" onClick={handleBuyNow}>
          바로 구매하기
        </Button>
      </div>

      <div className="flex-row-10 justify-between p-5-2 w-[600px] fixed bottom-0 z-20 bg-white border-t-[1.5px] border-[#B3B3B3]">
        <Wish inner={false} />
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full h-[64px]">바로 구매하기</Button>
          </DrawerTrigger>

          <DrawerContent className="w-[600px] mx-auto justify-between">
            <DrawerHeader>
              <DrawerTitle></DrawerTitle>
            </DrawerHeader>
            <div className="p-5-2">
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
                      className="w-full h-[32px] px-4 py-0"
                      key={index}
                      onClick={() => handleSelectSize(size)}
                    >
                      {size}
                      {category === '인센스' ? 'g' : 'mL'}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex-row-20 justify-between p-5-2 w-full">
              <Button className="w-full h-[64px]" variant="defaultline" onClick={handlePostCart}>
                쇼핑백에 추가
              </Button>
              <Button className="w-full h-[64px]" onClick={handleBuyNow}>
                바로 구매하기
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default Paying;
