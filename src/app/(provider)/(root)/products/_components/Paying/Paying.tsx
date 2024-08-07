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
import { Params } from '@/types/products';
import { useState } from 'react';
import Wish from '../Wish';

type PayingProps = { size: string[]; category: string };
const Paying = ({ size, category }: PayingProps) => {
  const router = useRouter();
  const { productId } = useParams<Params['params']>();
  const { loggedUser } = useAuth();
  // const localCarts = JSON.parse(localStorage.getItem('carts') || '[]');
  const { data: carts } = useCartsQuery();
  const displayedCarts = carts;
  // const displayedCarts = userId ? carts?.details : localCarts;
  const { addMutation, patchMutation } = useCartsMutation();

  const [selectedSize, setSelectedSize] = useState<string>('옵션 선택');
  const handlePostCart = async () => {
    if (confirm('장바구니에 넣으시겠습니까 ?')) {
      const matchCartProduct = displayedCarts?.find((cart: any) => cart.productId === Number(productId));

      if (matchCartProduct)
        if (loggedUser) {
          if (selectedSize === '옵션 선택') {
            alert('사이즈를 선택해주세요!');
            return;
          }
          patchMutation.mutate({
            productId: Number(productId),
            userId: loggedUser.id,
            count: matchCartProduct.count + 1,
            volume: selectedSize
          });
        } else {
          // const updatedCarts = displayedCarts.map((cart: Cart) => {
          //   if (cart.productId === Number(productId)) {
          //     return { ...cart, count: cart.count + 1 };
          //   }
          //   return cart;
          // });
          // localStorage.setItem('carts', JSON.stringify(updatedCarts));
        }
      else {
        if (loggedUser) {
          if (selectedSize === '옵션 선택') {
            alert('사이즈를 선택해주세요!');
            return;
          }
          addMutation.mutate({ productId: Number(productId), volume: selectedSize, userId: loggedUser.id });
        } else {
          // const product = await fetchDetailProduct({ params: { productId } });
          // localStorage.setItem(
          //   'carts',
          //   JSON.stringify(
          //     displayedCarts.concat({
          //       productId: Number(productId),
          //       userId,
          //       count: 1,
          //       Products: product
          //     })
          //   )
          // );
        }
      }

      //성공 메시지를 받아야 함!!!
      if (confirm('장바구니에 담기를 성공했습니다 장바구니로 가시겠습니까?')) {
        router.push('/cart');
      }
    }
  };
  const handleSelectSize = (size: string) => {
    if (selectedSize === size) setSelectedSize('옵션 선택');
    else setSelectedSize(size);
  };

  const handleBuyNow = () => {
    if (selectedSize === '옵션 선택') {
      alert('사이즈를 선택해주세요!');
      return;
    }
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
              variant={selectedSize === size ? 'outline' : 'defaultline'}
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
        <Button className="w-full" variant="outline" onClick={handlePostCart}>
          쇼핑백에 추가
        </Button>
        <Button className="w-full" onClick={handleBuyNow}>
          바로 구매하기
        </Button>
      </div>

      <div className="flex-row-20 justify-between p-5-2 w-[600px] fixed bottom-0 z-10 bg-white border-t-[1.5px] border-gray-500">
        <Wish inner={false} />
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full">바로 구매하기</Button>
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
                      className="w-full rounded-2xl h-[32px] px-4 py-0"
                      key={index}
                      onClick={() => handleSelectSize(size)}
                    >
                      {size}mL
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex-row-20 justify-between p-5-2 w-full">
              <Button className="w-full" variant="outline" onClick={handlePostCart}>
                쇼핑백에 추가
              </Button>
              <Button className="w-full" onClick={handleBuyNow}>
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
