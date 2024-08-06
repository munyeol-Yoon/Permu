import { loginWithEmail, logInWithProvider, logOut, patchUserInfo, signInWithOtp, verifyOtp } from '@/api/auth';
import { AUTH_SIGN_UP_ACCOUNT_FORM_PATHNAME, AUTH_SIGN_UP_COMPLETE_PATHNAME, HOME } from '@/constant/pathname';
import { LoginForm } from '@/types/types';
import { Provider, User } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useAlert from '../useAlert';

const useAuthMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showSuccessAlert, showWarningAlert, showFailAlert } = useAlert();

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
      router.replace(HOME);
    }
  });

  const { mutate: sendVerificationEmailMutation } = useMutation<void, Error, string>({
    mutationFn: (email) => signInWithOtp(email),
    onMutate: () => {
      showSuccessAlert('이메일을 확인해주세요! 재전송은 1분 이후 가능합니다');
    }
  });

  const { mutate: verifyOtpMutation } = useMutation<User, Error, { email: string; token: string }>({
    mutationFn: (otp) => verifyOtp(otp),
    onSuccess: (data) => {
      showSuccessAlert('인증번호가 일치합니다 !');
      queryClient.invalidateQueries({ queryKey: ['loggedUser'] });
      router.replace(AUTH_SIGN_UP_ACCOUNT_FORM_PATHNAME);
    },
    onError: (error) => {
      showWarningAlert('인증번호가 일치하지 않습니다. 새로운 인증번호를 발급해주세요.');
    }
  });

  const { mutate: logOutMutation } = useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.replace(HOME);
    }
  });

  // 타입 수정
  const { mutateAsync: userInfoMutation } = useMutation<any, Error, any>({
    mutationFn: (userInfo) => patchUserInfo(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loggedUser'] });
      router.replace(AUTH_SIGN_UP_COMPLETE_PATHNAME);
    },
    onError: (error) => {
      showFailAlert(`업데이트 실패 : ${error.message}`);
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
