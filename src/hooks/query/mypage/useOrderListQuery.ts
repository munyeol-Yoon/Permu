import { getUserOrders } from '@/api/myPage';
import { MyOrder } from '@/types/myPage/order';
import { useQuery } from '@tanstack/react-query';
import useAuthQuery from '../useAuthQuery';

const useOrderListQuery = () => {
  const { data: loggedUser } = useAuthQuery();
  return useQuery<MyOrder[], Error>({
    queryKey: ['loggedUser', 'OrderList'],
    queryFn: () => getUserOrders(loggedUser?.id),
    enabled: !!loggedUser
  });
};

export default useOrderListQuery;
