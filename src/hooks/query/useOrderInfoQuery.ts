import { useAuth } from '@/contexts/auth.context/auth.context';
import { useQuery } from '@tanstack/react-query';

const useOrderInfoQuery = (enabled: boolean) => {
  const { loggedUser, isLoggedIn } = useAuth();

  return useQuery({
    queryKey: ['orderInfo', loggedUser?.id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orderInfo/${loggedUser?.id ?? ''}`);
      const data = await res.json();
      return data;
    },
    enabled: enabled && isLoggedIn
  });
};

export default useOrderInfoQuery;
