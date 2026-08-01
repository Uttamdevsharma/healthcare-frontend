export interface IPrescription {
  id: string;
  followUpDate: string;
  instructions: string;
  pdfUrl?: string;
  createdAt: string;
  updatedAt: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  doctor?: {
    id: string;
    name: string;
    email: string;
    designation?: string;
    qualification?: string;
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
    status: string;
    schedule?: {
      startDateTime: string;
      endDateTime: string;
    };
  };
}

export interface ICreatePrescriptionPayload {
  appointmentId: string;
  instructions: string;
  followUpDate: string;
}
