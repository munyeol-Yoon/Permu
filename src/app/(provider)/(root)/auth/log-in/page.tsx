'use client';
import Input from '@/components/Input';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AUTH_SIGN_UP_PATHNAME } from '@/constant/pathname';
import { useAuthMutation } from '@/hooks/mutation';
import useAlert from '@/hooks/useAlert';
import Banner from '@@/public/banner/tempBanner.svg';
import { Provider } from '@supabase/supabase-js';
import Link from 'next/link';
import { FormEventHandler, useRef } from 'react';
const LogInPage = () => {
  const { logInWithProviderMutation, logInWithEmailMutation } = useAuthMutation();
  const { showInfoAlert } = useAlert();
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const handleOAuthLogin = (provider: Provider) => logInWithProviderMutation(provider);
  const handleClick = () => showInfoAlert('준비중입니다');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (idRef.current && pwRef.current)
      logInWithEmailMutation({ email: idRef.current.value, password: pwRef.current.value });
  };

  return (
    <>
      <div className="flex flex-col grow">
        <Navbar title="로그인" />
        <Tabs defaultValue="member" className="px-[50px]">
          <TabsList className="flex">
            <TabsTrigger value="member">가입 회원</TabsTrigger>
            <TabsTrigger value="guest">비회원 주문 조회</TabsTrigger>
          </TabsList>

          <div className="mt-28">
            <TabsContent value="member">
              <div className="w-full px-[50px]">
                <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                  <Input type="email" id="id" placeholder="아이디를 입력해주세요" ref={idRef} />
                  <Input type="password" id="password" placeholder="비밀번호를 입력해주세요" ref={pwRef} />
                  <Button className="mt-[50px]">로그인</Button>
                </form>

                <div className="flex justify-between">
                  <label htmlFor="auto-login" className="flex items-center">
                    <Input type="radio" id="auto-login" className="mr-2 w-6 h-6" />
                    자동 로그인
                  </label>

                  {/* Link로 변경 */}
                  <div className="flex gap-x-5">
                    <p className="cursor-pointer" onClick={handleClick}>
                      아이디 찾기
                    </p>
                    |
                    <p className="cursor-pointer" onClick={handleClick}>
                      비밀번호 찾기
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <Button variant="kakao" onClick={() => handleOAuthLogin('kakao')}>
                    카카오 로그인
                  </Button>
                  <Button variant="outline" onClick={() => handleOAuthLogin('google')}>
                    구글 로그인
                  </Button>
                  <Button variant="outline" asChild className="bg-white text-black">
                    <Link href={AUTH_SIGN_UP_PATHNAME}>회원가입</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guest">
              <div className="px-[50px]">
                <form className="flex flex-col gap-y-4 mt-28">
                  <Input id="guestId" placeholder="주문자명" />
                  <Input id="orderId" placeholder="주문번호" className="mb-10" />

                  <div className="flex flex-col">
                    <Button>주문내역 조회하기</Button>
                    <Button variant="outline" asChild className=" bg-white text-black">
                      <Link href={AUTH_SIGN_UP_PATHNAME}>회원가입</Link>
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <Banner className="mx-auto my-4" />
    </>
  );
};

export default LogInPage;
