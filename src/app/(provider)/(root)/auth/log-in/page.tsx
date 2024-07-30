'use client';
import Navbar from '@/components/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthMutation } from '@/hooks/mutation';
import Link from 'next/link';

const LogInPage = () => {
  const { logInWithProviderMutation } = useAuthMutation();
  const handleKakaoLogin = () => logInWithProviderMutation('kakao');
  const handleGoogleLogin = () => logInWithProviderMutation('google');

  return (
    <>
      <div className="flex flex-col grow">
        <Navbar title="로그인" href="/" />

        <Tabs defaultValue="member" className="px-[50px]">
          <TabsList className="flex">
            <TabsTrigger value="member">가입 회원</TabsTrigger>
            <TabsTrigger value="guest">비회원 주문 조회</TabsTrigger>
          </TabsList>

          <div className="mt-28">
            <TabsContent value="member">
              <div className="w-full px-[50px]">
                <form className="flex flex-col gap-y-4">
                  <input type="email" id="id" className="border p-2.5 rounded" placeholder="아이디를 입력해주세요" />
                  <input
                    type="password"
                    id="password"
                    className="border p-2.5 rounded"
                    placeholder="비밀번호를 입력해주세요"
                  />
                  <Button className="mt-[50px]">로그인</Button>
                </form>

                <div className="flex justify-between">
                  <label htmlFor="auto-login">
                    <input type="radio" id="auto-login" className="mr-2" />
                    자동로그인
                  </label>

                  {/* Link로 변경 */}
                  <div className="flex gap-x-5">
                    <p>아이디 찾기</p>|<p>비밀번호 찾기</p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <Button className="bg-yellow-400 text-black" onClick={handleKakaoLogin}>
                    카카오 로그인
                  </Button>
                  <Button variant="outline" onClick={handleGoogleLogin}>
                    구글 로그인
                  </Button>
                  <Button variant="outline" asChild className=" bg-white text-black">
                    <Link href="/auth/sign-up">회원가입</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guest">
              <div className="px-[50px]">
                <form className="flex flex-col gap-y-4 mt-28">
                  <input type="text" id="guestId" className="border p-2.5 rounded" placeholder="주문자명" />
                  <input type="text" id="orderId" className="border p-2.5 rounded mb-10" placeholder="주문번호" />

                  <div className="flex flex-col">
                    <Button>주문내역 조회하기</Button>
                    <Button variant="outline" asChild className=" bg-white text-black">
                      <Link href="/auth/sign-up">회원가입</Link>
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <div className="bg-blue-500">이벤트 배너 컴포넌트</div>
    </>
  );
};

export default LogInPage;
