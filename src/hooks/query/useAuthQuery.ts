import { getLoggedUser } from '@/api/auth';
import { useQuery } from '@tanstack/react-query';

const useAuthQuery = () => {
  return useQuery({ queryKey: ['loggedUser'], queryFn: () => getLoggedUser() });
};

export default useAuthQuery;
