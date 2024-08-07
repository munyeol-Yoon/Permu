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
          <h3 className="text-xl w-[110px]">{formattedDate}</h3>
          <span className="text-sm text-muted">주문번호 {orderId.split('-')[0]}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {OrdersDetail.map((orderItem) => {
          const { title, thumbNailURL } = orderItem.Products;
          return (
            <div className="flex gap-x-5 mb-3" key={orderItem.productId}>
              <div className="w-[100px] h-[100px] aspect-square relative">
                <Image src={thumbNailURL || ''} alt={title || ''} className="object-cover" fill />
              </div>
              <div className="flex flex-col gap-y-2.5">
                <p>구매일 : {formattedDate}</p>
                <p className="text-base font-semibold line-clamp-1">{title}</p>
                <p className="text-muted">옵션 :</p>
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
