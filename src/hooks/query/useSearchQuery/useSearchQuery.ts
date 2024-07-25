import { getSearchProducts } from '@/api/product';
import { useQuery } from '@tanstack/react-query';

const useSearchQuery = (search: string, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['search', search],
    queryFn: () => getSearchProducts(search),
    enabled: isEnabled
  });
};

export default useSearchQuery;
