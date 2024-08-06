import { createClient } from '@/supabase/server';
import { Order, OrderDetail } from '@/types/order';

// Orders Table

export const insertOrder = async (order: Order) => {
  const supabase = createClient();
  const { error } = await supabase.from('Orders').insert(order);
  if (error) throw new Error(error.message);
};

export const updateOrderStatus = async (orderId: string, status: 'PENDING' | 'COMPLETED' | 'FAILED') => {
  const supabase = createClient();
  const { error } = await supabase.from('Orders').update({ orderStatus: status }).eq('orderId', orderId);
  if (error) throw new Error(error.message);
};

export const updateOrderDeliverId = async (orderId: string, deliverId: string) => {
  const supabase = createClient();
  const { error } = await supabase.from('Orders').update({ deliverId }).eq('orderId', orderId);
  if (error) throw new Error(error.message);
};

// OrdersDetail Table

export const insertOrderDetail = async (orderDetail: OrderDetail) => {
  const supabase = createClient();
  const { error } = await supabase.from('OrdersDetail').insert(orderDetail);
  if (error) throw new Error(error.message);
};
