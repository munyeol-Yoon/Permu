type Product = {
  productId: number | string;
  createdAt: string;
  category: number;
  title: string;
  price: number;
  thumbNailURL: string;
  ImagesURL: string;
  updatedAt: string;
  discount: number;
} | null;

type Carts = {
  userId: string;
  productId: number | string;
  count: number;
  Products: Product[];
}[];

type Wishes = {
  wishId: string;
  userId: string;
  productId: number;
};
