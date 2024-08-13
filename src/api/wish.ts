import { TWish } from '@/types/products';
export const postWishByUser = async ({ productId, userId }: TWish): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/wishes?productId=${productId}&userId=${userId}`,
    {
      method: 'POST'
    }
  );

  const data = await response.json();
  return data;
};
export const deleteWishByUser = async ({ productId, userId }: TWish): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/wishes?productId=${productId}&userId=${userId}`,
    {
      method: 'DELETE'
    }
  );
  const data = await response.json();
  return data;
};

export const getWishById = async ({
  productId,
  userId
}: {
  productId: number | null;
  userId: string | undefined;
}): Promise<{ success: boolean; data: TWish | null; count: number }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/wishes?productId=${productId}&userId=${userId}`,
    {
      method: 'GET'
    }
  );
  const data = await response.json();

  return data;
};

export const getWishes = async (): Promise<TWish[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/wishes`, {
    method: 'GET'
  });

  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};
