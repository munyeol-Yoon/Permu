export interface DeliveryInfo {
  deliverId: string;
  userId: string;
  departureDate: string;
  arrivalDate: string;
  address: string;
  deliverState: DeliveryStatus;
  phone: number;
}

export enum DeliveryStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}
