-- DropForeignKey
ALTER TABLE "urls" DROP CONSTRAINT "urls_user_id_fkey";

-- AlterTable
ALTER TABLE "urls" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "urls" ADD CONSTRAINT "urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
