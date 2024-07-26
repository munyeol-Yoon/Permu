'use client';
import React, { useState } from 'react';
const coupons = [
  {
    couponId: '1c75c2a9-7bf3-4445-b121-7de52a010ee5',
    userId: 'c7b26340-92fc-4dc3-91ec-5151091251f2',
    discount: 1000,
    issueDate: '2024-07-22 11:16:01',
    expirationDate: '2024-07-31 11:16:05'
  },
  {
    couponId: '33218548-89ba-4b01-ad5a-54460ba34b47',
    userId: 'c7b26340-92fc-4dc3-91ec-5151091251f2',
    discount: 3900,
    issueDate: '2024-07-22 11:16:23',
    expirationDate: '2024-07-31 11:16:26'
  }
];

const Coupon = ({ totalCost, totalDiscountCost }: { totalCost: number; totalDiscountCost: number }) => {
  const [selectedCoupons, setSelectedCoupons] = useState<number>(0);

  const handleSelectCoupon = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const discount = Number(e.target.value);
    setSelectedCoupons(discount);
  };
  const handleOrder = (): void => {
    alert('주문페이지로 가기');
  };
  return (
    <>
      <div className="flex flex-row">
        <h1>총 상품금액 </h1>
        <p>
          {totalCost.toLocaleString()} -&gt; {(totalDiscountCost - selectedCoupons).toLocaleString()}
        </p>
      </div>

      <div>
        <span>쿠폰내역</span>
        <select onChange={handleSelectCoupon}>
          <option value={0}>사용안함</option>
          {totalCost > 0 &&
            coupons?.map((coupon) => (
              <option key={coupon.couponId} value={coupon.discount}>
                {coupon.discount}
              </option>
            ))}
        </select>
      </div>
      <button onClick={handleOrder}>주문하기</button>
    </>
  );
};

export default Coupon;
