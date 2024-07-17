import { Tables } from './supabase';

export type UserInfo = {
  gender: Tables<'users'>['gender'];
  age: Tables<'users'>['age'];
};

export type TUserInfo = UserInfo & { userId: Tables<'users'>['id'] };
