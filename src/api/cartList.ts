import { createClient } from '@/app/supabase/server';

export const getCartListById = async (userId: string) => {
  const supabase = createClient();
  const { data: user, error } = await supabase.from('Carts').select('*').eq('userId', userId);

  if (error) throw new Error(error.message);

  return user;
};
