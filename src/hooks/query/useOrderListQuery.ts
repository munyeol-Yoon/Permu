'use client';
import { getUserOrders } from '@/api/myPage';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useQuery } from '@tanstack/react-query';

const useOrderListQuery = () => {
  const { loggedUser } = useAuth();
  return useQuery({
    queryKey: ['OrderList', loggedUser?.id],
    queryFn: () => getUserOrders(loggedUser?.id ?? ''),
    enabled: !!loggedUser
  });
};

export default useOrderListQuery;
