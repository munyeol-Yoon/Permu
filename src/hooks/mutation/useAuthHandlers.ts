import { logInWithProvider, logOut, postUserInfo } from '@/api/auth';
import { UserInfo } from '@/types/types';
import { Provider } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useAuthHandlers = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logInMuatation } = useMutation<{ provider: string; url: string }, Error, Provider>({
    mutationFn: (provider) => logInWithProvider(provider),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['loggedUser'] });
      router.replace(data.url);
    }
  });

  const { mutate: logOutMutation } = useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.replace('/auth/log-in');
    }
  });

  const { mutateAsync: userInfoMutation } = useMutation<void, Error, UserInfo>({
    mutationFn: (userInfo) => postUserInfo(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loggedUser'] });
      router.replace('/');
    },
    onError: (error) => console.log(error)
  });

  return { logInMuatation, logOutMutation, userInfoMutation };
};

export default useAuthHandlers;
