'use client';
import { Button } from '@/components/ui/button';
import useWishesMutation from '@/hooks/mutation/useWishesMutation';
import useWishesQuery from '@/hooks/query/useWishesQuery';
import { useParams } from 'next/navigation';
const DEFAULT_HEART = '🤍';
const PUSHED_HEART = '❤️';

const Wish = () => {
  const { productId } = useParams<{ productId: string }>();
  const userId = 'c7b26340-92fc-4dc3-91ec-5151091251f2';

  const { data: getLikes } = useWishesQuery({ productId: Number(productId), userId });
  const addMutation = useWishesMutation({ getLikes, productId: Number(productId), userId });

  return (
    <Button variant="outline" onClick={() => addMutation.mutate()}>
      <span>
        {getLikes?.userLike ? PUSHED_HEART : DEFAULT_HEART} 좋아요 {getLikes?.data.length}
      </span>
    </Button>
  );
};

export default Wish;
