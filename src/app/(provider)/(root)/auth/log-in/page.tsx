'use client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthMutation } from '@/hooks/mutation';
import Link from 'next/link';

const LogInPage = () => {
  const { logInMutation } = useAuthMutation();
  const handleLogin = () => logInMutation('kakao');
  return (
    <>
      <div className="flex relative p-5">
        <Link href="/" className="absolute">
          ⬅️
        </Link>
        <h1 className="mx-auto">로그인</h1>
      </div>

      <Tabs defaultValue="member" className="px-12">
        <TabsList className="flex">
          <TabsTrigger value="member">가입 회원</TabsTrigger>
          <TabsTrigger value="guest">비회원 주문 조회</TabsTrigger>
        </TabsList>

        <TabsContent value="member">
          <div className="w-full px-[50px]">
            <form className="flex flex-col gap-y-4 mt-28">
              <input type="email" id="id" className="border p-2.5 rounded" placeholder="아이디를 입력해주세요" />
              <input
                type="password"
                id="password"
                className="border p-2.5 rounded mb-10"
                placeholder="비밀번호를 입력해주세요"
              />
              <Button>로그인</Button>
            </form>

            <div className="flex justify-between">
              <label htmlFor="auto-login">
                <input type="radio" id="auto-login" />
                자동 로그인
              </label>

              {/* Link로 변경 */}
              <div className="flex">
                <p>아이디 찾기</p>|<p>비밀번호 찾기</p>
              </div>
            </div>

            <div className="flex flex-col">
              <Button className=" bg-yellow-400 text-black" onClick={handleLogin}>
                카카오 로그인
              </Button>
              <Button variant="outline" href="/auth/sign-up" className=" bg-white text-black">
                회원가입
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
                <Button variant="outline" href="/auth/sign-up" className=" bg-white text-black">
                  회원가입
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default LogInPage;
