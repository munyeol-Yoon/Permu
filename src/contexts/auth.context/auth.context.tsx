'use client';
import { getLoggedUser } from '@/api/auth';
import { LoggedUser } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type AuthContextValue = {
  isInitialized: boolean;
  isLoggedIn: boolean;
  loggedUser: LoggedUser | null;
};

const initialValue: AuthContextValue = {
  isInitialized: false,
  isLoggedIn: false,
  loggedUser: null
};

const AuthContext = createContext<AuthContextValue>(initialValue);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isInitialized, setIsInitialized] = useState<AuthContextValue['isInitialized']>(initialValue['isInitialized']);
  const [loggedUser, setLoggedUser] = useState<AuthContextValue['loggedUser']>(initialValue['loggedUser']);

  const {
    data: user,
    isSuccess,
    isError
  } = useQuery({ queryKey: ['loggedUser', 'context'], queryFn: () => getLoggedUser(), retry: false });

  useEffect(() => {
    if (isSuccess) setLoggedUser(user);
    if (isError) setLoggedUser(null);
    setIsInitialized(true);
  }, [isSuccess, isError, user]);

  const value: AuthContextValue = {
    isInitialized,
    isLoggedIn: !!loggedUser,
    loggedUser: user
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
