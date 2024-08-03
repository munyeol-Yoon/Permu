import { Product } from '@/types/products';
import { Tables } from '@/types/supabase';

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

export const getCategoryById = async (categoryId: string): Promise<Tables<'Categories'>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/category?categoryId=${categoryId}`);
  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};

export const getProducts = async (option: string): Promise<Product[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?option=${option}`);

  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};

export const getProductsByWish = async (): Promise<Product[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/wishes`, {
    method: 'GET'
  });

  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  const countMap = data.reduce((acc: number[], cur: { productId: number }) => {
    acc[cur.productId] = (acc[cur.productId] || 0) + 1;
    return acc;
  }, {});

  const result = Object.entries(countMap)
    .map(([productId, count]) => ({
      productId: +productId,
      count: count as number
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
  const data2 = await Promise.all(result.map((product) => getDetailProduct(`${product.productId}`)));

  return data2;
};
