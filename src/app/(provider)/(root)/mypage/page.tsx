'use client';
import Navbar from '@/components/Navbar';
import { HOME } from '@/constant/pathname';
import { useAuth } from '@/contexts/auth.context/auth.context';
import InfoCard from './_components/InfoCard';
import Profile from './_components/Profile';

// TODO : 쿠폰, 후기 데이터 가져오기
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
      {/* <div>
        <p>프로필 : </p>
        <p>이름 : {name}</p>
        <p>전화번호 {phone}</p>
        <p>주소 : </p>
      </div>
      <div className="border-t">
        <Button>주문 내역</Button>
        <Button>문의 내역</Button>
        <Button>고객 내역</Button>
      </div>
      <Link className="border bg-blue-200 p-1 rounded" href="/user/edit">
        회원 정보 수정
      </Link> */}
    </div>
  );
};

export default MyMainPage;
