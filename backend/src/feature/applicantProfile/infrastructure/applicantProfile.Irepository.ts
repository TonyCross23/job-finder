import { CreateApplicantProfileDto } from '../dto/applicantProfile.create.dto';
import { ApplicantProfileResponseDto } from '../dto/applicantProfile.dto';
import { UpdateApplicantProfileDto } from '../dto/applicantProfile.update.dto';

export interface IApplicantProfileRepository {
  create(userId: string, data: CreateApplicantProfileDto): Promise<ApplicantProfileResponseDto>;
  findById(userId: string): Promise<ApplicantProfileResponseDto | null>;
  update(
    id: string,
    userId: string,
    data: UpdateApplicantProfileDto,
  ): Promise<ApplicantProfileResponseDto | null>;
}
