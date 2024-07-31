'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartsQuery } from '@/hooks/query';
import Link from 'next/link';
import { useMemo } from 'react';
import CartList from './_components/CartList';
import CartSelector from './_components/CartSelector';

const CartPage = () => {
  const { data: cartList } = useCartsQuery();

  const totalPrice = useMemo(() => {
    if (cartList?.length) {
      return cartList?.reduce((acc, cur) => acc + cur.Products.discountedPrice, 0);
    }
  }, [cartList]);

  return (
    <div className="max-w-[600px] flex flex-col h-full">
      <CartSelector />
      <CartList />
      {cartList && !cartList.length ? (
        <div>쇼핑 계속하기</div>
      ) : (
        <div className="fixed bottom-0 h-[340px] flex flex-col items-center z-40 max-w-[598px] w-full bg-white shadow-[0px_-19px_5px_0px_rgba(0,0,0,0.00),0px_-12px_5px_0px_rgba(0,0,0,0.01),0px_-7px_4px_0px_rgba(0,0,0,0.05),0px_-3px_3px_0px_rgba(0,0,0,0.09),0px_-1px_2px_0px_rgba(0,0,0,0.10)]">
          <div className="py-3 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
              <path d="M1 0.445312L8.99998 7.55642L17 0.445313" stroke="#B3B3B3" strokeMiterlimit="10" />
            </svg>
          </div>
          <div className="flex flex-col w-full p-5 gap-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <p className="text-xl">마일리지 사용</p>
                <p className="text-[#B3B3B3]">
                  사용 가능한 마일리지 <span className="text-xl">1,000P</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="0" className="text-xl text-right max-w-[101px] h-[30px]" />
                <p className="text-xl font-bold">P</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-xl">
              <div className="flex items-center gap-11">
                <p>쿠폰 사용</p>
                <Button variant="outline" className="text-xl border-black">
                  쿠폰 옵션 확인
                </Button>
              </div>
              <p className="text-[#0348FF] font-bold">-0원</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-[34px] h-full font-bold max-w-[400px] w-full">
            <p className="w-full text-center bg-black text-white px-5 py-[11.5px] rounded-sm">쇼핑 계속하기</p>
            <Link
              href="/order/delivery"
              className="w-full text-center bg-[#0348FF] text-white px-5 py-[11.5px] rounded-sm"
            >
              총 {cartList?.length ?? 0}개 | {totalPrice}원 구매하기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
