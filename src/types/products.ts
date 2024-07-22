type Product = {
  productId: number;
  createdAt: string;
  category: number;
  title: string;
  price: number;
  thumbNailURL: string;
  ImagesURL: string;
  updatedAt: string;
  discount: number;
  discountedPrice: number;
};
type ProductWithoutSpecificFields = Omit<Product, 'productId' | 'createdAt' | 'ImagesURL' | 'updatedAt'>;

type Cart = {
  userId: string;
  productId: number;
  count: number;
  Products: ProductWithoutSpecificFields;
};

type Wish = {
  userId: string;
  productId: number;
};

type Coupon = {
  couponId: string;
  discount: number;
};
