'use client';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import {
  AUTH_LOG_IN_PATHNAME,
  HOME,
  MYPAGE_COUPON_PATHNAME,
  MYPAGE_EDIT_PATHNAME,
  MYPAGE_MILEAGE_PATHNAME,
  MYPAGE_ORDERS_PATHNAME,
  MYPAGE_WISH_PATHNAME
} from '@/constant/pathname';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useAuthMutation } from '@/hooks/mutation';
import { useCouponQuery } from '@/hooks/query';
import Banner from '@@/public/banner/tempBanner.svg';
import InfoCard from './_components/InfoCard';
import LinkCard from './_components/LinkCard';
import Profile from './_components/Profile';
// TODO : 쿠폰, 후기 데이터 가져오기
// TODO : 이동 가능한 부분 pointer

const LINKS = [
  { title: '주문/배송 내역', href: MYPAGE_ORDERS_PATHNAME },
  { title: '취소/반품 내역 (미지원)' },
  { title: '환불 / 고객상담 (미지원)' },
  { title: '찜 리스트', href: MYPAGE_WISH_PATHNAME },
  { title: '쿠폰 내역', href: MYPAGE_COUPON_PATHNAME },
  { title: '마일리지 내역', href: MYPAGE_MILEAGE_PATHNAME },
  { title: '회원 정보 변경', href: MYPAGE_EDIT_PATHNAME },
  { title: '배송지 관리 (미지원)' },
  { title: '사업자 정보' },
  { title: '법적고지사항' },
  { title: '고객지원' }
];

const MyMainPage = () => {
  const { loggedUser } = useAuth();
  const { data: userCoupons } = useCouponQuery();
  const { logOutMutation } = useAuthMutation();
  const name = loggedUser?.userData.name || '';
  const mileage = loggedUser?.userData.mileage || 0;

  return (
    <div className="flex flex-col">
      <Navbar title="마이페이지" href={HOME} isHome />
      <Profile name={name || ''} />

      <div className="flex bg-slate-200 p-5 gap-x-2.5">
        <InfoCard title="보유 마일리지">{mileage}p</InfoCard>
        <InfoCard title="쿠폰">{userCoupons?.length}</InfoCard>
        <InfoCard title="후기">125개</InfoCard>
      </div>

      <Banner className="mx-auto my-4" />

      <div className="flex flex-col bg-slate-100">
        {LINKS.map((link) => (
          <LinkCard key={link.title} title={link.title} href={loggedUser ? link.href : AUTH_LOG_IN_PATHNAME} />
        ))}
        {loggedUser && <Button onClick={() => logOutMutation()}>로그아웃</Button>}
      </div>
    </div>
  );
};

export default MyMainPage;
