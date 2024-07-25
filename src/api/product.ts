import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export const fetchDetailProduct = async ({ params }: Params): Promise<Product> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?productId=${params.productId}`);
  const data = await response.json();
  return data;
};
