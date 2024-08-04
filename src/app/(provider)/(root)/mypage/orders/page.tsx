import Navbar from '@/components/Navbar';
import { Accordion } from '@/components/ui/accordion';
import { MYPAGE } from '@/constant/pathname';

import Arrow from '@@/public/arrow/arrow-bottom.svg';
import OrderCard from './_components/OrderCard';
const OrderListPage = () => {
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

        {/* 배송 내역 컴포넌트 */}
        <Accordion type="single" collapsible>
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </Accordion>
      </div>
    </div>
  );
};

export default OrderListPage;
