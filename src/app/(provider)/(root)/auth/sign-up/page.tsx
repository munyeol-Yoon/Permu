'use client';

import signUpImg from '@/assets/sign-up.png';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { AUTH_SIGN_UP_AGREEMENT_PATHNAME } from '@/constant/pathname';
import { useAuthMutation } from '@/hooks/mutation';
import { Provider } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';

const SignUpPage = () => {
  const { logInWithProviderMutation } = useAuthMutation();
  const handleSignUp = (provider: Provider) => logInWithProviderMutation(provider);
  return (
    <>
      <Navbar title="회원가입" />

      <Image src={signUpImg} width={600} height={600} alt="회원가입 해택" />

      <div className="flex flex-col px-[100px]">
        <Button className="bg-yellow-400 text-black" onClick={() => handleSignUp('kakao')}>
          카카오톡으로 가입하기
        </Button>
        <Button onClick={() => handleSignUp('google')}>Google 아이디로 가입하기</Button>
        <Button asChild variant="outline">
          <Link href={AUTH_SIGN_UP_AGREEMENT_PATHNAME}>이메일로 가입하기</Link>
        </Button>
      </div>
    </>
  );
};

export default SignUpPage;
