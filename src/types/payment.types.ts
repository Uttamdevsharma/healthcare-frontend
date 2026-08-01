export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

export interface IPayment {
  id: string;
  amount: number;
  transactionId: string;
  stripeEventId?: string;
  status: PaymentStatus;
  invoiceUrl?: string;
  createdAt: string;
  updatedAt: string;
  appointmentId: string;
  appointment?: {
    id: string;
    doctor?: {
      name: string;
      email: string;
      profilePhoto?: string;
    };
    patient?: {
      name: string;
      email: string;
    };
    schedule?: {
      startDateTime: string;
      endDateTime: string;
    };
  };
}
