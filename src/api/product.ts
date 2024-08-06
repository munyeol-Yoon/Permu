import { Product } from '@/types/products';

export const getSearchProducts = async (search?: string, categoryId?: string) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search`);

  if (search) {
    url.searchParams.append('query', search);
  }

  if (categoryId) {
    url.searchParams.append('categoryId', categoryId);
  }

  const res = await fetch(url.toString());

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

export const getDetailProduct = async (productId: string): Promise<Product> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/product?productId=${productId}`);
  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};

export const getProducts = async (productIds?: number[] | null): Promise<Product[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?productIds=${productIds}`);

  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};
