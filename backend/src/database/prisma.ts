import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { dbConfig } from '../config/db';

const adapter = new PrismaPg({
  connectionString: dbConfig.db_rul,
});

export const prisma = new PrismaClient({ adapter });
