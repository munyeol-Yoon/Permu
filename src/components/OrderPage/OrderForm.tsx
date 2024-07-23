import { Input } from '../ui/input';

const OrderForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">주문 정보</h1>

      <div>
        <label htmlFor="orderer_name">주문자</label>
        <Input id="orderer_name" />
      </div>

      <div>
        <label htmlFor="orderer_phone_number">휴대폰번호</label>
        <Input id="orderer_phone_number" />
      </div>

      <div>
        <label htmlFor="orderer_email">이메일</label>
        <Input id="orderer_email" />
      </div>
    </div>
  );
};

export default OrderForm;
