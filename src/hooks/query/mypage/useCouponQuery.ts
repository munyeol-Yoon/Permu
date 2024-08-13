import { getUserCoupons } from '@/api/myPage';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import useAuthQuery from '../useAuthQuery';

const useCouponQuery = () => {
  const { data: loggedUser } = useAuthQuery();
  return useQuery<Tables<'Coupon'>[], Error>({
    queryKey: ['loggedUser', 'coupon'],
    queryFn: () => getUserCoupons(loggedUser?.id),
    enabled: !!loggedUser
  });
};

export default useCouponQuery;
