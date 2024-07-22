import { createClient } from '@/app/supabase/server';
import { Order } from '@/types/order';

export const insertOrder = async (order: Order) => {
  const supabase = createClient();
  const { error } = await supabase.from('Orders').insert(order);
  if (error) throw new Error(error.message);
};
