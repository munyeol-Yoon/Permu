import { createClient } from '@/app/supabase/server';

export const getProductById = async (productId: string) => {
  const supabase = createClient();
  const { data: product, error } = await supabase.from('Products').select('*').eq('productId', productId);

  if (error) throw new Error(error.message);

  return product;
};
