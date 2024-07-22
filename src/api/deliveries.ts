import { createClient } from '@/app/supabase/server';
import { DeliveryInfo } from '@/types/deliveries';

export const insertDeliveryInfo = async (deliveryInfo: DeliveryInfo) => {
  const supabase = createClient();
  const { error } = await supabase.from('Deliveries').insert(deliveryInfo);
  if (error) throw new Error(error.message);
};
