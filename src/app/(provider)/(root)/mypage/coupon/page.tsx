'use client';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useCouponQuery } from '@/hooks/query';
import { Tables } from '@/types/supabase';
import Arrow from '@@/public/arrow/arrow-bottom.svg';
import CouponCard from '../_components/CouponCard';
import Profile from '../_components/Profile';

const CouponListPage = () => {
  const { loggedUser } = useAuth();
  const { data: userCoupons, isPending } = useCouponQuery();
  const name = loggedUser?.userData.name || '';

  if (isPending) return <Loading />;
  return (
    <div>
      <Navbar title="쿠폰" isHome />
      <Profile name={name || ''} />

      <div className="flex flex-col bg-slate-200 p-5 gap-x-2.5 gap-y-1">
        <div className="flex bg-white rounded justify-between px-5 py-4">
          <p>현재 보유 쿠폰</p>
          <p className="text-lg font-bold text-blue-500">{userCoupons?.length}장</p>
        </div>
        <div className="flex bg-white rounded justify-between px-5 py-4">
          <p>추가로 받을 수 있는 쿠폰</p>
          <p className="text-lg font-bold text-blue-500">100장</p>
        </div>
      </div>

      <div className="mx-[50px]">
        <div className="flex justify-between my-5">
          <div className="flex items-baseline gap-x-2">
            <h3 className="text-xl font-bold">쿠폰 내역</h3>
            <p className="text-base font-bold">전체 {userCoupons?.length}장</p>
          </div>

          <div className="flex items-center">
            <span>최근 내역 순</span>
            <Arrow />
          </div>
        </div>

        {/* 필터 */}
        <div className="flex gap-x-4 my-4">
          <span>전체</span>|<span>만료임박</span>|<span>사용불가</span>
        </div>

        {/* 쿠폰 카드 */}
        <div className="mt-8">
          {userCoupons?.map((coupon: Tables<'Coupon'>) => <CouponCard key={coupon.couponId} coupon={coupon} />)}
        </div>
      </div>
    </div>
  );
};

export default CouponListPage;
