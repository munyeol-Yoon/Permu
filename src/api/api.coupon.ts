import supabase from './supabase';

export const getCouponByUser = async (userId: string): Promise<{ couponId: string; discount: number }[]> => {
  const { data, error } = await supabase.from('Coupon').select('couponId,discount').eq('userId', userId);
  if (error) throw error;
  return data;
};
