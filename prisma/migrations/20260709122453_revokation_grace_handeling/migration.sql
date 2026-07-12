-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "graceUntill" TIMESTAMP(3),
ADD COLUMN     "revokedAt" TIMESTAMP(3);
