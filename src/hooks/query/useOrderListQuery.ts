import { useQuery } from '@tanstack/react-query';

const useOrderListQuery = () => {
  const result = useQuery({
    queryKey: ['orderList'],
    queryFn: async () => {
      // TODO: 상수로 박혀있는 userId 바꾸기
      const res = await fetch('/api/orderList/d075a7dd-98bb-4e69-9209-e03c6057a901');
      const data = await res.json();
      return data;
    }
  });

  return result;
};

export default useOrderListQuery;
