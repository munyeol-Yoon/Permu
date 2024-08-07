import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import useAlert from '@/hooks/useAlert';
import { MyOrder } from '@/types/myPage/order';

import { formatDate } from '@/utils/format';
import OrderItem from '../OrderItem';

interface OrderCardProps {
  order: MyOrder;
  review?: boolean;
}

const OrderCard = ({ order, review }: OrderCardProps) => {
  const { showInfoAlert } = useAlert();
  const { orderId, OrdersDetail } = order;
  const formattedDate = formatDate(order.createAt);
  const handleClick = () => showInfoAlert('준비중입니다!');

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
            <div key={orderItem.productId} className="flex flex-col mb-3">
              <OrderItem title={title} thumbNailURL={thumbNailURL} date={formattedDate} />
              {review ? (
                <Button size="sm" onClick={handleClick} className="mt-6">
                  리뷰 작성하기
                </Button>
              ) : null}
            </div>
          );
        })}

        {!review && (
          <div className="flex flex-col bg-teal-50">
            <Button variant="outline" className="my-0">
              교환/환불내역
            </Button>
            <Button className="my-2">배송조회</Button>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default OrderCard;
