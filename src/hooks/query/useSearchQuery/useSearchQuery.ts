import { getSearchProducts } from '@/api/product';
import { useQuery } from '@tanstack/react-query';

const useSearchQuery = (search: string, isEnabled: boolean) => {
  const result = useQuery({
    queryKey: ['search', search],
    queryFn: () => getSearchProducts(search),
    enabled: isEnabled
  });

  return result;
};

export default useSearchQuery;
