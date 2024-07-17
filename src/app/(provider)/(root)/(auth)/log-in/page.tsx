'use client';
import { useAuth } from '@/contexts/auth.context/auth.context';

const LogInPage = () => {
  const { me, logInWithProvider, logOut } = useAuth();
  const handleLogin = () => logInWithProvider('kakao');
  const handleLogOut = () => logOut();
  return (
    <>
      <p>로그인 여부 :{me?.email}</p>
      <div className="flex flex-col gap-5">
        <button className="border bg-yellow-200" onClick={handleLogin}>
          카카오 로그인
        </button>
        <button className="border bg-blue-200" onClick={handleLogOut}>
          로그아웃
        </button>
      </div>
    </>
  );
};

export default LogInPage;
