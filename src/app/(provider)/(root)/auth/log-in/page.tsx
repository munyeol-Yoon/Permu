'use client';
import { useAuth } from '@/contexts/auth.context/auth.context';
import useAuthHandlers from '@/hooks/mutation/useAuthHandlers';
import Link from 'next/link';

const LogInPage = () => {
  const { loggedUser: me } = useAuth();
  const { logInMuatation } = useAuthHandlers();
  const handleLogin = () => logInMuatation('kakao');
  return (
    <>
      <p>로그인 여부 :{me ? me?.email : '안됨'}</p>
      <div className="flex flex-col gap-5">
        <button className="border bg-yellow-200" onClick={handleLogin}>
          카카오 로그인
        </button>
        <Link href="/auth/sign-up" className="border bg-pink-200">
          회원가입
        </Link>
      </div>
    </>
  );
};

export default LogInPage;

