import { Tables } from './supabase';

export type ReviewType = Omit<Tables<'Reviews'>, 'imagesURL'> & {
  imagesURL: string[];
  User: Tables<'Users'>;
  Product: { notes: string[] };
  OrderDetail: Tables<'OrdersDetail'>;
};
