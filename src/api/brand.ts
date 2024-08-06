import { Tables } from '@/types/supabase';

export const getBrandById = async (brandId?: string | null): Promise<Tables<'Brands'>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands/brand?brandId=${brandId}`);
  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};

export const getBrands = async (brandIds: number[] | null): Promise<Tables<'Brands'>[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands?brandIds=${brandIds}`);
  if (!response.ok) throw new Error('response 에러');
  const data = await response.json();
  return data;
};
