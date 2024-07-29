import { Product } from '@/types/products';

export const getSearchProducts = async (search: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${search}`);

  if (!res.ok) {
    throw new Error('response 에러');
  }

  const data = await res.json();
  return data;
};

export const getRelatedSearchProducts = async (search: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/relation?query=${search}`);

  if (!res.ok) {
    throw new Error('response 에러');
  }

  const data = await res.json();

  return data;
};

export const fetchDetailProduct = async (productId: string): Promise<Product> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/product?productId=${productId}`);
  const data = await response.json();
  return data;
};
