export interface DeliveryInfo {
  deliverId?: string;
  userId: string;
  departureDate?: string;
  arrivalDate: Date;
  address: string;
  deliverState: DeliveryStatus;
  phone: string;
  name: string;
  deliverMemo: string;
}

export enum DeliveryStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}
