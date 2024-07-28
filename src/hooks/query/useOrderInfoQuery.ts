import { useAuth } from '@/contexts/auth.context/auth.context';
import { useQuery } from '@tanstack/react-query';

const useOrderInfoQuery = () => {
  const { loggedUser } = useAuth();

  return useQuery({
    queryKey: ['orderInfo', loggedUser?.id],
    queryFn: async () => {
      const res = await fetch(`/api/orderInfo/${loggedUser?.id ?? ''}`);
      const data = await res.json();
      return data;
    }
  });
};

export default useOrderInfoQuery;
