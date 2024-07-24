type Product = {
  productId: number;
  createdAt: string;
  categoryId: string;
  title: string;
  price: number;
  content: string;
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
  userId: string;
  discount: number;
  issueDate: string;
  expirationDate: string;
};
