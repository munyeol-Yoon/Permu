import { getUserWishes } from '@/api/myPage';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

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
  const { loggedUser } = useAuth();
  return useQuery<UserWish[], Error>({
    queryKey: ['user', 'wishes'],
    queryFn: () => getUserWishes(loggedUser?.id ?? '')
  });
};

export default useUserWishesQuery;
