import { Tables } from '@/types/supabase';

type ProductWithoutSpecificFields = Omit<Tables<'Products'>, 'productId' | 'createdAt' | 'ImagesURL' | 'updatedAt'>;
export type TWish = Omit<Tables<'Wishes'>, 'wishId'>;
export type Product = Omit<Tables<'Products'>, 'ImagesURL' | 'size' | 'notes'> & {
  discountedPrice: number;
  ImagesURL: string[];
  size: string[];
  notes: string[];
  brandId?: number;
  Brand: Pick<Tables<'Brands'>, 'krName'>;
  Category: Omit<Tables<'Categories'>, 'categoryId'>;
  Wish?: TWish;
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
