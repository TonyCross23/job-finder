export interface CreateApplicantProfileDto {
  fullName: string;
  phone: string;
  address?: string;
  locationId?: string;
  description?: string;
}
