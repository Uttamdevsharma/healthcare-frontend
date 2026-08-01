import { UserStatus } from "./doctor.types";

export interface IAdmin {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    status: UserStatus;
  };
}

export interface ICreateAdminPayload {
  password: string;
  admin: {
    name: string;
    email: string;
    profilePhoto?: string;
    contactNumber?: string;
  };
}
