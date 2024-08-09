import { getUserCoupons, getUserWishes } from '@/api/myPage';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import useAuthQuery from './useAuthQuery';

export interface WishProduct {
  Brands: {
    krName: string;
  };
  discount: number;
  price: number;
  productId: string;
  thumbNailURL: string;
  title: string;
}

export interface UserWish {
  productId: Tables<'Wishes'>['productId'];
  Products: WishProduct;
}

const useUserResourceQuery = () => {
  const { data: loggedUser } = useAuthQuery();

  const couponsQuery = useQuery<UserWish[], Error>({
    queryKey: ['user', 'wishes'],
    queryFn: () => getUserWishes(loggedUser?.id),
    enabled: !!loggedUser
  });

  const wishesQuery = useQuery<Tables<'Coupon'>[], Error>({
    queryKey: ['user', 'coupon'],
    queryFn: () => getUserCoupons(loggedUser?.id),
    enabled: !!loggedUser
  });

  return {
    coupons: couponsQuery.data,
    wishes: wishesQuery.data,
    isPending: couponsQuery.isPending || wishesQuery.isPending
  };
};

export default useUserResourceQuery;
