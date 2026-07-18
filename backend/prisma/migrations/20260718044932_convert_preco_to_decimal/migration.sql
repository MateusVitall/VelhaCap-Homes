/*
  Warnings:

  - You are about to alter the column `preco` on the `Imovel` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Imovel" ALTER COLUMN "preco" SET DATA TYPE DECIMAL(10,2);

-- CreateIndex
CREATE INDEX "Contato_imovelId_idx" ON "Contato"("imovelId");

-- CreateIndex
CREATE INDEX "Imovel_userId_idx" ON "Imovel"("userId");

-- CreateIndex
CREATE INDEX "Imovel_disponivel_idx" ON "Imovel"("disponivel");

-- CreateIndex
CREATE INDEX "Imovel_createdAt_idx" ON "Imovel"("createdAt");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
