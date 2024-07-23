import { createClient } from '@/app/supabase/server';

export const getUserById = async (userId: string) => {
  const supabase = createClient();
  const { data: user, error } = await supabase.from('Users').select('*').eq('id', userId);

  if (error) throw new Error(error.message);

  return user;
};
