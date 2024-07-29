'use client';
import { getUserCoupons } from '@/api/myPage';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

const useCouponQuery = () => {
  const { loggedUser } = useAuth();
  const userId: Tables<'Users'>['id'] = loggedUser ? loggedUser.id : '';

  return useQuery<Tables<'Coupon'>[], Error>({
    queryKey: ['user', 'coupon'],
    queryFn: () => getUserCoupons(userId),
    enabled: !!userId
  });
};

export default useCouponQuery;
