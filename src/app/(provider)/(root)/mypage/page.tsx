'use client';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { HOME } from '@/constant/pathname';
import { useAuth } from '@/contexts/auth.context/auth.context';
import Link from 'next/link';
import Profile from './_components/Profile';

const MyMainPage = () => {
  const { loggedUser } = useAuth();
  if (!loggedUser) return <div>로그인한 유저 없음 로그인 필요</div>;

  const {
    userData: { name, mileage, phone }
  } = loggedUser;

  return (
    <div className="flex flex-col">
      <Navbar title="마이페이지" href={HOME} />

      <Profile name={name || ''} />

      <div>
        <p>프로필 : </p>
        <p>이름 : {name}</p>
        <p>전화번호 {phone}</p>
        <p>주소 : </p>
        <p>쿠폰 : </p>
        <p>마일리지 : {mileage}</p>
      </div>
      <div className="border-t">
        <Button>주문 내역</Button>
        <Button>문의 내역</Button>
        <Button>고객 내역</Button>
      </div>
      <Link className="border bg-blue-200 p-1 rounded" href="/user/edit">
        회원 정보 수정
      </Link>
    </div>
  );
};

export default MyMainPage;
