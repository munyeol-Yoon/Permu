import { createClient } from '@/app/supabase/client';

const supabase = createClient();

export const postCartByUser = async (productId: number, userId: string): Promise<void> => {
  const { error } = await supabase.from('Carts').insert({ productId, userId, count: 1 });
  if (error) throw error;
};
export const patchCartByUser = async (productId: number, userId: string, count: number): Promise<void> => {
  if (count < 1) {
    throw new Error('Count must be at least 1');
  }
  const { error } = await supabase.from('Carts').update({ count }).eq('productId', productId).eq('userId', userId);
  if (error) throw error;
};
export const deleteAllCartByUser = async (userId: string): Promise<void> => {
  const { error } = await supabase.from('Carts').delete().eq('userId', userId);
  if (error) throw error;
};
export const deleteCartByUser = async (productId: number, userId: string): Promise<void> => {
  const { error } = await supabase.from('Carts').delete().eq('userId', userId).eq('productId', productId);
  if (error) throw error;
};
export const getCartsByUser = async (userId: string): Promise<Cart[]> => {
  const { data, error } = await supabase
    .from('Carts')
    .select(`*, Products (category,title,price,thumbNailURL,discount)`)
    .eq('userId', userId)
    .order('productId', { ascending: false });
  if (error) throw error;

  const cartsWithDiscountedPrice = data?.map((cart: Cart) => ({
    ...cart,
    Products: {
      ...cart.Products,
      discountedPrice: cart.Products.price - (cart.Products.price * cart.Products.discount) / 100
    }
  }));
  return cartsWithDiscountedPrice;
};
