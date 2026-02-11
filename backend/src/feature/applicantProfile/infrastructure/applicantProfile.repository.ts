import { PrismaClient } from "../../../generated/prisma/client";
import { CreateApplicantProfileDto } from "../dto/applicantProfile.create.dto";
import { ApplicantProfileResponseDto } from "../dto/applicantProfile.dto";
import { UpdateApplicantProfileDto } from "../dto/applicantProfile.update.dto";
import { IApplicantProfileRepository } from "./applicantProfile.Irepository";

export class ApplicantProfileRepository implements IApplicantProfileRepository {

    constructor(private prisma: PrismaClient) { }

    async create(userId: string, data: CreateApplicantProfileDto): Promise<ApplicantProfileResponseDto> {
        const result = await this.prisma.applicantProfile.create({
            data: {
                userId,
                fullName: data.fullName,
                phone: data.phone,
                address: data.address ?? null,
                locationId: data.locationId ?? null,
                description: data.description ?? null,
            }
        })
        return this.mapToDto(result)
    }

    async findById(userId: string): Promise<ApplicantProfileResponseDto | null> {
        const result = await this.prisma.applicantProfile.findUnique({
            where: { userId }
        })
        if (!result) return null;

        return this.mapToDto(result)
    }

    async update(id: string, userId: string, data: UpdateApplicantProfileDto): Promise<ApplicantProfileResponseDto | null> {
        const result = await this.prisma.applicantProfile.update({
            where: { id },
            data: {
                userId,
                fullName: data.fullName,
                phone: data.phone,
                address: data.address ?? null,
                locationId: data.locationId ?? null,
                description: data.description ?? null,
            }
        })
        return this.mapToDto(result)
    }

    private mapToDto(result: any): ApplicantProfileResponseDto {
        return {
            id: result.id,
            userId: result.userId,
            fullName: result.fullName,
            phone: result.phone,
            address: result.address,
            locationId: result.locationId,
            description: result.description,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        };
    }
}