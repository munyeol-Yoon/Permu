import { getUserWishes } from '@/api/myPage';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import useAuthQuery from '../useAuthQuery';

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

const useUserWishesQuery = () => {
  const { data: loggedUser } = useAuthQuery();
  return useQuery<UserWish[], Error>({
    queryKey: ['loggedUser', 'wishes'],
    queryFn: () => getUserWishes(loggedUser?.id),
    enabled: !!loggedUser
  });
};

export default useUserWishesQuery;
