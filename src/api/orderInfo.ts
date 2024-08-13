import { createClient } from '@/supabase/client';
import { createClient as createServerClient } from '@/supabase/server';
import { OrderDetail } from '@/types/order';

export const getOrderInfoByUserId = async (userId: string) => {
  const supabase = createServerClient();
  const { data: orderInfo, error } = await supabase
    .from('Carts')
    .select('*, Products (*, Brands (*)), Users (*, Coupon(*))')
    .eq('userId', userId)
    .eq('isSelected', true);

  if (error) throw new Error(error.message);

  const productList = orderInfo.map((v) => {
    const discountedPrice = v.Products.price - (v.Products.price * v.Products.discount) / 100;

    return { ...v.Products, discountedPrice, count: v.count, volume: v.volume };
  });
  const user = orderInfo[0].Users;
  const coupon = orderInfo[0].Users.Coupon;

  return { productList, user, coupon };
};

export const getOrderInfos = async (): Promise<OrderDetail[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from('OrdersDetail').select('orderDetailId,orderId,productId');
  if (error) throw new Error(error.message);

  return data;
};
