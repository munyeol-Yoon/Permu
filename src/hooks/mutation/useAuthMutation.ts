import { loginWithEmail, logInWithProvider, logOut, patchUserInfo, signUpWithEmail, verifyOtp } from '@/api/auth';
import {
  AUTH_LOG_IN_PATHNAME,
  AUTH_SIGN_UP_ACCOUNT_FORM_PATHNAME,
  AUTH_SIGN_UP_COMPLETE_PATHNAME
} from '@/constant/pathname';
import { LoginForm } from '@/types/types';
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
      router.replace('/');
    }
  });

  const { mutate: verifyOtpMutation } = useMutation({
    mutationFn: (otp: { email: string; token: string }) => verifyOtp(otp),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['loggedUser'] });
      router.replace(AUTH_SIGN_UP_ACCOUNT_FORM_PATHNAME);
    },
    onError: (error) => {
      console.log(error);
      alert('인증번호가 일치하지 않습니다. 새로운 인증번호를 발급해주세요.');
    }
  });

  const { mutate: sendVerificationEmailMutation } = useMutation<void, Error, string>({
    mutationFn: (email) => signUpWithEmail(email),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['loggedUser'] });
      console.log('>>>>>>', data);
      // router.replace('/');
    }
  });

  const { mutate: logOutMutation } = useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.replace(AUTH_LOG_IN_PATHNAME);
    }
  });

  // 타입 수정
  const { mutateAsync: userInfoMutation } = useMutation<any, Error, any>({
    mutationFn: (userInfo) => patchUserInfo(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loggedUser'] });
      console.log('유저 정보 업뎃완료');
      router.replace(AUTH_SIGN_UP_COMPLETE_PATHNAME);
    },
    onError: (error) => {
      console.log('실패함', error);
    }
  });

  return {
    logInWithProviderMutation,
    logInWithEmailMutation,
    verifyOtpMutation,
    sendVerificationEmailMutation,
    logOutMutation,
    userInfoMutation
  };
};

export default useAuthMutation;
