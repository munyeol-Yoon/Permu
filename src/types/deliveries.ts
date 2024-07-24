export interface DeliveryInfo {
  deliverId?: string;
  userId: string;
  arrivalDate: Date;
  address: string;
  phone: string;
  name: string;
  deliverMemo: string;
  departureDate?: string;
  deliverState?: DeliveryStatus;
}

export enum DeliveryStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}
