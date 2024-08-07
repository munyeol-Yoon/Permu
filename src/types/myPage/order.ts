export type MyProduct = {
  Brands: {
    krName: string;
  };
  thumbNailURL: string;
  title: string;
};

export type MyOrderDetail = {
  Products: MyProduct;
  productId: string;
};

export type MyOrder = {
  OrdersDetail: MyOrderDetail[];
  createAt: string;
  deliverId: string;
  orderId: string;
};

export interface OrderItemProps extends MyProduct {
  option?: string;
}
