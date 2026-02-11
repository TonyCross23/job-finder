import { AppError } from '../../../errors/httpErrors';
import { CreateApplicantProfileDto } from '../dto/applicantProfile.create.dto';
import { ApplicantProfileResponseDto } from '../dto/applicantProfile.dto';
import { UpdateApplicantProfileDto } from '../dto/applicantProfile.update.dto';
import { IApplicantProfileRepository } from '../infrastructure/applicantProfile.Irepository';

export class ApplicantProfileService {
  constructor(private applicantRepo: IApplicantProfileRepository) {}

  async create(
    userId: string,
    data: CreateApplicantProfileDto,
  ): Promise<ApplicantProfileResponseDto> {
    const existing = await this.applicantRepo.findById(userId);
    if (existing) throw new AppError('Profile already exists', 409);
    return this.applicantRepo.create(userId, data);
  }

  async update(
    id: string,
    userId: string,
    data: UpdateApplicantProfileDto,
  ): Promise<ApplicantProfileResponseDto | null> {
    const existing = await this.applicantRepo.findById(userId);
    if (!existing) throw new AppError('Profile not found', 404);
    return this.applicantRepo.update(id, userId, data);
  }

  async findByUserById(userId: string) {
    const profile = this.applicantRepo.findById(userId)
    return profile
  }
}
