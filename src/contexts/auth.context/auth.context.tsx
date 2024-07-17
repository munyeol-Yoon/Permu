'use client';
import { UserInfo } from '@/types/types';
import { Provider, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type AuthContextValue = {
  isInitialized: boolean;
  isLoggedIn: boolean;
  me: User | null;
  logOut: () => void;
  logInWithProvider: (provider: Provider) => void;
  postUserInfo: (userInfo: UserInfo) => void;
};

const initialValue: AuthContextValue = {
  isInitialized: false,
  isLoggedIn: false,
  me: null,
  logOut: () => {},
  logInWithProvider: () => {},
  postUserInfo: () => {}
};

const AuthContext = createContext<AuthContextValue>(initialValue);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState<AuthContextValue['isInitialized']>(false);
  const [me, setMe] = useState<AuthContextValue['me']>(null);
  const isLoggedIn = !!me;

  const logInWithProvider: AuthContextValue['logInWithProvider'] = async (provider) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/provider?provider=${provider}`);
    const data = await response.json();
    router.replace(data.url);
  };

  const logOut = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/log-out`, {
      method: 'DELETE'
    });
    const result = await response.json();
    console.log(result);
    router.replace('/log-in');
    init();
  };

  const postUserInfo = async (userInfo: UserInfo) => {
    if (!userInfo) return;

    console.log('>>>>>', userInfo);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/info`, {
      method: 'POST',
      body: JSON.stringify(userInfo)
    });
    const result = await response.json();
    console.log(result);
    // router.replace('/');
  };

  const init = () => {
    setMe(null);
    setIsInitialized(false);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`);
      const { user } = await response.json();
      console.log('>>>>>', user);
      if (user) setMe(user);
    })();
    setIsInitialized(true);
  }, []);

  const value: AuthContextValue = {
    isInitialized,
    isLoggedIn,
    me,
    logInWithProvider,
    logOut,
    postUserInfo
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
