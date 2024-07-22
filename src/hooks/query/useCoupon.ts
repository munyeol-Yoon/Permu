'use client';
import { getUserCoupons } from '@/api/myPage';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

const useCoupon = () => {
  const { loggedUser } = useAuth();
  const userId: Tables<'users'>['id'] = loggedUser ? loggedUser.id : '';

  return useQuery({
    queryKey: ['user', 'coupon'],
    queryFn: () => getUserCoupons(userId),
    enabled: !!userId
  });
};

export default useCoupon;
