export interface CheckoutDTO {
  propertyId: number;
  amount: number;
  serviceIds: number[];
  cancelUrl: string;
  bookingId: number;
}
