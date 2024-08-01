import { getSearchProducts } from '@/api/product';
import { useQuery } from '@tanstack/react-query';

const useSearchQuery = (search?: string, categoryId?: string) => {
  return useQuery({
    queryKey: ['search', search, categoryId],
    queryFn: () => getSearchProducts(search, categoryId)
  });
};

export default useSearchQuery;
