import { getSearchProducts } from '@/api/product';
import { useQuery } from '@tanstack/react-query';

const useSearchQuery = (search: string) => {
  return useQuery({
    queryKey: ['search', search],
    queryFn: () => getSearchProducts(search)
  });
};

export default useSearchQuery;
