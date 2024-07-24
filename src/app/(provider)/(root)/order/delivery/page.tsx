'use client';

import ProductItem from '@/components/OrderPage/ProductItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useOrderInfoQuery from '@/hooks/query/useOrderInfoQuery';
import { useRef } from 'react';

// 솔루션 1 : useRef 활용 -> 리렌더링 이슈 최소화
// 솔루션 2 : 컴포넌화 굳이 할 필요 없으니까 하지않는다

const DeliveryPage = () => {
  const { data: orderInfo } = useOrderInfoQuery();

  const receiverNameRef = useRef('');
  const receiverAddressRef = useRef('');
  const receiverPhoneNumberRef = useRef('');
  const receiverMemoRef = useRef('');

  const handleClick = () => {
    console.log(receiverNameRef);
  };

  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4">
      <ul>{orderInfo?.productList.map((product) => <ProductItem key={product.productId} />)}</ul>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">주문 정보</h1>

        <div>
          <label htmlFor="orderer_name">주문자</label>
          <p id="orderer_name">{orderInfo?.user.name}</p>
        </div>

        <div>
          <label htmlFor="orderer_phone_number">휴대폰번호</label>
          <p id="orderer_name">{orderInfo?.user.phone}</p>
        </div>

        <div>
          <label htmlFor="orderer_email">이메일</label>
          <p id="orderer_name">{orderInfo?.user.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">배송 정보</h1>

        <div>
          <label htmlFor="receiver_name">배송받을 분</label>
          <Input id="receiver_name" onChange={(e) => (receiverNameRef.current = e.target.value)} />
        </div>

        <div>
          <label htmlFor="receiver_address">배송받을 주소</label>
          <Input id="receiver_address" onChange={(e) => (receiverAddressRef.current = e.target.value)} />
        </div>

        <div>
          <label htmlFor="receiver_phone_number">휴대폰번호</label>
          <Input id="receiver_phone_number" onChange={(e) => (receiverPhoneNumberRef.current = e.target.value)} />
        </div>

        <div>
          <label htmlFor="receiver_memo">배송 메모</label>
          <Input id="receiver_memo" onChange={(e) => (receiverMemoRef.current = e.target.value)} />
        </div>
      </div>

      <Button onClick={handleClick}>주문하기</Button>
    </div>
  );
};

export default DeliveryPage;
