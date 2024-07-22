'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth.context/auth.context';
import useAuthHandlers from '@/hooks/mutation/useAuthHandlers';

const RootPage = () => {
  const { loggedUser } = useAuth();
  const { logOutMutation } = useAuthHandlers();
  return (
    <div>
      하위~ {loggedUser?.email}
      <Button onClick={() => logOutMutation()}>로그아웃 </Button>
    </div>
  );
};

export default RootPage;
