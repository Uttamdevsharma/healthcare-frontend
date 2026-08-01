export interface IReview {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  doctor?: {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string;
  };
  patient?: {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string;
  };
  appointment?: {
    id: string;
    schedule?: {
      startDateTime: string;
      endDateTime: string;
    };
  };
}

export interface ICreateReviewPayload {
  appointmentId: string;
  rating: number;
  comment?: string;
}
