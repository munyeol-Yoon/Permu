import { Tables } from '@/types/supabase';

export const getAllCategory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`);

  if (!res.ok) {
    throw new Error('response 에러');
  }

  const result = await res.json();

  return result.data;
};

export const getCategoryById = async (categoryId: string): Promise<Tables<'Categories'>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/category?categoryId=${categoryId}`);
  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};
