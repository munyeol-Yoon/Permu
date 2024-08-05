import { Tables } from '@/types/supabase';

type ProductWithoutSpecificFields = Omit<Tables<'Products'>, 'productId' | 'createdAt' | 'ImagesURL' | 'updatedAt'>;
export type TWish = Omit<Tables<'Wishes'>, 'wishId'>;
export type TWishId = Omit<TWish, 'userId'>;
export type Product = Omit<Tables<'Products'>, 'ImagesURL' | 'size' | 'notes'> & {
  discountedPrice: number;
  ImagesURL: string[];
  size: string[];
  notes: string[];
  brandId?: number;
  Brand: Tables<'Brands'>;
  Category: Tables<'Categories'>;
};
export interface Params {
  params: { productId: string };
}
export type Cart = {
  userId: string;
  productId: number;
  count: number;
  Products: ProductWithoutSpecificFields;
};

export type Coupon = {
  couponId: string;
  userId: string;
  discount: number;
  issueDate: string;
  expirationDate: string;
};
