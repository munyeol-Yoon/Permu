export interface Order {
  orderId: string;
  deliverId: string;
  userId: string;
  couponId: string;
  productId: number;
  orderStatus: OrderStatus;
  orderMemo: string;
  total: number;
  payment: string;
}

enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}
