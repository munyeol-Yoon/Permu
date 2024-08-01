import { createClient } from '@/supabase/server';

export const getOrderInfoByUserId = async (userId: string) => {
  const supabase = createClient();
  const { data: orderInfo, error } = await supabase
    .from('Carts')
    .select('*, Products (*, Brands (*)), Users (*, Coupon(*))')
    .eq('userId', userId);

  if (error) throw new Error(error.message);

  const productList = orderInfo.map((v) => {
    const discountedPrice = v.Products.price - (v.Products.price * v.Products.discount) / 100;
    return { ...v.Products, discountedPrice };
  });
  const user = orderInfo[0].Users;
  const coupon = orderInfo[0].Users.Coupon;

  return { productList, user, coupon };
};
