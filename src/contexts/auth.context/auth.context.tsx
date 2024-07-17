'use client';
import { Provider, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type AuthContextValue = {
  isInitialized: boolean;
  isLoggedIn: boolean;
  me: User | null;
  logInWithProvider: (provider: Provider) => void;
};

const initialValue: AuthContextValue = {
  isInitialized: false,
  isLoggedIn: false,
  me: null,
  logInWithProvider: () => {}
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

  const value: AuthContextValue = {
    isInitialized,
    isLoggedIn,
    me,
    logInWithProvider
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
