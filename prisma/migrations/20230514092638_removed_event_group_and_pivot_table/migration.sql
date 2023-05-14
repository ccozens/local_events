/*
  Warnings:

  - You are about to drop the column `eventGroupId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `EventGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventLocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_eventGroupId_fkey";

-- DropForeignKey
ALTER TABLE "EventGroup" DROP CONSTRAINT "EventGroup_locationId_fkey";

-- DropForeignKey
ALTER TABLE "EventLocation" DROP CONSTRAINT "EventLocation_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventLocation" DROP CONSTRAINT "EventLocation_locationId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventGroupId";

-- DropTable
DROP TABLE "EventGroup";

-- DropTable
DROP TABLE "EventLocation";
