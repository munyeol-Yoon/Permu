import { getAddressInfoByUserId } from '@/api/addresses';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

const useAddressQuery = () => {
  const { loggedUser } = useAuth();

  return useQuery<Tables<'Addresses'>[]>({
    queryKey: ['userAddresses', loggedUser?.id],
    queryFn: async () => await getAddressInfoByUserId(loggedUser?.id!),
    enabled: !!loggedUser
  });
};

export default useAddressQuery;
