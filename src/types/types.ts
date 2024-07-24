import { User } from '@supabase/supabase-js';
import { Tables } from './supabase';

export type UserInfo = Pick<Tables<'Users'>, 'gender' | 'birth' | 'phone'>;

export type LoggedUser = User & { userData: Tables<'Users'> };
