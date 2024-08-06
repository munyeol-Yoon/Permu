import { getBrands } from '@/api/brand';
import { useQuery } from '@tanstack/react-query';

const useBrandsQuery = (brandIds: number[]) => {
  return useQuery({
    queryKey: ['Brands', brandIds],
    queryFn: async () => await getBrands(brandIds)
  });
};

export default useBrandsQuery;
