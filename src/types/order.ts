export interface Order {
  orderId: string;
  deliverId: string;
  userId: string;
  couponId: string;
  orderStatus: OrderStatus;
  total: number;
  payment: string;
}

export interface OrderDetail {
  orderDetailId: string;
  orderId: string;
  productId: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}
