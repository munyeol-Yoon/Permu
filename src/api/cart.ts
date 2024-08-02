export const postCartByUser = async (productId: number, userId: string): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carts/${userId}`, {
    method: 'POST',
    body: JSON.stringify({ productId })
  });
  const data = await response.json();
  return data;
};

export const patchCartByUser = async ({
  productId,
  userId,
  count,
  isSelected
}: {
  productId: number;
  userId: string;
  count?: number;
  isSelected?: boolean;
}): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carts/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      productId,
      count,
      isSelected
    })
  });
  const data = await response.json();
  return data;
};

export const deleteAllCartByUser = async (userId: string): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carts/${userId}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data;
};

export const deleteCartByUser = async (productId: number, userId: string): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carts/${userId}`, {
    method: 'DELETE',
    body: JSON.stringify({ productId })
  });
  const data = await response.json();
  return data;
};

export const getCartsByUser = async (userId: string): Promise<any[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carts/${userId}`, {
    method: 'GET'
  });
  const data = await response.json();
  return data;
};
