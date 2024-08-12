'use client';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import {
  AUTH_LOG_IN_PATHNAME,
  MYPAGE_ADDRESS_PATHNAME,
  MYPAGE_COUPON_PATHNAME,
  MYPAGE_EDIT_PATHNAME,
  MYPAGE_MILEAGE_PATHNAME,
  MYPAGE_ORDERS_PATHNAME,
  MYPAGE_REVIEW_PATHNAME,
  MYPAGE_WISH_PATHNAME
} from '@/constant/pathname';
import useCouponQuery from '@/hooks/query/mypage/useCouponQuery';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import Banner from '@@/public/banner/tempBanner.svg';
import Footer from '../_components/Footer';
import InfoCard from './_components/InfoCard';
import LinkCard from './_components/LinkCard';
import Profile from './_components/Profile';

const LINKS = [
  { title: '주문/배송 내역', href: MYPAGE_ORDERS_PATHNAME },
  { title: '취소/반품 내역 (미지원)' },
  { title: '환불 / 고객상담 (미지원)' },
  { title: '찜 리스트', href: MYPAGE_WISH_PATHNAME },
  { title: '쿠폰 내역', href: MYPAGE_COUPON_PATHNAME },
  { title: '마일리지 내역', href: MYPAGE_MILEAGE_PATHNAME },
  { title: '회원 정보 변경', href: MYPAGE_EDIT_PATHNAME },
  { title: '배송지 관리', href: MYPAGE_ADDRESS_PATHNAME }
];

const MyMainPage = () => {
  const { data: loggedUser, isPending: isAuthPending } = useAuthQuery();
  const { data: coupons, isPending: isCouponPending } = useCouponQuery();

  if (isAuthPending || (loggedUser && isCouponPending)) return <Loading />;

  const name = loggedUser?.userData.name;
  const mileage = loggedUser?.userData.mileage;

  const getHref = (path: string) => (loggedUser ? path : AUTH_LOG_IN_PATHNAME);

  return (
    <div className="flex flex-col">
      <Navbar title="마이페이지" isHome />
      <Profile name={name || ''} />

      <div className="flex bg-muted/30 p-5 gap-x-2.5">
        <InfoCard title="보유 마일리지" href={getHref(MYPAGE_MILEAGE_PATHNAME)}>
          {mileage || '-'}p
        </InfoCard>
        <InfoCard title="쿠폰" href={getHref(MYPAGE_COUPON_PATHNAME)}>
          {coupons?.length || '-'}
        </InfoCard>
        <InfoCard title="후기" href={getHref(MYPAGE_REVIEW_PATHNAME)}>
          {loggedUser ? '2개(임시)' : '-'}
        </InfoCard>
      </div>
      <Banner className="mx-auto my-4" />
      {LINKS.map((link, idx) => {
        return (
          <div key={link.title}>
            {idx % 3 === 0 && idx !== 0 && <div className="bg-muted/30 h-2.5"></div>}
            <LinkCard title={link.title} href={loggedUser ? link.href : AUTH_LOG_IN_PATHNAME} />
          </div>
        );
      })}
      <div className="bg-muted/30 h-2.5"></div>
      <Footer />
    </div>
  );
};

export default MyMainPage;
