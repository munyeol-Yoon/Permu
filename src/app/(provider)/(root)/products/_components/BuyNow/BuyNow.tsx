'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const BuyNow = () => {
  const router = useRouter();
  return (
    <Button className="w-full" onClick={() => router.push('/order/delivery')}>
      바로 구매하기
    </Button>
  );
};

export default BuyNow;
