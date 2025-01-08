/*
  Warnings:

  - You are about to drop the column `quizQuestionId` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `quizId` to the `QuizQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_quizQuestionId_fkey";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "quizQuestionId";

-- AlterTable
ALTER TABLE "QuizQuestion" ADD COLUMN     "quizId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "QuizQuestion" ADD CONSTRAINT "QuizQuestion_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
