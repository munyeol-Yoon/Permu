'use client';
import { fetchUser, logInWithProvider, logOut, postUserInfo } from '@/api/auth';
import { UserInfo } from '@/types/types';
import { User } from '@supabase/supabase-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext } from 'react';

type AuthContextValue = {
  isInitialized: boolean;
  isLoggedIn: boolean;
  loggedUser: User | null;
  logInMuatation: (provider: string) => void;
  logOutMutation: () => void;
  userInfoMutation: (userInfo: UserInfo) => void;
};

const initialValue: AuthContextValue = {
  isInitialized: false,
  isLoggedIn: false,
  loggedUser: null,
  logInMuatation: () => {},
  logOutMutation: () => {},
  userInfoMutation: () => {}
};

const AuthContext = createContext<AuthContextValue>(initialValue);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isPending } = useQuery({ queryKey: ['loggedUser'], queryFn: () => fetchUser(), retry: false });
  const isLoggedIn = !isPending;
  const isInitialized = !!user;

  const { mutate: logInMuatation } = useMutation({
    mutationFn: (provider: string) => logInWithProvider(provider),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['loggedUser'] });
      router.replace(data.url);
    }
  });

  const { mutate: logOutMutation } = useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => router.replace('/auth/log-in')
  });

  const { mutateAsync: userInfoMutation } = useMutation({
    mutationFn: (userInfo: UserInfo) => postUserInfo(userInfo),
    onSuccess: () => router.replace('/'),
    onError: (error) => console.log(error)
  });

  const value: AuthContextValue = {
    isInitialized,
    isLoggedIn,
    loggedUser: user,
    logOutMutation,
    logInMuatation,
    userInfoMutation
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
