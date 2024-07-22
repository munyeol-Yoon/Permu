import supabase from './supabase';

export const postCartByUser = async (productId: number, userId: string): Promise<void> => {
  const { error } = await supabase.from('Carts').insert({ productId, userId, count: 1 });
  if (error) throw error;
};
export const patchCartByUser = async (productId: number, userId: string, count: number): Promise<void> => {
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
    .select(`*, Products (*)`)
    .eq('userId', userId)
    .order('productId', { ascending: false });
  if (error) throw error;
  return data;
};
