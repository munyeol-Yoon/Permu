type Tfetch = {
  productId: number;
  userId: string;
};
export const postWishByUser = async ({ productId, userId }: Tfetch): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/wishes?productId=${productId}&userId=${userId}`,
    {
      method: 'POST'
    }
  );

  const data = await response.json();
  return data;
};
export const deleteWishByUser = async ({ productId, userId }: Tfetch): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/wishes?productId=${productId}&userId=${userId}`,
    {
      method: 'DELETE'
    }
  );
  const data = await response.json();
  return data;
};

export const getWishById = async ({ productId }: { productId: number }): Promise<Wish[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/wishes?productId=${productId}`, {
    method: 'GET'
  });
  const data = await response.json();

  return data;
};
