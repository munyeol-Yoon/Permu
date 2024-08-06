import { deleteAddressInfo, insertAddressInfo } from '@/api/addresses';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { Tables } from '@/types/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAddressMutation = () => {
  const { loggedUser } = useAuth();
  const queryClient = useQueryClient();

  const addAddressMutation = useMutation({
    mutationFn: async (addressInfo: Omit<Tables<'Addresses'>, 'addressId'>) => await insertAddressInfo(addressInfo),
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['userAddresses', variable.userId] });
    }
  });

  const deleteAddressMutation = useMutation({
    mutationFn: async (addressId: string) => await deleteAddressInfo(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAddresses', loggedUser!.id] });
    }
  });

  return { addAddressMutation, deleteAddressMutation };
};

export default useAddressMutation;
