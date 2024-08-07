'use client';
import Navbar from '@/components/Navbar';
import { AUTH_LOG_IN_PATHNAME, MYPAGE_INFO_EDIT_PATHNAME, MYPAGE_PASSWORD_EDIT_PATHNAME } from '@/constant/pathname';
import { useAuth } from '@/contexts/auth.context/auth.context';
import LinkCard from '../_components/LinkCard';
import Profile from '../_components/Profile';
const LINKS = [
  { title: '회원정보 변경', href: MYPAGE_INFO_EDIT_PATHNAME },
  { title: '비밀번호 변경', href: MYPAGE_PASSWORD_EDIT_PATHNAME },
  { title: '배송지관리 (미지원)' },
  { title: '환불계좌관리 (미지원)' }
];
const UserInfoEditPage = () => {
  const { loggedUser } = useAuth();
  const name = loggedUser?.userData.name || '';
  return (
    <div>
      <Navbar title="설정" isHome />
      <Profile name={name} />

      <div className="flex flex-col bg-slate-100">
        {LINKS.map((link) => (
          <LinkCard key={link.title} title={link.title} href={loggedUser ? link.href : AUTH_LOG_IN_PATHNAME} />
        ))}
      </div>
    </div>
  );
};

export default UserInfoEditPage;
