'use client';

import { useAuthMutation } from '@/hooks/mutation';
import Link from 'next/link';

const SignUpPage = () => {
  const { logInMutation } = useAuthMutation();

  const handleLogin = () => logInMutation('kakao');
  return (
    <div>
      <Link href="log-in" className="text-2xl">
        ⬅️
      </Link>
      <div className="flex flex-col gap-y-5">
        <div className="border w-full h-14 bg-slate-200">해택</div>
        <div className="border w-full h-14 bg-slate-200">해택</div>
        <div className="border w-full h-14 bg-slate-200">해택</div>
      </div>

      <button className="border bg-yellow-200" onClick={handleLogin}>
        카카오로 회원가입
      </button>
      <Link href="sign-up/form" className="border bg-red-200">
        임시 버튼
      </Link>
    </div>
  );
};

export default SignUpPage;
