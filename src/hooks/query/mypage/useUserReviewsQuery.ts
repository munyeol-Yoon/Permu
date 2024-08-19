import { getUserReviews } from '@/api/myPage';
import { useQuery } from '@tanstack/react-query';
import useAuthQuery from '../useAuthQuery';

const useUserReviewsQuery = () => {
  const { data: loggedUser } = useAuthQuery();
  return useQuery({
    queryKey: ['loggedUser', 'reviews'],
    queryFn: () => getUserReviews(loggedUser.id),
    enabled: !!loggedUser
  });
};

export default useUserReviewsQuery;
