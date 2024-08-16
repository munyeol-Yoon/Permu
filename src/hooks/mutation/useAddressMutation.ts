import { deleteAddressInfo, insertAddressInfo, patchAddressInfo } from '@/api/addresses';
import { Tables } from '@/types/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthQuery from '../query/useAuthQuery';

const useAddressMutation = () => {
  const { data: loggedUser } = useAuthQuery();
  const queryClient = useQueryClient();

  const addAddressMutation = useMutation({
    mutationFn: async (addressInfo: Omit<Tables<'Addresses'>, 'addressId'>) => await insertAddressInfo(addressInfo),
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({ queryKey: ['userAddresses', variable.userId] });
    }
  });

  const patchAddressMutation = useMutation({
    mutationFn: async (addressInfo: Tables<'Addresses'>) => await patchAddressInfo(addressInfo),
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

  return { addAddressMutation, patchAddressMutation, deleteAddressMutation };
};

export default useAddressMutation;
