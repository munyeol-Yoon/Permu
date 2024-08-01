'use client';
import { useCouponQuery } from '@/hooks/query';

const CouponListPage = () => {
  const { data: userCoupons } = useCouponQuery();
  return (
    <div>
      CouponListPage
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

export default CouponListPage;
