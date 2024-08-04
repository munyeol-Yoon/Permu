export type MyProduct = {
  title: string;
  thumbNailURL: string;
};

export type MyOrderDetail = {
  productId: string;
  Products: MyProduct;
};

export type MyOrder = {
  createAt: string;
  orderId: string;
  deliverId: string;
  OrdersDetail: MyOrderDetail[];
};
