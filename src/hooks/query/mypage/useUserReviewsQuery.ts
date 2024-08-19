import { getUserReviews } from '@/api/myPage';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import useAuthQuery from '../useAuthQuery';

export interface UserReview extends Tables<'Reviews'> {
  Products: {
    title: string;
    thumbNailURL: string;
    Brands: {
      krName: string;
    };
  };
}

const useUserReviewsQuery = () => {
  const { data: loggedUser } = useAuthQuery();
  return useQuery<UserReview[], Error>({
    queryKey: ['loggedUser', 'reviews'],
    queryFn: () => getUserReviews(loggedUser.id),
    enabled: !!loggedUser
  });
};

export default useUserReviewsQuery;
