'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import { CartItem } from '@/types/cart';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { useMemo } from 'react';

interface CartAccordionProps {
  cartList: CartItem[];
}

  const CartAccordion = ({ cartList }: CartAccordionProps) => {
  const { data: loggedUser } = useAuthQuery();

  const selectedProductCount = useMemo(() => {
    if (cartList?.length) {
      return cartList?.reduce((acc, cur) => acc + Number(cur.productSelected), 0);
    }
  }, [cartList]);

  const totalPrice = useMemo(() => {
    if (cartList?.length) {
      return cartList?.reduce((acc, cur) => {
        if (cur.productSelected) {
          return acc + cur.productDiscountedPrice * cur.productCount;
        } else return acc;
      }, 0);
    }
  }, [cartList]);

  return (
    <>
      <div className="fixed bottom-0 px-5 flex flex-col items-center z-40 w-full max-w-[600px] bg-white shadow-[0px_-19px_5px_0px_rgba(0,0,0,0.00),0px_-12px_5px_0px_rgba(0,0,0,0.01),0px_-7px_4px_0px_rgba(0,0,0,0.05),0px_-3px_3px_0px_rgba(0,0,0,0.09),0px_-1px_2px_0px_rgba(0,0,0,0.10)]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="accordion_1" className="border-none">
            <AccordionTrigger
              withChevron={false}
              className="px-0 py-3 flex justify-center [&[data-state=open]>svg]:rotate-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="9"
                viewBox="0 0 18 9"
                fill="none"
                className="rotate-180 transition-transform"
              >
                <path d="M1 0.445312L8.99998 7.55642L17 0.445313" stroke="#B3B3B3" strokeMiterlimit="10" />
              </svg>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-5 px-0">
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
              <p className="w-full text-center bg-black text-white py-[11.5px] rounded-sm">쇼핑 계속하기</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Link
          href={loggedUser ? '/order' : '/auth/log-in'}
          className={cn(
            'w-full text-center text-white px-5 py-[11.5px] rounded-sm my-2 bg-[#0348FF]',
            !selectedProductCount && 'opacity-50 pointer-events-none'
          )}
        >
          총 {selectedProductCount}개 | {totalPrice ? totalPrice.toLocaleString() : 0}원 구매하기
        </Link>
      </div>
    </>
  );
};

export default CartAccordion;
