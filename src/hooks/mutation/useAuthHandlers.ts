import { logInWithProvider, logOut, postUserInfo } from '@/api/auth';
import { UserInfo } from '@/types/types';
import { Provider } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useAuthHandlers = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // any 타입 바뀌야함
  const { mutate: logInMuatation } = useMutation<any, Error, Provider>({
    mutationFn: (provider) => logInWithProvider(provider),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['loggedUser'] });
      router.replace(data.url);
    }
  });

  const { mutate: logOutMutation } = useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => {
      // queryClient.setQueryData(['loggedUser'], null);
      queryClient.removeQueries({ queryKey: ['loggedUser'] });
      router.replace('/auth/log-in');
    }
  });

  const { mutateAsync: userInfoMutation } = useMutation<unknown, Error, UserInfo>({
    mutationFn: (userInfo) => postUserInfo(userInfo),
    onSuccess: () => router.replace('/'),
    onError: (error) => console.log(error)
  });

  return { logInMuatation, logOutMutation, userInfoMutation };
};

export default useAuthHandlers;
