import { createClient } from '@/app/supabase/client';

const supabase = createClient();

export const getCouponByUser = async (userId: string): Promise<Coupon[]> => {
  const { data, error } = await supabase.from('Coupon').select('*').eq('userId', userId);
  if (error) throw error;
  return data;
};
