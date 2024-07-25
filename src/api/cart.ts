export const postCartByUser = async (productId: number, userId: string): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/carts/create?productId=${productId}&userId=${userId}`,
    {
      method: 'POST'
    }
  );
  const data = await response.json();
  return data;
};
export const patchCartByUser = async ({
  productId,
  userId,
  count
}: {
  productId: number;
  userId: string;
  count: number;
}): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/carts/update?productId=${productId}&userId=${userId}&count=${count}`,
    {
      method: 'PATCH'
    }
  );
  const data = await response.json();
  return data;
};
export const deleteAllCartByUser = async (userId: string): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carts/delete/all?userId=${userId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data;
};
export const deleteCartByUser = async (productId: number, userId: string): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/carts/delete?productId=${productId}&userId=${userId}`,
    {
      method: 'DELETE'
    }
  );
  const data = await response.json();
  return data;
};
export const getCartsByUser = async (userId: string): Promise<Cart[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carts/read?userId=${userId}`, {
    method: 'GET'
  });
  const data = await response.json();
  return data;
};
