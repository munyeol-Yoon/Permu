import { loginWithEmail, logInWithProvider, logOut, postUserInfo } from '@/api/auth';
import { LoginForm, UserInfo } from '@/types/types';
import { Provider } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useAuthMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logInWithProviderMutation } = useMutation<{ provider: string; url: string }, Error, Provider>({
    mutationFn: (provider) => logInWithProvider(provider),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['loggedUser'] });
      router.replace(data.url);
    }
  });

  const { mutate: logInWithEmailMutation } = useMutation<void, Error, LoginForm>({
    mutationFn: (loginForm) => loginWithEmail(loginForm),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['loggedUser'] });
      // console.log(data);
      // router.replace('/');
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
    }
    // onError: (error) => console.log(error)
  });

  return { logInWithProviderMutation, logInWithEmailMutation, logOutMutation, userInfoMutation };
};

export default useAuthMutation;
