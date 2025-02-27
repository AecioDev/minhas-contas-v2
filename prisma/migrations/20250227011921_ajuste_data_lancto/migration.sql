/*
  Warnings:

  - You are about to drop the column `ano` on the `Lancamentos` table. All the data in the column will be lost.
  - You are about to drop the column `dia` on the `Lancamentos` table. All the data in the column will be lost.
  - You are about to drop the column `mes` on the `Lancamentos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lancamentos" DROP COLUMN "ano",
DROP COLUMN "dia",
DROP COLUMN "mes",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
