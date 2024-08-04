import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
const OrderCard = () => {
  return (
    <AccordionItem value={crypto.randomUUID()}>
      <AccordionTrigger>
        <div className="flex items-center gap-x-2">
          <h3 className="text-xl">2024.07.31</h3>
          <span className="text-sm text-slate-400">주문번호 1234</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex gap-x-5  mb-3">
          <div className="w-[84px] h-[84px] bg-blue-50">이미지</div>
          <div className="flex flex-col justify-between">
            <p>구매일 :</p>
            <p>브랜드명</p>
            <p className="text-slate-400">옵션 :</p>
          </div>
        </div>
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
