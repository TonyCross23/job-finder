-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "device" TEXT NOT NULL DEFAULT 'unknown';
