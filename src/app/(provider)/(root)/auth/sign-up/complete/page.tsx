'use client';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HOME } from '@/constant/pathname';
import useAuthQuery from '@/hooks/query/useAuthQuery';
import Profile from '@@/public/profile/profile-lg.svg';
import Link from 'next/link';
function SignUpCompletePage() {
  const { data: loggedUser, isPending } = useAuthQuery();
  if (isPending) return <Loading />;

  const {
    user_metadata: { full_name },
    userData: { name, phone }
  } = loggedUser;
  return (
    <div>
      <Navbar title="로그인" />

      <div className="px-12">
        <Tabs defaultValue="c">
          <TabsList className="flex">
            <TabsTrigger value="a" disabled>
              약관동의
            </TabsTrigger>
            <TabsTrigger value="b" disabled>
              계정생성
            </TabsTrigger>
            <TabsTrigger value="c">가입완료</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col items-center justify-center mt-20">
          <Profile />
          <p className="text-xl font-semibold py-5">{name || full_name} 회원님</p>
          <p className="text-muted/">{phone}</p>
          <Button asChild className="bg-accent mt-12 ">
            <Link href={HOME}>홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUpCompletePage;
