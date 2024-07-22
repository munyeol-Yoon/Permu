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
};

type Cart = {
  userId: string;
  productId: number;
  count: number;
  Products: Product;
};

type Wish = {
  wishId: string;
  userId: string;
  productId: number;
};
