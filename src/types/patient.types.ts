import { UserStatus } from "./doctor.types";

export interface IPatientHealthData {
  id?: string;
  patientId?: string;
  gender?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  hasPastSurgeries?: boolean;
  recentSurgeries?: string;
  hasRecentInjuries?: boolean;
  recentInjuries?: string;
  height?: string;
  weight?: string;
  smokingStatus?: boolean;
  dietaryPreferences?: string;
  pregnancyStatus?: boolean;
  mentalHealthHistory?: string;
  immunizationStatus?: string;
  hasPastInterventions?: boolean;
  pastInterventions?: string;
}

export interface IMedicalReport {
  id: string;
  patientId: string;
  reportName: string;
  reportLink: string;
  createdAt: string;
}

export interface IPatient {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  isDeleted: boolean;
  createdAt: string;
  userId: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    status: UserStatus;
  };
  patientHealthData?: IPatientHealthData | null;
  medicalReports?: IMedicalReport[];
}
