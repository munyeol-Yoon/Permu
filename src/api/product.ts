import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import supabase from './supabase';

export const getProductById = async ({ params }: Params): Promise<Product> => {
  const { data, error } = await supabase.from('Products').select('*').eq('productId', params.productId).single();
  if (error) throw error;
  return data;
};
export const addProductWish = async (productId: string, userId: string): Promise<void> => {
  const { error } = await supabase.from('Wishes').insert({ productId, userId });
  if (error) throw error;
};
export const deleteProductWish = async (productId: string, userId: string): Promise<void> => {
  const { error } = await supabase.from('Wishes').delete().eq('userId', userId).eq('productId', productId);
  if (error) throw error;
};
