import { useQuery } from '@tanstack/react-query';

const useOrderInfoQuery = () => {
  // TODO: 하드코딩되어있는 userId 수정
  const result = useQuery({
    queryKey: ['orderInfo'],
    queryFn: async () => {
      const res = await fetch('/api/orderInfo/d075a7dd-98bb-4e69-9209-e03c6057a901');
      const data = await res.json();
      return data;
    }
  });

  return result;
};

export default useOrderInfoQuery;
