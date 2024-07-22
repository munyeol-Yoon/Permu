import supabase from './supabase';

export const postWishByUser = async (productId: string, userId: string): Promise<void> => {
  const { error } = await supabase.from('Wishes').insert({ productId, userId });
  if (error) throw error;
};
export const deleteWishByUser = async (productId: string, userId: string): Promise<void> => {
  const { error } = await supabase.from('Wishes').delete().eq('userId', userId).eq('productId', productId);
  if (error) throw error;
};
export const getWishesByUser = async (productId: string, userId: string): Promise<Wishes[]> => {
  const { data, error } = await supabase.from('Wishes').select('*').eq('productId', productId).eq('userId', userId);
  if (error) throw error;
  return data;
};
