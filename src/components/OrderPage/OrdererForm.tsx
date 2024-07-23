'use client';

import useUserQuery from '@/hooks/query/useUserQuery';

const OrdererForm = () => {
  const { data: user } = useUserQuery();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">주문 정보</h1>

      <div>
        <label htmlFor="orderer_name">주문자</label>
        <p id="orderer_name">{user?.name}</p>
      </div>

      <div>
        <label htmlFor="orderer_phone_number">휴대폰번호</label>
        <p id="orderer_name">{user?.phone}</p>
      </div>

      <div>
        <label htmlFor="orderer_email">이메일</label>
        <p id="orderer_name">{user?.email}</p>
      </div>
    </div>
  );
};

export default OrdererForm;
