import { createClient } from '@/supabase/server';

export const updateUserMileage = async (userId: string, newMileageAmount: number) => {
  const supabase = createClient();
  const { error } = await supabase.from('Users').update({ mileage: newMileageAmount }).eq('id', userId);

  if (error) throw new Error(error.message);
};
