export interface ISpecialty {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    doctorSpecialties?: number;
  };
}
