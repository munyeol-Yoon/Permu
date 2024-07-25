'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth.context/auth.context';
import useAuthHandlers from '@/hooks/mutation/useAuthHandlers';
import Link from 'next/link';

const RootPage = () => {
  const { loggedUser } = useAuth();
  const { logOutMutation } = useAuthHandlers();
  return (
    <div>
      하위~ {loggedUser?.email}
      <Button onClick={() => logOutMutation()}>로그아웃 </Button>
      <Link href="user/coupon">쿠폰페이지</Link>
    </div>
  );
};

export default RootPage;
