'use client';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useCartsMutation } from '@/hooks/mutation';
import { useCartsQuery } from '@/hooks/query';
import { Params } from '@/types/products';
import { useState } from 'react';
import Wish from '../Wish';

const Paying = ({ size }: { size: string[] }) => {
  const router = useRouter();
  const { productId } = useParams<Params['params']>();
  const { loggedUser } = useAuth();
  // const localCarts = JSON.parse(localStorage.getItem('carts') || '[]');
  const { data: carts } = useCartsQuery();
  const displayedCarts = carts;
  // const displayedCarts = userId ? carts?.details : localCarts;
  const { addMutation, patchMutation } = useCartsMutation();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const handlePostCart = async () => {
    if (confirm('장바구니에 넣으시겠습니까 ?')) {
      const matchCartProduct = displayedCarts?.find((cart: any) => cart.productId === Number(productId));

      if (matchCartProduct)
        if (loggedUser)
          patchMutation.mutate({
            productId: Number(productId),
            userId: loggedUser.id,
            count: matchCartProduct.count
          });
        else {
          // const updatedCarts = displayedCarts.map((cart: Cart) => {
          //   if (cart.productId === Number(productId)) {
          //     return { ...cart, count: cart.count + 1 };
          //   }
          //   return cart;
          // });
          // localStorage.setItem('carts', JSON.stringify(updatedCarts));
        }
      else {
        if (loggedUser) addMutation.mutate({ productId: Number(productId), userId: loggedUser.id });
        else {
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
    if (selectedSize === size) setSelectedSize('');
    else setSelectedSize(size);
  };

  const handleBuyNow = () => {
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
              {size}mL
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

      <div className="flex-row-20 justify-between p-5-2 w-[598px] fixed bottom-0 z-10 bg-white border-t-[1.5px] border-gray-500">
        <Wish inner={false} />
        <Button className="w-full" onClick={handleBuyNow}>
          바로 구매하기
        </Button>
      </div>
    </>
  );
};

export default Paying;
