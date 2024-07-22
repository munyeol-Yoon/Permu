import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import supabase from './supabase';

export const getProductById = async ({ params }: Params): Promise<Product> => {
  const { data, error } = await supabase.from('Products').select('*').eq('productId', params.productId).single();
  if (error) throw error;
  const productWithDiscountedPrice: Product = {
    ...data,
    discountedPrice: data.price - (data.price * data.discount) / 100
  };
  return productWithDiscountedPrice;
};
