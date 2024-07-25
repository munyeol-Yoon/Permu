import { createClient } from '@/supabase/server';
import { Order, OrderDetail } from '@/types/order';

// Orders Table

export const insertOrder = async (order: Order) => {
  const supabase = createClient();
  const { error } = await supabase.from('Orders').insert(order);
  if (error) throw new Error(error.message);
};

// OrdersDetail Table

export const insertOrderDetail = async (orderDetail: OrderDetail) => {
  const supabase = createClient();
  const { error } = await supabase.from('OrdersDetail').insert(orderDetail);
  if (error) throw new Error(error.message);
};
