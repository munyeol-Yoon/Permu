import { getAllCategory } from '@/api/categories';
import { useQuery } from '@tanstack/react-query';

const useCategoryQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategory()
  });
};

export default useCategoryQuery;
