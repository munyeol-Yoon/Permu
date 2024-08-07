import { Tables } from '@/types/supabase';

export const getUserCoupons = async (userId: Tables<'Users'>['id']) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my/coupon?userId=${userId}`);
  const data = await response.json();
  if (data) return data;
};

export const getUserOrders = async (userId: Tables<'Users'>['id']) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my/orders?userId=${userId}`);
  const { success, data } = await response.json();
  if (success) return data;
};

export const getUserWishes = async (userId: Tables<'Users'>['id']) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my/wishes?userId=${userId}`);
  const { success, data } = await response.json();
  if (success) return data;
};
