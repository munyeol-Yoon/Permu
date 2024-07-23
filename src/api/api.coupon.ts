import { createClient } from '@/app/supabase/client';

const supabase = createClient();

export const getCouponByUser = async (userId: string): Promise<{ couponId: string; discount: number }[]> => {
  const { data, error } = await supabase.from('Coupon').select('couponId,discount').eq('userId', userId);
  if (error) throw error;
  return data;
};
