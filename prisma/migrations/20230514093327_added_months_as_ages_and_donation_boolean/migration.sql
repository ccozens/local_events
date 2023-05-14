/*
  Warnings:

  - You are about to drop the column `maxAge` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `minAge` on the `Event` table. All the data in the column will be lost.
  - Added the required column `maxAgeYears` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minAgeYears` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "maxAge",
DROP COLUMN "minAge",
ADD COLUMN     "donation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxAgeMonths" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxAgeYears" INTEGER NOT NULL,
ADD COLUMN     "minAgeMonths" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minAgeYears" INTEGER NOT NULL;
