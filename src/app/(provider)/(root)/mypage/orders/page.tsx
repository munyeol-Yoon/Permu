'use client';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { Accordion } from '@/components/ui/accordion';
import useOrderListQuery from '@/hooks/query/useOrderListQuery';
import { MyOrder } from '@/types/myPage/order';
import { cn } from '@/utils/cn';
import Banner from '@@/public/banner/tempBanner.svg';
import { useState } from 'react';
import OrderCard from './_components/OrderCard';

const OrderListPage = () => {
  const [isLatest, setIsLatest] = useState<boolean>(true);
  const { data: OrderList, isPending } = useOrderListQuery();
  const handleClick = () => setIsLatest((prev) => !prev);
  if (isPending) return <Loading />;

  return (
    <div>
      <Navbar title="주문/배송내역" isHome />
      <Banner className="mx-auto my-4" />

      <div className="px-[50px]">
        <div className="flex justify-between py-5">
          <div className="flex items-center gap-x-2.5">
            <span
              className={cn('cursor-pointer, text-muted', { 'font-semibold, text-primary': isLatest })}
              onClick={handleClick}
            >
              최근 내역 순
            </span>
            |
            <span
              className={cn('cursor-pointer text-muted', { 'font-semibold, text-primary': !isLatest })}
              onClick={handleClick}
            >
              오래된 순
            </span>
          </div>

          <div className="flex items-center">
            <label htmlFor="arrived">
              <input type="radio" id="arrived" className="mr-2.5" />
              배송 완료된 내역 보기
            </label>
          </div>
        </div>

        <Accordion type="single" collapsible>
          {OrderList?.map((order: MyOrder) => <OrderCard key={order.orderId} order={order} />)}
        </Accordion>
      </div>
    </div>
  );
};

export default OrderListPage;
