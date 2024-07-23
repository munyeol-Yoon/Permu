import { Input } from '../ui/input';

const ReceiverForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">배송 정보</h1>

      <div>
        <label htmlFor="receiver_name">배송받을 분</label>
        <Input id="receiver_name" />
      </div>

      <div>
        <label htmlFor="receiver_address">배송받을 주소</label>
        <Input id="receiver_address" />
      </div>

      <div>
        <label htmlFor="receiver_phone_number">휴대폰번호</label>
        <Input id="receiver_phone_number" />
      </div>

      <div>
        <label htmlFor="receiver_memo">배송 메모</label>
        <Input id="receiver_memo" />
      </div>
    </div>
  );
};

export default ReceiverForm;
