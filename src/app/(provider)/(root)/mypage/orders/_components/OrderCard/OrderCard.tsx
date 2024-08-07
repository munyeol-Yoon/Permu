import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import useAlert from '@/hooks/useAlert';
import { MyOrder } from '@/types/myPage/order';
import dayjs from 'dayjs';
import OrderItem from '../OrderItem';

interface OrderCardProps {
  order: MyOrder;
  review?: boolean;
}

const OrderCard = ({ order, review }: OrderCardProps) => {
  const { showInfoAlert } = useAlert();
  const { orderId, createAt, OrdersDetail } = order;
  const formattedDate = dayjs(createAt).format('YYYY.MM.DD');
  const handleClick = () => showInfoAlert('준비중입니다!');

  return (
    <AccordionItem value={crypto.randomUUID()}>
      <AccordionTrigger>
        <div className="flex items-center gap-x-2 ">
          <h3 className="text-xl w-[110px]">{formattedDate}</h3>
          <span className="text-sm text-muted line-clamp-1">주문번호 {orderId.split('-')}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        {OrdersDetail.map((orderItem) => {
          return (
            <div key={orderItem.productId} className="flex flex-col mb-3">
              <OrderItem {...orderItem.Products} />
              {review ? (
                <Button size="sm" onClick={handleClick} className="mt-6">
                  리뷰 작성하기
                </Button>
              ) : null}
            </div>
          );
        })}

        {!review && (
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={handleClick}>
              교환/환불내역
            </Button>
            <Button onClick={handleClick}>배송조회</Button>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default OrderCard;
