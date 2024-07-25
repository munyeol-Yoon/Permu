export const fetchDetailProduct = async (productId: string): Promise<Product> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/product?productId=${productId}`);
  const data = await response.json();
  return data;
};
