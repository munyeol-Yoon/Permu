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

export const getProductsByBrandForThisWeek = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/brands`);

  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};

export const getProductsByCategoryForThisWeek = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/category?categoryIds=${'667097f5-907d-4670-ae4b-c1d813f8963b,03a31c14-74b9-4f43-9d26-eb73e2f09ef1,9ef47110-2c71-4db3-a335-7b63cf2f321c,cc9c8b21-070c-4af9-8895-25269a15bad0'}`
  );

  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};
