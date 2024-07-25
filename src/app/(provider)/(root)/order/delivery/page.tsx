'use client';

import { ProductItem } from '@/components/OrderPage';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useOrderMutation } from '@/hooks/mutation';
import { useOrderInfoQuery } from '@/hooks/query';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

const DeliveryPage = () => {
  const router = useRouter();

  const { data: orderInfo } = useOrderInfoQuery();
  const { mutateAsync } = useOrderMutation();

  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [mileageAmount, setMileageAmount] = useState(0);

  const receiverNameRef = useRef('');
  const receiverAddressRef = useRef('');
  const receiverPhoneNumberRef = useRef('');
  const receiverMemoRef = useRef('');

  const totalPrice = useMemo(() => {
    const initialPrice = orderInfo?.productList.reduce((acc: number, cur: { price: number }) => acc + cur.price, 0);
    const couponPrice = selectedCoupon ? selectedCoupon.discount : 0;
    const finalPrice = initialPrice - couponPrice - mileageAmount;
    return finalPrice;
  }, [mileageAmount, orderInfo, selectedCoupon]);

  const handleOrder = async () => {
    const deliveryInfo = {
      userId: orderInfo.user.id,
      name: receiverNameRef.current,
      address: receiverAddressRef.current,
      phone: receiverPhoneNumberRef.current,
      deliverMemo: receiverMemoRef.current,
      arrivalDate: new Date()
    };
    const updatedMileageAmount = orderInfo.user.mileage - mileageAmount;
    await mutateAsync({ deliveryInfo, totalPrice, coupon: selectedCoupon, updatedMileageAmount });
    router.push('/order/complete');
  };

  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-4 py-12">
      <ul>{orderInfo?.productList.map((product: any) => <ProductItem key={product.productId} product={product} />)}</ul>

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

      <div className="flex flex-col gap-2">
        <p className="text-2xl">쿠폰 조회 및 적용</p>
        {orderInfo?.coupon.map(
          (v: any, idx: number) =>
            v.status !== 'used' &&
            v.status !== 'expired' && (
              <div key={idx} className="flex items-center gap-4">
                <Checkbox
                  id={`coupon_${idx}`}
                  checked={selectedCoupon?.couponId === v.couponId}
                  onClick={() => setSelectedCoupon(v)}
                />
                <label htmlFor={`coupon_${idx}`} className="flex item-center gap-4">
                  <p className="text-red-400">쿠폰 {idx + 1}번</p>
                  <p>할인 금액 : {v.discount}원</p>
                </label>
              </div>
            )
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-2xl">마일리지 조회 및 사용</p>
        <Input value={mileageAmount} onChange={(e) => setMileageAmount(Number(e.target.value))} />
        <p className="text-sm text-gray-400">사용 가능한 마일리지 : {orderInfo?.user.mileage}</p>
      </div>

      <div className="flex justify-end gap-4 text-sm">
        <h2 className="text-gray-400">최종 결제 금액</h2>
        <p className="text-amber-700">{totalPrice}원</p>
      </div>

      <Button onClick={handleOrder}>주문하기</Button>
    </div>
  );
};

export default DeliveryPage;
