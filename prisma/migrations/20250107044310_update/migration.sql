/*
  Warnings:

  - Added the required column `quizQuestionId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "quizQuestionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "QuizQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "choice" TEXT[],
    "correctChoice" TEXT NOT NULL,

    CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_quizQuestionId_fkey" FOREIGN KEY ("quizQuestionId") REFERENCES "QuizQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
