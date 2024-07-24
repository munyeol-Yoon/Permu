import { createClient } from '@/app/supabase/server';

export const updateCouponStatus = async (couponId: string, newStatus: string) => {
  const supabase = createClient();
  const { error } = await supabase.from('Coupon').update({ status: newStatus }).eq('couponId', couponId);

  if (error) throw new Error(error.message);
};
