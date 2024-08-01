import { getRelatedSearchProducts } from '@/api/product';
import { useQuery } from '@tanstack/react-query';

const useRelatedSearchQuery = (search: string) => {
  return useQuery({
    queryKey: ['relatedSearchProducts', search],
    queryFn: () => getRelatedSearchProducts(search),
    enabled: !!search,
    staleTime: 1000 * 60 * 5,
    select: (data: { data: RelatedSearchProduct[] }) => data.data
  });
};

export default useRelatedSearchQuery;
