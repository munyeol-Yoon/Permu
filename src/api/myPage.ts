import { Tables } from '@/types/supabase';

export const getUserCoupons = async (userId: Tables<'Users'>['id']) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my/coupon?userId=${userId}`);
  const data = await response.json();
  if (data) return data;
};
