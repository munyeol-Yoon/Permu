import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import supabase from './supabase';

export const getProductById = async ({ params }: Params): Promise<Product> => {
  const { data, error } = await supabase.from('Products').select('*').eq('productId', params.productId).single();
  if (error) throw error;
  return data;
};

export const getWishesByUser = async (productId: string, userId: string): Promise<any> => {
  const { data, error } = await supabase.from('Wishes').select('*').eq('productId', productId);
  const userLike = !!data?.find((like) => like.userId === userId);
  if (error) throw error;
  return { data, userLike };
};

export const postWishByUser = async (productId: string, userId: string): Promise<void> => {
  const { error } = await supabase.from('Wishes').insert({ productId, userId });
  if (error) throw error;
};
export const deleteWishByUser = async (productId: string, userId: string): Promise<void> => {
  const { error } = await supabase.from('Wishes').delete().eq('userId', userId).eq('productId', productId);
  if (error) throw error;
};

export const postCartByUser = async (productId: string, userId: string, count: number): Promise<void> => {
  const { error } = await supabase.from('Carts').insert({ productId, userId, count });
  if (error) throw error;
};
export const patchCartByUser = async (productId: string, userId: string, count: number): Promise<void> => {
  const { error } = await supabase.from('Carts').update({ productId, userId, count });
  if (error) throw error;
};
export const deleteAllCartByUser = async (userId: string): Promise<void> => {
  const { error } = await supabase.from('Carts').delete().eq('userId', userId);
  if (error) throw error;
};
export const getCartsByUser = async (userId: string): Promise<any> => {
  const { data, error } = await supabase.from('Carts').select(`*, Products (*)`).eq('userId', userId);
  if (error) throw error;

  return data;
};
