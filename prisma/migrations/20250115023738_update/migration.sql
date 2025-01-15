/*
  Warnings:

  - You are about to drop the `_ParticipantToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ParticipantToUser" DROP CONSTRAINT "_ParticipantToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ParticipantToUser" DROP CONSTRAINT "_ParticipantToUser_B_fkey";

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "score" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "_ParticipantToUser";

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
