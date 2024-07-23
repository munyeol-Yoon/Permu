'use client';
import useCoupon from '@/hooks/query/useCoupon';

const MyCouponPage = () => {
  const { data: userCoupons } = useCoupon();
  return (
    <div>
      MyCouponPage
      {userCoupons?.map((coupon) => (
        <ul key={coupon.couponId}>
          <li>
            {coupon.couponId} : {coupon.discount}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default MyCouponPage;

