'use client';
import { useCouponQuery } from '@/hooks/query';

const MyCouponPage = () => {
  const { data: userCoupons } = useCouponQuery();
  return (
    <div>
      MyCouponPage
      {userCoupons?.map((coupon) => (
        <ul key={coupon.couponId}>
          <li>
            {coupon.name} : {coupon.discount}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default MyCouponPage;
