'use client';
import Navbar from '@/components/Navbar';
import { Accordion } from '@/components/ui/accordion';
import { MYPAGE } from '@/constant/pathname';
import useOrderListQuery from '@/hooks/query/useOrderListQuery';
import { MyOrder } from '@/types/myPage/order';
import Arrow from '@@/public/arrow/arrow-bottom.svg';
import OrderCard from './_components/OrderCard';

const OrderListPage = () => {
  const { data: OrderList, isPending } = useOrderListQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar title="주문/배송내역" href={MYPAGE} isHome />
      <div className="bg-blue-500">이미지 배너</div>

      <div className="px-[50px]">
        <div className="flex justify-between py-5">
          <div className="flex items-center">
            <span>최근 내역 순</span>
            <Arrow />
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
