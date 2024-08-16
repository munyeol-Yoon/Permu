import { getAddressInfoByUserId } from '@/api/addresses';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import useAuthQuery from './useAuthQuery';

const useAddressQuery = () => {
  const { data: loggedUser } = useAuthQuery();

  return useQuery<Tables<'Addresses'>[]>({
    queryKey: ['userAddresses', loggedUser?.id],
    queryFn: async () => await getAddressInfoByUserId(loggedUser?.id!),
    enabled: !!loggedUser
  });
};

export default useAddressQuery;
