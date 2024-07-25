import { createClient } from '@/app/supabase/client';

const supabase = createClient();
export const fetchPostWishByUser = async ({
  productId,
  userId
}: {
  productId: number;
  userId: string;
}): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/wishes/create?productId=${productId}&userId=${userId}`,
    {
      method: 'POST'
    }
  );

  const data = await response.json();
  return data;
};

export const deleteWishByUser = async (productId: number, userId: string): Promise<void> => {
  const { error } = await supabase.from('Wishes').delete().eq('userId', userId).eq('productId', productId);
  if (error) throw error;
};

export const fetchWishByUser = async ({
  productId,
  userId
}: {
  productId: number;
  userId: string;
}): Promise<Wish[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/wishes/read?productId=${productId}&userId=${userId}`,
    {
      method: 'GET'
    }
  );
  const data = await response.json();

  return data;
};
