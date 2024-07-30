import { LoginForm, UserInfo } from '@/types/types';
import { Provider } from '@supabase/supabase-js';

// result = Response 응답 코드

export const logInWithProvider = async (provider: Provider) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/provider?provider=${provider}`);
  const data = await response.json();
  if (data) return data;
};

export const loginWithEmail = async (loginForm: LoginForm) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-in`, {
    method: 'POST',
    body: JSON.stringify(loginForm)
  });
  const result = await response.json();
  return result;
};

export const signUpWithEmail = async (loginForm: LoginForm) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`, {
    method: 'POST',
    body: JSON.stringify(loginForm)
  });
  const result = await response.json();
  return result;
};

export const logOut = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-out`, {
    method: 'DELETE'
  });
  const result = await response.json();
  if (result) return result;
};

export const fetchUser = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`);
  const { user } = await response.json();
  return user || null;
};

export const patchUserInfo = async (userInfo: UserInfo) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/info`, {
    method: 'PATCH',
    body: JSON.stringify(userInfo)
  });
  const result = await response.json();
  if (result) return result;
};
