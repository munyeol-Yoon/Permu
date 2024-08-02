'use client';
import Navbar from '@/components/Navbar';
import {
  HOME,
  MYPAGE_COUPON_PATHNAME,
  MYPAGE_EDIT_PATHNAME,
  MYPAGE_MILEAGE_PATHNAME,
  MYPAGE_ORDERS_PATHNAME,
  MYPAGE_WISH_PATHNAME
} from '@/constant/pathname';
import { useAuth } from '@/contexts/auth.context/auth.context';
import InfoCard from './_components/InfoCard';
import LinkCard from './_components/LinkCard';
import Profile from './_components/Profile';
// TODO : 쿠폰, 후기 데이터 가져오기
// TODO : 로그인한 유저 없을 때 화면 만들기
// TODO : Navbar 이전 페이지, 홈으로 이동하도록 수정
// TODO : 이동 가능한 부분 pointer
// TODO : 배송지 관리 물어보기

const MyMainPage = () => {
  const { loggedUser } = useAuth();
  if (!loggedUser) return <div>로그인한 유저 없음 로그인 필요</div>;

  const {
    userData: { name, mileage }
  } = loggedUser;

  return (
    <div className="flex flex-col">
      <Navbar title="마이페이지" href={HOME} />

      <Profile name={name || ''} />

      <div className="flex bg-slate-200 p-5 gap-x-2.5">
        <InfoCard title="보유 마일리지">{mileage}p</InfoCard>
        <InfoCard title="쿠폰">12</InfoCard>
        <InfoCard title="후기">125개</InfoCard>
      </div>

      <div className="bg-blue-500">이미지 배너</div>

      <div className="flex flex-col bg-slate-100 gap-y-5">
        <div>
          <LinkCard title="주문/배송 내역" href={MYPAGE_ORDERS_PATHNAME} />
          <LinkCard title="취소/반품 내역 (미지원)" />
          <LinkCard title="환불 / 고객상담 (미지원)" />
        </div>
        <div>
          <LinkCard title="찜 리스트" href={MYPAGE_WISH_PATHNAME} />
          <LinkCard title="쿠폰 내역" href={MYPAGE_COUPON_PATHNAME} />
          <LinkCard title="마일리지 내역" href={MYPAGE_MILEAGE_PATHNAME} />
        </div>
        <div>
          <LinkCard title="회원 정보 변경" href={MYPAGE_EDIT_PATHNAME} />
          <LinkCard title="배송지 관리" href={HOME} />
        </div>
        <div>
          <LinkCard title="사업자 정보" />
          <LinkCard title="법적고지사항" />
          <LinkCard title="고객지원" />
        </div>
      </div>
    </div>
  );
};

export default MyMainPage;
