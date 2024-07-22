import { createClient } from '@/supabase/client';

export const getUserCoupons = async (userId) => {
  try {
    const supabase = createClient();
    const { data: userCoupons, error } = await supabase.from('Coupon').select('*').eq('userId', userId);
    if (userCoupons) return userCoupons;
    if (error) throw new Error(error.message);
  } catch (error) {
    console.log(error);
  }
};
