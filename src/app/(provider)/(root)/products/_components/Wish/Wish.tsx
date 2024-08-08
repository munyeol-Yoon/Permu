'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useWishesMutation } from '@/hooks/mutation';
import { useWishesQuery } from '@/hooks/query';
import useAlert from '@/hooks/useAlert';
import { Params, TWish } from '@/types/products';
import BlackWishSVG from '@@/public/heart/black-wish-icon.svg';
import WishSVG from '@@/public/heart/default-wish-icon.svg';
import SelectWishSVG from '@@/public/heart/select-wish-icon.svg';
import MainWishSVG from '@@/public/heart/wish-icon.svg';
import { useParams, useRouter } from 'next/navigation';

const Wish = ({ inner = true }: { inner?: boolean }) => {
  const router = useRouter();
  const { showInfoAlert } = useAlert();
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
      showInfoAlert('로그인이 필요한 서비스 입니다');
      router.push('/auth/log-in');
    } else addMutation.mutate();
  };
  if (inner) {
    return (
      <Button className="w-full h-[64px]" variant={userLike ? 'default' : 'defaultline'} onClick={handleWish}>
        <div className="flex-row-10 justify-center p-5-2 w-full">
          <span>{userLike ? <SelectWishSVG /> : <WishSVG />}</span>
          <span>좋아요</span>
          <span className="font-bold">{getLikes?.data.length}</span>
        </div>
      </Button>
    );
  } else {
    return (
      <div className="flex flex-col items-center w-8 hover:cursor-pointer" onClick={handleWish}>
        <span>{userLike ? <BlackWishSVG /> : <MainWishSVG />}</span>
        <span className="text-sm">{getLikes?.data.length.toLocaleString()}</span>
      </div>
    );
  }
};

export default Wish;
