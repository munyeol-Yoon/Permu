'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useWishesMutation } from '@/hooks/mutation';
import { useWishesQuery } from '@/hooks/query';
import { Params, TWish } from '@/types/products';
import WishSVG from '@@/public/default-wish-icon.svg';
import SelectWishSVG from '@@/public/select-wish-icon.svg';
import { useParams, useRouter } from 'next/navigation';

const Wish = () => {
  const router = useRouter();
  const { productId } = useParams<Params['params']>();
  const { loggedUser } = useAuth();
  const { data: getLikes } = useWishesQuery({ productId: Number(productId) });
  const userLike = !!getLikes?.data.find((like: TWish) => like.userId == loggedUser?.id);

  const addMutation = useWishesMutation({
    getLikes: { data: getLikes?.data || [], userLike },
    productId: Number(productId)
  });

  const handleWish = () => {
    if (!loggedUser) {
      alert('로그인하셈');
      router.push('/auth/log-in');
    } else addMutation.mutate();
  };
  return (
    <Button className="w-full" variant={userLike ? 'default' : 'outline'} onClick={handleWish}>
      <div className="flex-row-10 justify-center p-5-2 w-full">
        <span>{userLike ? <SelectWishSVG /> : <WishSVG />}</span>
        <span>좋아요</span>
        <span className="font-bold">{getLikes?.data.length}</span>
      </div>
    </Button>
  );
};

export default Wish;
