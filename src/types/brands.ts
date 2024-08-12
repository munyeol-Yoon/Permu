import { Tables } from './supabase';

export type Brand = Omit<Tables<'Brands'>, 'initialCons'>;
