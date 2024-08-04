import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MyOrder } from '@/types/myPage/order';

import { formatDate } from '@/utils/format';
import Image from 'next/image';

interface OrderCardProps {
  order: MyOrder;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const { orderId, OrdersDetail } = order;
  const formattedDate = formatDate(order.createAt);
  return (
    <AccordionItem value={crypto.randomUUID()}>
      <AccordionTrigger>
        <div className="flex items-center gap-x-2">
          <h3 className="text-xl">{formattedDate}</h3>
          <span className="text-sm text-slate-400">주문번호 {orderId.split('-')[0]}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {OrdersDetail.map((orderItem) => {
          const { title, thumbNailURL } = orderItem.Products;
          return (
            <div className="flex gap-x-5 mb-3">
              <Image src={thumbNailURL || ''} width={84} height={84} alt={title || ''} />
              <div className="flex flex-col justify-between">
                <p>구매일 : {formattedDate}</p>
                <p className="text-md font-semibold">{title}</p>
                <p className="text-slate-400">옵션 :</p>
              </div>
            </div>
          );
        })}

        <div className="flex flex-col bg-teal-50">
          <Button variant="outline" className="my-0">
            교환/환불내역
          </Button>
          <Button className="my-2">배송조회</Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default OrderCard;
