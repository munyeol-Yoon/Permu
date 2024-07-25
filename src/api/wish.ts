type Tfetch = {
  productId: number;
  userId: string;
};
export const fetchPostWishByUser = async ({ productId, userId }: Tfetch): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/wishes/create?productId=${productId}&userId=${userId}`,
    {
      method: 'POST'
    }
  );

  const data = await response.json();
  return data;
};
export const fetchDeleteWishByUser = async ({ productId, userId }: Tfetch): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/wishes/delete?productId=${productId}&userId=${userId}`,
    {
      method: 'DELETE'
    }
  );
  const data = await response.json();
  return data;
};

export const fetchWishByUser = async ({ productId, userId }: Tfetch): Promise<Wish[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/wishes/read?productId=${productId}&userId=${userId}`,
    {
      method: 'GET'
    }
  );
  const data = await response.json();

  return data;
};