'use client';

import signUpImg from '@/assets/sign-up.png';
import { Button } from '@/components/ui/button';
import { useAuthMutation } from '@/hooks/mutation';
import Image from 'next/image';
import Link from 'next/link';

const SignUpPage = () => {
  const { logInMutation } = useAuthMutation();

  const handleLogin = () => logInMutation('kakao');
  return (
    <>
      <div className="flex relative p-5">
        <Link href="log-in" className="absolute">
          ⬅️
        </Link>
        <h1 className="mx-auto">회원가입</h1>
      </div>

      <Image src={signUpImg} width={600} height={600} alt="회원가입 해택" />

      <div className="flex flex-col px-[100px]">
        <Button className="bg-yellow-400 text-black" onClick={handleLogin}>
          카카오톡으로 가입하기
        </Button>
        <Button>Google 아이디로 가입하기</Button>
        <Button variant="outline">이메일로 가입하기</Button>
      </div>
    </>
  );
};

export default SignUpPage;
