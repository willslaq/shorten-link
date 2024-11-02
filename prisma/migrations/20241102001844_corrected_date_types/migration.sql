/*
  Warnings:

  - The `created_at` column on the `urls` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `expiration_date` on the `urls` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "urls" DROP COLUMN "expiration_date",
ADD COLUMN     "expiration_date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "created_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
