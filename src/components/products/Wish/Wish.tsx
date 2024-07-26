'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useWishesMutation } from '@/hooks/mutation';
import { useWishesQuery } from '@/hooks/query';
import { useParams, useRouter } from 'next/navigation';

const Wish = () => {
  const router = useRouter();
  const { productId } = useParams<{ productId: string }>();
  const { loggedUser } = useAuth();
  const { data: getLikes } = useWishesQuery({ productId: Number(productId) });
  const userLike = !!getLikes?.data.find((like: Wish) => like.userId == loggedUser?.id);

  const addMutation = useWishesMutation({ getLikes: { data: getLikes?.data, userLike }, productId: Number(productId) });

  const handleWish = () => {
    if (!loggedUser) {
      alert('로그인하셈');
      router.push('/auth/log-in');
    } else addMutation.mutate();
  };
  return (
    <Button variant={userLike ? 'default' : 'outline'} onClick={handleWish}>
      <span>
        🤍 좋아요 <span className="font-bold">{getLikes?.data.length}</span>
      </span>
    </Button>
  );
};

export default Wish;
