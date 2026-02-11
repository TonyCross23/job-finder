export interface ApplicantProfileResponseDto {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  address?: string | null;
  locationId?: string | null;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
