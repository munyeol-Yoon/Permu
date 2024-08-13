'use client';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import useCouponQuery from '@/hooks/query/mypage/useCouponQuery';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import Arrow from '@@/public/arrow/arrow-bottom.svg';
import CouponCard from '../_components/CouponCard';
import InfoCard from '../_components/InfoCard';
import Profile from '../_components/Profile';

const CouponListPage = () => {
  const { data: loggedUser } = useAuthQuery();
  const { data: coupons, isPending } = useCouponQuery();
  const name = loggedUser?.userData.name || '';

  if (isPending) return <Loading />;

  return (
    <div>
      <Navbar title="쿠폰" isHome />
      <Profile name={name} />

      <div className="flex flex-col bg-muted/30 p-5 gap-x-2.5 gap-y-1">
        <InfoCard title="현재 보유 쿠폰" sm>
          {coupons?.length}장
        </InfoCard>

        <InfoCard title="추가로 받을 수 있는 쿠폰" sm>
          100장
        </InfoCard>
      </div>

      <div className="mx-[50px]">
        <div className="flex justify-between py-5">
          <div className="flex items-baseline gap-x-2">
            <h3 className="text-xl font-bold">쿠폰 내역</h3>
            <p className="text-base font-bold text-muted">전체 {coupons?.length}장</p>
          </div>

          <div className="flex items-center gap-x-2 cursor-pointer">
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
          {coupons?.map((coupon: any) => <CouponCard key={coupon.couponId} coupon={coupon} />)}
        </div>
      </div>
    </div>
  );
};

export default CouponListPage;
