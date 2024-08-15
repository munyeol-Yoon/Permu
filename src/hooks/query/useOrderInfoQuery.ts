import { useQuery } from '@tanstack/react-query';
import useAuthQuery from './useAuthQuery';

const useOrderInfoQuery = (enabled: boolean) => {
  const { data: loggedUser } = useAuthQuery();

  return useQuery({
    queryKey: ['orderInfo', loggedUser?.id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orderInfo/${loggedUser?.id ?? ''}`);
      const data = await res.json();
      return data;
    },
    enabled: enabled && !!loggedUser
  });
};

export default useOrderInfoQuery;
